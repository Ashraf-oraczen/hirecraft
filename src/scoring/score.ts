import {
  Rubric,
  InterviewScore,
  ScoredCandidate,
} from "../types";

/**
 * Score a candidate against a rubric using one or more interviewer evaluations.
 *
 * @example
 * ```ts
 * const scored = scoreCandidate(rubric, [
 *   {
 *     candidateName: 'Alice',
 *     interviewerName: 'Bob (HM)',
 *     interviewRound: 1,
 *     dimensionScores: [
 *       { dimensionId: 'people-management', score: 4, notes: 'Strong track record...' },
 *       { dimensionId: 'technical-depth', score: 3 },
 *       // ... other dimensions
 *     ],
 *   },
 *   // Additional interviewer scores...
 * ]);
 *
 * console.log(scored.percentage); // 78.5
 * console.log(scored.dimensionBreakdown);
 * ```
 */
export function scoreCandidate(
  rubric: Rubric,
  interviewScores: InterviewScore[]
): ScoredCandidate {
  if (interviewScores.length === 0) {
    throw new Error("[recruitkit] At least one InterviewScore is required.");
  }

  const candidateName = interviewScores[0].candidateName;

  // Validate all scores are for the same candidate
  const uniqueCandidates = new Set(interviewScores.map((s) => s.candidateName));
  if (uniqueCandidates.size > 1) {
    throw new Error(
      `[recruitkit] All InterviewScores must be for the same candidate. Found: ${[...uniqueCandidates].join(", ")}`
    );
  }

  const dimensionBreakdown = rubric.dimensions.map((dim) => {
    // Collect all scores for this dimension across interviewers
    const scores: { interviewer: string; score: number }[] = [];

    for (const interview of interviewScores) {
      const dimScore = interview.dimensionScores.find(
        (ds) => ds.dimensionId === dim.id
      );
      if (dimScore) {
        // Validate score range
        if (dimScore.score < 1 || dimScore.score > 5) {
          throw new Error(
            `[recruitkit] Score for "${dim.name}" from ${interview.interviewerName} is ${dimScore.score}. Must be 1-5.`
          );
        }
        scores.push({
          interviewer: interview.interviewerName,
          score: dimScore.score,
        });
      }
    }

    // Average the scores across interviewers
    const rawScore =
      scores.length > 0
        ? scores.reduce((sum, s) => sum + s.score, 0) / scores.length
        : 0;

    // Weighted contribution: (rawScore / 5) * weight
    const weightedScore = (rawScore / 5) * dim.weight;

    return {
      dimensionId: dim.id,
      dimensionName: dim.name,
      rawScore: Math.round(rawScore * 100) / 100,
      weight: dim.weight,
      weightedScore: Math.round(weightedScore * 100) / 100,
      interviewerScores: scores,
    };
  });

  const weightedScore = dimensionBreakdown.reduce(
    (sum, d) => sum + d.weightedScore,
    0
  );
  const maxPossibleScore = rubric.totalWeight;
  const percentage =
    Math.round((weightedScore / maxPossibleScore) * 100 * 100) / 100;

  return {
    candidateName,
    rubricId: rubric.id,
    weightedScore: Math.round(weightedScore * 100) / 100,
    maxPossibleScore,
    percentage,
    dimensionBreakdown,
    interviewCount: interviewScores.length,
  };
}

/**
 * Compare multiple scored candidates and return them ranked.
 * Pure logic — no AI. For AI-enhanced comparison, use compareCandidates() from recruitkit/comparison.
 */
export function rankCandidates(
  scored: ScoredCandidate[]
): ScoredCandidate[] {
  return [...scored].sort((a, b) => b.percentage - a.percentage);
}
