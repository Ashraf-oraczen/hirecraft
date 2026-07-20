import { IntakeInput, IntakeResult, IntakeQuestion } from "../types";
import { callClaudeJSON } from "../config";

/**
 * Generate pre-built questions for the hiring manager intake meeting.
 * AI-powered — requires ANTHROPIC_API_KEY.
 *
 * These questions help you extract the right information from a hiring manager
 * BEFORE you start sourcing, so you don't waste time on misaligned candidates.
 *
 * @example
 * ```ts
 * const result = await generateIntakeQuestions({
 *   role: 'Senior Backend Engineer',
 *   level: 'senior',
 *   department: 'engineering',
 *   context: 'Replacing someone who left. Team does payment processing.',
 * });
 *
 * result.questions.forEach(q => {
 *   console.log(`[${q.category}] ${q.question}`);
 *   console.log(`  Why: ${q.rationale}`);
 * });
 * ```
 */
export async function generateIntakeQuestions(
  input: IntakeInput
): Promise<IntakeResult> {
  const systemPrompt = `You are a senior technical recruiter with 10+ years of experience conducting hiring manager intake meetings. Your job is to generate the exact questions a recruiter should ask a hiring manager to fully understand the role BEFORE sourcing begins.

Your questions must cover these categories:
- role-scope: What exactly will this person do day-to-day? What does success look like at 30/60/90 days?
- team-context: Team size, reporting structure, collaboration patterns, who they'll work with most.
- must-haves: Non-negotiable skills, experience, and traits. Push the HM to prioritize — they can't have 15 must-haves.
- nice-to-haves: Things that would be great but aren't dealbreakers.
- culture: Working style, autonomy level, communication expectations, values alignment.
- logistics: Location, start date, travel, work hours, on-call requirements.
- budget: Comp range, equity, signing bonus flexibility. (Frame this tactfully.)
- timeline: Urgency, pipeline expectations, how many candidates to present.

Rules:
- Generate 12-18 questions total, covering all categories.
- Each question should have a clear rationale explaining WHY it matters for sourcing.
- Include 1-2 follow-up questions for when the HM gives a vague answer.
- Be specific to the role and level — don't ask generic questions.
- Frame budget questions diplomatically.`;

  const userPrompt = `Generate intake questions for this role:

Role: ${input.role}
Level: ${input.level}
Department: ${input.department}
${input.context ? `Additional context: ${input.context}` : ""}

Return JSON in this exact format:
{
  "questions": [
    {
      "id": "q1",
      "category": "role-scope",
      "question": "...",
      "rationale": "...",
      "followUps": ["...", "..."]
    }
  ]
}`;

  const { data, inputTokens, outputTokens } = await callClaudeJSON<{
    questions: IntakeQuestion[];
  }>(systemPrompt, userPrompt);

  return {
    questions: data.questions,
    estimatedTokens: inputTokens + outputTokens,
  };
}
