import { BooleanQueryInput, BooleanQueryResult, Platform } from "../types";

/**
 * Build platform-specific boolean search strings for candidate sourcing.
 * Pure logic — no API key needed.
 *
 * @example
 * ```ts
 * const result = buildBooleanQuery({
 *   role: 'Engineering Manager',
 *   skills: ['python', 'microservices', 'team-lead'],
 *   experience: '8+',
 *   location: 'Hyderabad',
 *   platforms: ['naukri', 'linkedin', 'github'],
 *   excludeCompanies: ['CurrentEmployer'],
 *   excludeTitles: ['intern', 'trainee'],
 * });
 *
 * console.log(result.queries.naukri);
 * // → "engineering manager" AND (python OR microservices) AND "team lead" ...
 * ```
 */
export function buildBooleanQuery(input: BooleanQueryInput): BooleanQueryResult {
  validateInput(input);

  const queries: Record<string, string> = {};

  for (const platform of input.platforms) {
    queries[platform] = buildForPlatform(platform, input);
  }

  return {
    queries: queries as Record<Platform, string>,
    explanation: buildExplanation(input),
    estimatedVolume: estimateVolume(input),
    refinementTips: buildRefinementTips(input),
  };
}

function validateInput(input: BooleanQueryInput): void {
  if (!input.role?.trim()) {
    throw new Error("[recruitkit] Role is required for boolean query building.");
  }
  if (!input.skills?.length) {
    throw new Error("[recruitkit] At least one skill is required.");
  }
  if (!input.platforms?.length) {
    throw new Error("[recruitkit] At least one platform is required.");
  }
}

// ---- Platform-specific builders ----

function buildForPlatform(platform: Platform, input: BooleanQueryInput): string {
  switch (platform) {
    case "naukri":
      return buildNaukriQuery(input);
    case "linkedin":
      return buildLinkedInQuery(input);
    case "indeed":
      return buildIndeedQuery(input);
    case "github":
      return buildGitHubQuery(input);
    case "stackoverflow":
      return buildStackOverflowQuery(input);
    case "instahyre":
      return buildInstahyreQuery(input);
    case "iimjobs":
      return buildIIMJobsQuery(input);
    default:
      return buildGenericQuery(input);
  }
}

function buildNaukriQuery(input: BooleanQueryInput): string {
  const parts: string[] = [];

  // Title keywords — Naukri supports standard boolean
  const roleParts = input.role.split(/\s+/);
  if (roleParts.length > 1) {
    parts.push(`"${input.role}"`);
  } else {
    parts.push(input.role);
  }

  // Skills — OR group for related, AND for must-haves
  if (input.skills.length === 1) {
    parts.push(`AND "${input.skills[0]}"`);
  } else {
    const skillGroup = input.skills
      .map((s) => (s.includes(" ") ? `"${s}"` : s))
      .join(" OR ");
    parts.push(`AND (${skillGroup})`);
  }

  // Experience — Naukri has a dedicated filter, but for the search string:
  if (input.experience) {
    parts.push(`AND "${input.experience} years"`);
  }

  // Location
  if (input.location) {
    parts.push(`AND ${input.location}`);
  }

  // Exclusions
  if (input.excludeCompanies?.length) {
    const excl = input.excludeCompanies.map((c) => `"${c}"`).join(" OR ");
    parts.push(`NOT (${excl})`);
  }

  if (input.excludeTitles?.length) {
    const excl = input.excludeTitles.map((t) => `"${t}"`).join(" OR ");
    parts.push(`NOT (${excl})`);
  }

  return parts.join(" ");
}

function buildLinkedInQuery(input: BooleanQueryInput): string {
  const parts: string[] = [];

  // LinkedIn Recruiter / Sales Navigator syntax
  parts.push(`title:"${input.role}"`);

  // Skills as keywords
  if (input.skills.length === 1) {
    parts.push(`AND "${input.skills[0]}"`);
  } else {
    const primary = input.skills.slice(0, 3);
    const secondary = input.skills.slice(3);

    const primaryGroup = primary
      .map((s) => (s.includes(" ") ? `"${s}"` : s))
      .join(" OR ");
    parts.push(`AND (${primaryGroup})`);

    if (secondary.length > 0) {
      const secGroup = secondary
        .map((s) => (s.includes(" ") ? `"${s}"` : s))
        .join(" OR ");
      parts.push(`AND (${secGroup})`);
    }
  }

  // Location
  if (input.location) {
    parts.push(`AND location:"${input.location}"`);
  }

  // Exclusions
  if (input.excludeCompanies?.length) {
    for (const company of input.excludeCompanies) {
      parts.push(`NOT company:"${company}"`);
    }
  }

  if (input.excludeTitles?.length) {
    const excl = input.excludeTitles.map((t) => `"${t}"`).join(" OR ");
    parts.push(`NOT title:(${excl})`);
  }

  return parts.join(" ");
}

function buildIndeedQuery(input: BooleanQueryInput): string {
  const parts: string[] = [];

  // Indeed uses standard boolean
  parts.push(`title:(${input.role})`);

  const skillGroup = input.skills
    .map((s) => (s.includes(" ") ? `"${s}"` : s))
    .join(" OR ");
  parts.push(`(${skillGroup})`);

  if (input.location) {
    // Indeed has a separate location field, but for the query:
    parts.push(`"${input.location}"`);
  }

  if (input.excludeCompanies?.length) {
    for (const company of input.excludeCompanies) {
      parts.push(`-company:"${company}"`);
    }
  }

  if (input.excludeTitles?.length) {
    for (const title of input.excludeTitles) {
      parts.push(`-title:"${title}"`);
    }
  }

  return parts.join(" ");
}

