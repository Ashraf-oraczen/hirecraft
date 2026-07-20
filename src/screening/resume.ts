import {
  ScreenResumeInput,
  ScreenResult,
  JobDescription,
  Rubric,
} from "../types";
import { callClaudeJSON } from "../config";

/**
 * Screen a resume against a job description with structured scoring.
 * AI-powered — requires ANTHROPIC_API_KEY.
 *
 * @example
 * ```ts
 * const result = await screenResume({
 *   resumeText: '... parsed resume content ...',
 *   jd: myJobDescription,
 *   candidateName: 'Alice Chen',
 * });
 *
 * console.log(result.recommendation);  // 'yes' | 'no' | 'maybe' | ...
 * console.log(result.overallScore);    // 0-100
 * console.log(result.redFlags);        // ['3-year employment gap', ...]
 * ```
 */
export async function screenResume(
  input: ScreenResumeInput
): Promise<ScreenResult> {
  const jdText =
    typeof input.jd === "string" ? input.jd : formatJDForScreening(input.jd);

  const rubricText = input.rubric
    ? formatRubricForScreening(input.rubric)
    : "Use the job description requirements as the evaluation criteria.";

  const systemPrompt = `You are a senior technical recruiter screening resumes. You are thorough, fair, and evidence-based. You do NOT inflate scores to be nice — a 60/100 is a realistic score for a borderline candidate.

Evaluation principles:
- Score based on EVIDENCE in the resume, not assumptions about what they "probably" know.
- Flag gaps honestly — employment gaps, missing skills, over-qualification, under-qualification.
- Distinguish between "has done it" vs "claims familiarity with it".
- Consider career trajectory — is this person growing, plateauing, or declining?
- Red flags: frequent job changes (<1yr), unexplained gaps (>6mo), vague descriptions, title inflation.
- Things that need verification: claims without supporting detail, self-reported proficiency levels.

Scoring guide:
- 85-100: Strong Yes — clear match, proceed to interview immediately
- 70-84: Yes — good match with minor gaps worth exploring
- 55-69: Maybe — some fit but significant concerns to probe
- 40-54: No — poor match, would need exceptional interview to proceed
- 0-39: Strong No — fundamentally misaligned

Be calibrated. Most resumes should score 40-75. A 90+ is exceptional and rare.`;

  const userPrompt = `Screen this resume against the job description.

CANDIDATE: ${input.candidateName || "Unknown"}

JOB DESCRIPTION:
${jdText}

EVALUATION CRITERIA:
${rubricText}

RESUME:
${input.resumeText}

Return JSON:
{
  "candidateName": "${input.candidateName || "Unknown"}",
  "overallScore": 72,
  "recommendation": "yes",
  "dimensionScores": [
    { "dimension": "Technical skills", "score": 8, "maxScore": 10, "evidence": "..." }
  ],
  "strengths": ["...", "..."],
  "concerns": ["...", "..."],
  "redFlags": ["...", "..."],
  "needsVerification": ["...", "..."]
}`;

  const { data, inputTokens, outputTokens } = await callClaudeJSON<
    Omit<ScreenResult, "estimatedTokens">
  >(systemPrompt, userPrompt);

  return {
    ...data,
    estimatedTokens: inputTokens + outputTokens,
  };
}

function formatJDForScreening(jd: JobDescription): string {
  const sections = [
    `Title: ${jd.title}`,
    `Summary: ${jd.summary}`,
    `Must-have skills: ${jd.mustHaveSkills.join(", ")}`,
    `Nice-to-have skills: ${jd.niceToHaveSkills.join(", ")}`,
    `Experience: ${jd.experienceRange.min}-${jd.experienceRange.max} years`,
    `Location: ${jd.location} (${jd.locationType})`,
  ];
  return sections.join("\n");
}

function formatRubricForScreening(rubric: Rubric): string {
  return rubric.dimensions
    .map(
      (d) =>
        `${d.name} (weight: ${d.weight}%): ${d.description}\n  Score 3 = ${d.scoringGuide[3]}\n  Score 5 = ${d.scoringGuide[5]}`
    )
    .join("\n\n");
}
