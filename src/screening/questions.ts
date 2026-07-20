import {
  ScreeningQsInput,
  ScreeningQsResult,
  ScreeningQuestion,
  JobDescription,
} from "../types";
import { callClaudeJSON } from "../config";

/**
 * Generate candidate-specific screening questions based on their resume, the JD,
 * and optional screening results. Each question targets a specific gap or area to probe.
 * AI-powered — requires ANTHROPIC_API_KEY.
 *
 * @example
 * ```ts
 * const qs = await generateScreeningQs({
 *   resumeText: '... parsed resume ...',
 *   jd: myJobDescription,
 *   screenResult: previousScreenResult,  // optional, enriches question targeting
 *   count: 8,
 *   focus: ['technical', 'behavioral', 'red-flag-probe'],
 * });
 *
 * qs.questions.forEach(q => {
 *   console.log(`[${q.type}] ${q.question}`);
 *   console.log(`  Look for: ${q.evaluationCriteria.join(', ')}`);
 *   console.log(`  Time: ${q.timeMinutes} min`);
 * });
 * ```
 */
export async function generateScreeningQs(
  input: ScreeningQsInput
): Promise<ScreeningQsResult> {
  const jdText =
    typeof input.jd === "string" ? input.jd : input.jd.fullText;

  const count = input.count || 8;
  const focus = input.focus || [
    "technical",
    "behavioral",
    "situational",
    "red-flag-probe",
  ];

  const screenContext = input.screenResult
    ? `\nPREVIOUS SCREENING RESULTS:
Score: ${input.screenResult.overallScore}/100 (${input.screenResult.recommendation})
Strengths: ${input.screenResult.strengths.join("; ")}
Concerns: ${input.screenResult.concerns.join("; ")}
Red flags: ${input.screenResult.redFlags.join("; ")}
Needs verification: ${input.screenResult.needsVerification.join("; ")}`
    : "";

  const systemPrompt = `You are a senior recruiter preparing screening questions for a specific candidate. Your questions are tailored to THIS person's background — not generic.

Question types:
- technical: Probe specific technical claims on their resume. Ask about real scenarios, not textbook definitions.
- behavioral: Past behavior predicts future behavior. Use STAR format triggers ("Tell me about a time when...").
- situational: Hypothetical scenarios relevant to the role. ("How would you handle...").
- culture-fit: Work style, values, team dynamics. Not "are you a team player" — probe specific situations.
- red-flag-probe: Diplomatically investigate gaps, short tenures, vague descriptions, or inconsistencies.

Rules:
- Each question must explain WHY it was generated for this specific candidate.
- Include what a GOOD answer looks like and what to listen for.
- Allocate realistic time per question (2-5 minutes each).
- If there are red flags from screening, include probe questions for them.
- Don't ask questions the resume already clearly answers.
- Total time should be reasonable for a 30-45 minute screening call.`;

  const userPrompt = `Generate ${count} screening questions for this candidate.

Focus on these question types: ${focus.join(", ")}

JOB DESCRIPTION:
${jdText}

CANDIDATE RESUME:
${input.resumeText}
${screenContext}

Return JSON:
{
  "questions": [
    {
      "id": "sq1",
      "type": "technical",
      "question": "...",
      "idealAnswer": "...",
      "evaluationCriteria": ["...", "..."],
      "rationale": "Why this question for this candidate",
      "timeMinutes": 3
    }
  ]
}`;

  const { data, inputTokens, outputTokens } = await callClaudeJSON<{
    questions: ScreeningQuestion[];
  }>(systemPrompt, userPrompt);

  const totalTime = data.questions.reduce((sum, q) => sum + q.timeMinutes, 0);

  return {
    questions: data.questions,
    totalTimeMinutes: totalTime,
    estimatedTokens: inputTokens + outputTokens,
  };
}