function buildGitHubQuery(input: BooleanQueryInput): string {
  // GitHub user search is limited — focus on bio/readme search
  const parts: string[] = [];

  // Search in user bios
  const skills = input.skills.slice(0, 3).join(" ");
  parts.push(`${input.role} ${skills}`);

  if (input.location) {
    parts.push(`location:"${input.location}"`);
  }

  // GitHub-specific: also search repos for contributors
  const repoSearch = input.skills
    .slice(0, 2)
    .map((s) => `language:${s.toLowerCase().replace(/[^a-z0-9]/g, "")}`)
    .join(" ");

  return `Users: ${parts.join(" ")}\nRepos: ${repoSearch} stars:>10`;
}

function buildStackOverflowQuery(input: BooleanQueryInput): string {
  // Stack Overflow Talent / Users search
  const tags = input.skills
    .map((s) => s.toLowerCase().replace(/\s+/g, "-"))
    .join(", ");

  let query = `Tags: [${tags}]`;
  if (input.location) {
    query += ` | Location: ${input.location}`;
  }
  if (input.experience) {
    query += ` | Min reputation: ${input.experience === "8+" ? "5000" : "1000"}`;
  }
  return query;
}

function buildInstahyreQuery(input: BooleanQueryInput): string {
  // Instahyre uses a structured search — output as filter config
  const skills = input.skills.join(", ");
  const parts = [`Keywords: "${input.role}" ${skills}`];
  if (input.location) parts.push(`Location: ${input.location}`);
  if (input.experience) parts.push(`Experience: ${input.experience} years`);
  if (input.excludeCompanies?.length) {
    parts.push(`Exclude companies: ${input.excludeCompanies.join(", ")}`);
  }
  return parts.join(" | ");
}

function buildIIMJobsQuery(input: BooleanQueryInput): string {
  // IIMJobs / HiRist — similar to Naukri but more management-focused
  const parts: string[] = [];
  parts.push(`"${input.role}"`);

  const skillGroup = input.skills
    .map((s) => `"${s}"`)
    .join(" OR ");
  parts.push(`AND (${skillGroup})`);

  if (input.location) parts.push(`AND "${input.location}"`);
  if (input.experience) parts.push(`AND "${input.experience} years"`);

  return parts.join(" ");
}

function buildGenericQuery(input: BooleanQueryInput): string {
  const parts = [`"${input.role}"`];
  const skillGroup = input.skills.map((s) => `"${s}"`).join(" OR ");
  parts.push(`AND (${skillGroup})`);
  if (input.location) parts.push(`AND "${input.location}"`);
  return parts.join(" ");
}

// ---- Helpers ----

function buildExplanation(input: BooleanQueryInput): string {
  let explanation = `Searching for "${input.role}" candidates`;
  if (input.skills.length > 0) {
    explanation += ` with skills in ${input.skills.join(", ")}`;
  }
  if (input.location) {
    explanation += ` in ${input.location}`;
  }
  if (input.experience) {
    explanation += ` with ${input.experience} years experience`;
  }
  if (input.excludeCompanies?.length) {
    explanation += `, excluding ${input.excludeCompanies.join(", ")}`;
  }
  return explanation + ".";
}

function estimateVolume(input: BooleanQueryInput): "low" | "medium" | "high" {
  const specificityScore =
    input.skills.length +
    (input.experience ? 1 : 0) +
    (input.location ? 1 : 0) +
    (input.excludeCompanies?.length || 0) +
    (input.excludeTitles?.length || 0);

  if (specificityScore >= 6) return "low";
  if (specificityScore >= 3) return "medium";
  return "high";
}

function buildRefinementTips(input: BooleanQueryInput): string[] {
  const tips: string[] = [];

  if (input.skills.length > 5) {
    tips.push(
      "Consider reducing skills to top 3-4 must-haves. Too many OR conditions dilute quality."
    );
  }

  if (!input.experience) {
    tips.push(
      "Add an experience filter to reduce junior candidates in your results."
    );
  }

  if (!input.location) {
    tips.push(
      "Add a location filter unless the role is fully remote."
    );
  }

  if (!input.excludeCompanies?.length) {
    tips.push(
      "Exclude your own company and key competitors to avoid poaching noise."
    );
  }

  if (input.skills.length === 1) {
    tips.push(
      "A single skill is too broad. Add 2-3 related skills as OR conditions to capture variations."
    );
  }

  // Platform-specific tips
  if (input.platforms.includes("naukri")) {
    tips.push(
      "On Naukri: use the 'Active in last 15 days' filter to focus on candidates currently looking."
    );
  }

  if (input.platforms.includes("linkedin")) {
    tips.push(
      "On LinkedIn: combine boolean search with 'Open to Work' filter and '2nd degree connections' for warm leads."
    );
  }

  if (input.platforms.includes("github")) {
    tips.push(
      "On GitHub: sort by 'recently active' and check contribution graphs to verify active developers."
    );
  }

  return tips;
}
