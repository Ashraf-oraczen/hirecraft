import {
  Rubric,
  SeniorityLevel,
  BuiltInRubricId,
  RubricDimension,
} from "../types";
import { getBuiltInRubric, listRubrics } from "./rubrics/index";

export interface CreateRubricOptions {
  /** Built-in rubric ID to start from */
  role: BuiltInRubricId | string;
  /** Adjust the seniority level (shifts scoring guide expectations) */
  level?: SeniorityLevel;
  /** Override dimension weights (dimensionId → new weight) */
  weightOverrides?: Record<string, number>;
  /** Add custom dimensions */
  additionalDimensions?: RubricDimension[];
  /** Remove dimensions by ID */
  removeDimensions?: string[];
  /** Priority labels for metadata */
  priorities?: string[];
  /** Industry context */
  industry?: string;
}

/**
 * Create a rubric from a built-in template with optional customization.
 *
 * @example
 * ```ts
 * // Use a built-in rubric as-is
 * const rubric = createRubric({ role: 'engineering-manager' });
 *
 * // Customize weights for your hiring priorities
 * const rubric = createRubric({
 *   role: 'frontend-developer',
 *   level: 'senior',
 *   weightOverrides: { 'performance': 25, 'css-ui-craft': 10 },
 *   priorities: ['performance', 'system-design'],
 * });
 * ```
 */
export function createRubric(options: CreateRubricOptions): Rubric {
  const builtInIds = listRubrics();

  // Check if it's a built-in rubric
  if (builtInIds.includes(options.role as BuiltInRubricId)) {
    const rubric = getBuiltInRubric(options.role as BuiltInRubricId);
    return customizeRubric(rubric, options);
  }

  // If not built-in, create a minimal custom rubric shell
  throw new Error(
    `[recruitkit] "${options.role}" is not a built-in rubric. ` +
      `Available: ${builtInIds.join(", ")}. ` +
      `Use enhanceRubric() from recruitkit/ai to generate custom rubrics with Claude, ` +
      `or pass a full Rubric object to scoreCandidate() directly.`
  );
}

function customizeRubric(
  rubric: Rubric,
  options: CreateRubricOptions
): Rubric {
  // Remove dimensions if specified
  if (options.removeDimensions?.length) {
    rubric.dimensions = rubric.dimensions.filter(
      (d) => !options.removeDimensions!.includes(d.id)
    );
  }

  // Override weights
  if (options.weightOverrides) {
    for (const [dimId, newWeight] of Object.entries(options.weightOverrides)) {
      const dim = rubric.dimensions.find((d) => d.id === dimId);
      if (dim) {
        dim.weight = newWeight;
      }
    }
  }

  // Add custom dimensions
  if (options.additionalDimensions?.length) {
    rubric.dimensions.push(...options.additionalDimensions);
  }

  // Recalculate total weight
  rubric.totalWeight = rubric.dimensions.reduce((sum, d) => sum + d.weight, 0);

  // Normalize weights to sum to 100
  if (rubric.totalWeight !== 100) {
    const factor = 100 / rubric.totalWeight;
    rubric.dimensions.forEach((d) => {
      d.weight = Math.round(d.weight * factor);
    });
    // Fix rounding to exactly 100
    const newTotal = rubric.dimensions.reduce((sum, d) => sum + d.weight, 0);
    if (newTotal !== 100 && rubric.dimensions.length > 0) {
      rubric.dimensions[0].weight += 100 - newTotal;
    }
    rubric.totalWeight = 100;
  }

  // Update metadata
  if (options.level) rubric.level = options.level;
  if (options.priorities) {
    rubric.metadata = { ...rubric.metadata, priorities: options.priorities, createdAt: rubric.metadata?.createdAt || new Date().toISOString() };
  }
  if (options.industry) {
    rubric.metadata = { ...rubric.metadata, industry: options.industry, createdAt: rubric.metadata?.createdAt || new Date().toISOString() };
  }

  return rubric;
}
