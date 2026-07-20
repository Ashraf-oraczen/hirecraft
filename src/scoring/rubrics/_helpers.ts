import { Rubric, RubricDimension } from "../../types";

/**
 * Helper to build a rubric from concise dimension definitions.
 * Auto-generates dimension IDs from names.
 */
export function buildRubric(
  id: string,
  role: string,
  level: string,
  priorities: string[],
  dims: Omit<RubricDimension, "id">[]
): Rubric {
  let totalWeight = 0;
  const dimensions = dims.map((d) => {
    totalWeight += d.weight;
    return { ...d, id: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") };
  });
  return {
    id,
    role,
    level: level as any,
    totalWeight,
    metadata: { priorities, createdAt: "2026-07-16" },
    dimensions,
  };
}
