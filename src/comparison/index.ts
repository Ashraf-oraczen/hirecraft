import {
  ComparisonInput,
  ComparisonResult,
  RankedCandidate,
} from "../types";
import { callClaudeJSON } from "../config";

/**
 * Compare multiple candidates with AI-enhanced tradeoff analysis.
 * Goes beyond raw scores to consider team fit, growth trajectory, and hiring priorities.
 * AI-powered — requires ANTHROPIC_API_KEY.
 *
 * @example
 * ```ts
 * const comparison = await compareCandidates({
 *   candidates: [
 *     {
 *       name: 'Alice',
 *       screenResult: aliceScreen,
 *       scoredRubric: aliceScored,
 *       notes: 'Great culture fit, team loved her',
 *     },
 *     {
 *       name: 'Bob',
 *       screenResult: bobScreen,
 *       scoredRubric: bobScored,
 *     },
 *   ],
 *   priorities: ['technical-depth', 'team-collaboration'],
 *   teamContext: 'Small team of 4, need someone who can mentor juniors',
 * });
 *
 * console.log(comparison.recommendation);
 * console.log(comparison.tradeoffAnalysis);
 * console.log(comparison.topPickRisks);
 * ```
 */
export async function compareCandidates(
  input: ComparisonInput
): Promise<ComparisonResult> {
  if (input.candidates.length < 2) {
    throw new Error("[recruitkit] Need at least 2 candidates to compare.");
  }

  const systemPrompt = `You are a senior HR leader helping make a final hiring decision. You analyze candidates holistically — not just scores, but trajectory, team fit, risk, and long-term value.

Your analysis must:
- Acknowledge that scores are inputs, not decisions. A candidate scoring 75 might be better than one scoring 82 depending on what dimensions matter most.
- Surface tradeoffs clearly: "Alice is stronger technically but Bob has more leadership experience."
- Be honest about risks with the top pick — what could go wrong?
- Consider team composition: does this person fill a gap or duplicate existing strengths?
- Flag if the candidates are too close to call and the decision depends on factors outside the data.

Do NOT:
- Default to the highest score.
- Recommend hiring someone just because they're the "best available" if none are good enough.
- Sugar-coat weaknesses.`;

  const candidateProfiles = input.candidates
    .map((c) => {
      const parts = [`Candidate: ${c.name}`];

      if (c.screenResult) {
        parts.push(
          `  Resume screen: ${c.screenResult.overallScore}/100 (${c.screenResult.recommendation})`
        );
        parts.push(`  Strengths: ${c.screenResult.strengths.join(", ")}`);
        parts.push(`  Concerns: ${c.screenResult.concerns.join(", ")}`);
        if (c.screenResult.redFlags.length) {
          parts.push(`  Red flags: ${c.screenResult.redFlags.join(", ")}`);
        }
      }

      if (c.scoredRubric) {
        parts.push(
          `  Interview score: ${c.scoredRubric.percentage}% (${c.scoredRubric.interviewCount} rounds)`
        );
        const topDims = c.scoredRubric.dimensionBreakdown
          .sort((a, b) => b.weightedScore - a.weightedScore)
          .slice(0, 3)
          .map((d) => `${d.dimensionName}: ${d.rawScore}/5`)
          .join(", ");
        parts.push(`  Top dimensions: ${topDims}`);
      }

      if (c.notes) {
        parts.push(`  Notes: ${c.notes}`);
      }

      return parts.join("\n");
    })
    .join("\n\n");

  const userPrompt = `Compare these candidates and make a recommendation.

${candidateProfiles}

${input.priorities?.length ? `Hiring priorities: ${input.priorities.join(", ")}` : ""}
${input.teamContext ? `Team context: ${input.teamContext}` : ""}

Return JSON:
{
  "rankedCandidates": [
    {
      "rank": 1,
      "name": "...",
      "compositeScore": 82,
      "strengths": ["...", "..."],
      "weaknesses": ["...", "..."],
      "bestFitFor": "..."
    }
  ],
  "tradeoffAnalysis": "2-3 paragraph analysis of key tradeoffs between candidates",
  "recommendation": "Clear recommendation with reasoning",
  "topPickRisks": ["Risk 1", "Risk 2"]
}`;

  const { data, inputTokens, outputTokens } = await callClaudeJSON<
    Omit<ComparisonResult, "estimatedTokens">
  >(systemPrompt, userPrompt);

  return {
    ...data,
    estimatedTokens: inputTokens + outputTokens,
  };
}
