import {
  ProfileSearchInput,
  ProfileSearchResult,
  CandidateProfile,
  JobDescription,
} from "../types";
import { getConfig, callClaudeJSON } from "../config";

/**
 * Search for candidate profiles using EXA Search API.
 * Requires both EXA_API_KEY and ANTHROPIC_API_KEY (for message generation).
 *
 * @example
 * ```ts
 * import { configure } from 'recruitkit';
 * import { searchProfiles } from 'recruitkit/sourcing';
 *
 * configure({
 *   anthropicApiKey: process.env.ANTHROPIC_API_KEY,
 *   exaApiKey: process.env.EXA_API_KEY,
 * });
 *
 * const results = await searchProfiles({
 *   jd: myJobDescription,
 *   maxProfiles: 25,
 *   generateMessages: true,
 * });
 * ```
 */
export async function searchProfiles(
  input: ProfileSearchInput
): Promise<ProfileSearchResult> {
  const config = getConfig();

  if (!config.exaApiKey) {
    throw new Error(
      "[recruitkit] EXA API key required for profile search. " +
        "Call configure({ exaApiKey: '...' }) or set EXA_API_KEY env var."
    );
  }

  const exaKey = config.exaApiKey;
  const maxProfiles = input.maxProfiles || 25;
  const jdText = typeof input.jd === "string" ? input.jd : input.jd.fullText;

  // Build search query from JD
  const searchQuery = buildSearchQuery(input.jd);

  // Call EXA Search API
  const exaResponse = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": exaKey,
    },
    body: JSON.stringify({
      query: searchQuery,
      numResults: maxProfiles,
      type: "auto",
      useAutoprompt: true,
      contents: {
        text: true,
      },
    }),
  });

  if (!exaResponse.ok) {
    const errText = await exaResponse.text();
    throw new Error(
      `[recruitkit] EXA Search API error (${exaResponse.status}): ${errText}`
    );
  }

  const exaData = (await exaResponse.json()) as {
    results: { url: string; title: string; text: string }[];
  };

  // Parse profiles from EXA results
  let profiles: CandidateProfile[] = exaData.results.map((result, i) => ({
    name: extractNameFromTitle(result.title),
    url: result.url,
    title: extractTitleFromText(result.text),
    company: extractCompanyFromText(result.text),
    skills: [],
    experienceYears: null,
    matchScore: 0,
  }));

  // If message generation requested, use Claude to enrich + generate messages
  if (input.generateMessages && profiles.length > 0) {
    profiles = await enrichWithClaude(profiles, jdText);
  }

  return {
    profiles,
    totalFound: exaData.results.length,
    estimatedTokens: 0,
  };
}

function buildSearchQuery(jd: JobDescription | string): string {
  if (typeof jd === "string") {
    // Extract key terms from raw text
    return jd.slice(0, 500);
  }

  const parts = [jd.title];
  if (jd.mustHaveSkills.length > 0) {
    parts.push(jd.mustHaveSkills.slice(0, 5).join(", "));
  }
  if (jd.location) {
    parts.push(jd.location);
  }
  return parts.join(" ");
}

function extractNameFromTitle(title: string): string {
  // Try to get a name from LinkedIn-style titles
  const parts = title.split(/\s*[-–|]\s*/);
  return parts[0]?.trim() || "Unknown";
}

function extractTitleFromText(text: string): string {
  const lines = text.split("\n").filter((l) => l.trim());
  return lines[0]?.trim().slice(0, 100) || "Unknown";
}

function extractCompanyFromText(text: string): string {
  const atMatch = text.match(/(?:at|@)\s+([A-Z][A-Za-z\s&.]+)/);
  return atMatch?.[1]?.trim() || "Unknown";
}

async function enrichWithClaude(
  profiles: CandidateProfile[],
  jdText: string
): Promise<CandidateProfile[]> {
  const profileSummaries = profiles
    .map(
      (p, i) =>
        `${i + 1}. ${p.name} — ${p.title} at ${p.company} (${p.url})`
    )
    .join("\n");

  const { data } = await callClaudeJSON<{
    profiles: {
      index: number;
      matchScore: number;
      connectionMessage: string;
    }[];
  }>(
    `You are an expert technical recruiter. For each candidate profile, generate:
1. A match score (0-100) based on how well they fit the job description
2. A personalized LinkedIn connection message (under 300 characters) that references something specific about their background

Be direct and professional. No flattery or gimmicks.`,
    `Job Description:\n${jdText}\n\nCandidate Profiles:\n${profileSummaries}\n\nReturn JSON: { "profiles": [{ "index": 0, "matchScore": 85, "connectionMessage": "..." }] }`
  );

  // Merge enrichments back
  for (const enriched of data.profiles) {
    if (enriched.index >= 0 && enriched.index < profiles.length) {
      profiles[enriched.index].matchScore = enriched.matchScore;
      profiles[enriched.index].connectionMessage = enriched.connectionMessage;
    }
  }

  // Sort by match score descending
  profiles.sort((a, b) => b.matchScore - a.matchScore);

  return profiles;
}
