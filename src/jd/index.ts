import { JDInput, JobDescription } from "../types";
import { callClaudeJSON } from "../config";

/**
 * Generate a complete job description from intake meeting data.
 * AI-powered — requires ANTHROPIC_API_KEY.
 *
 * @example
 * ```ts
 * const jd = await generateJD({
 *   intakeAnswers: {
 *     'role-scope': 'Own the payments microservice, handle Stripe integration...',
 *     'must-haves': 'Python, PostgreSQL, distributed systems experience...',
 *     'team-context': 'Team of 6, reports to VP Eng...',
 *   },
 *   role: 'Senior Backend Engineer',
 *   level: 'senior',
 *   department: 'engineering',
 *   companyName: 'Acme Corp',
 *   companyContext: 'Series B fintech startup, 80 employees',
 *   location: 'Hyderabad',
 *   locationType: 'hybrid',
 *   experienceRange: { min: 5, max: 10 },
 * });
 *
 * console.log(jd.fullText);           // Complete formatted JD
 * console.log(jd.sourcingKeywords);   // Keywords extracted for boolean search
 * ```
 */
export async function generateJD(input: JDInput): Promise<JobDescription> {
  const systemPrompt = `You are a senior HR professional who writes compelling, honest job descriptions. Your JDs attract qualified candidates while being transparent about what the role actually involves.

Rules:
- Write for humans, not ATS keyword stuffing.
- Be specific about what the person will DO, not vague competency lists.
- Separate must-haves from nice-to-haves clearly — don't make everything mandatory.
- Include realistic experience ranges, not "5-15 years" nonsense.
- Avoid corporate jargon: "synergize", "leverage", "drive innovation", "rockstar".
- Include what makes this opportunity compelling (team, tech, growth, impact).
- Extract 8-12 sourcing keywords that a recruiter would use in boolean searches.
- The fullText should be ready to post — complete, formatted, professional.`;

  const intakeData = Object.entries(input.intakeAnswers)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const userPrompt = `Generate a job description from this intake data:

Role: ${input.role}
Level: ${input.level}
Department: ${input.department}
${input.companyName ? `Company: ${input.companyName}` : ""}
${input.companyContext ? `Company context: ${input.companyContext}` : ""}
${input.location ? `Location: ${input.location}` : ""}
${input.locationType ? `Work type: ${input.locationType}` : ""}
${input.experienceRange ? `Experience: ${input.experienceRange.min}-${input.experienceRange.max} years` : ""}

Intake meeting notes:
${intakeData}

Return JSON in this exact format:
{
  "title": "...",
  "summary": "2-3 sentence role summary",
  "responsibilities": ["...", "..."],
  "mustHaveSkills": ["...", "..."],
  "niceToHaveSkills": ["...", "..."],
  "qualifications": ["...", "..."],
  "experienceRange": { "min": 5, "max": 10 },
  "location": "...",
  "locationType": "hybrid",
  "fullText": "Complete formatted JD as a single string with line breaks",
  "sourcingKeywords": ["keyword1", "keyword2", "..."]
}`;

  const { data, inputTokens, outputTokens } = await callClaudeJSON<
    Omit<JobDescription, "estimatedTokens">
  >(systemPrompt, userPrompt);

  return {
    ...data,
    estimatedTokens: inputTokens + outputTokens,
  };
}
