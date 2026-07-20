// ============================================================
// recruitkit — AI-powered recruitment toolkit
// Practitioner-grade hiring intelligence as code.
// ============================================================

// ---- Configuration ----
export { configure } from "./config";
export { HireCraftConfig } from "./types";

// ---- Module 1: Intake ----
export { generateIntakeQuestions } from "./intake/index";

// ---- Module 2: JD Generator ----
export { generateJD } from "./jd/index";

// ---- Module 3: Sourcing ----
export { buildBooleanQuery } from "./sourcing/boolean";
export { searchProfiles } from "./sourcing/exa";

// ---- Module 4: Resume Screening ----
export { screenResume } from "./screening/resume";

// ---- Module 5: Screening Questions ----
export { generateScreeningQs } from "./screening/questions";

// ---- Module 6: Rubrics & Scoring ----
export { createRubric } from "./scoring/rubric";
export { scoreCandidate, rankCandidates } from "./scoring/score";
export { listRubrics, getBuiltInRubric } from "./scoring/rubrics/index";

// ---- Module 7: Comparison ----
export { compareCandidates } from "./comparison/index";

// ---- Compliance: India ----
export {
  offerChecklist,
  bgvRequirements,
  probationRules,
} from "./compliance/india/index";

// ---- Types (re-export all for consumer use) ----
export type {
  // Config
  SeniorityLevel,
  Department,
  Platform,
  // Intake
  IntakeInput,
  IntakeQuestion,
  IntakeResult,
  // JD
  JDInput,
  JobDescription,
  // Sourcing
  BooleanQueryInput,
  BooleanQueryResult,
  ProfileSearchInput,
  CandidateProfile,
  ProfileSearchResult,
  // Screening
  ScreenResumeInput,
  ScreenResult,
  DimensionScore,
  ScreeningQsInput,
  ScreeningQuestion,
  ScreeningQsResult,
  // Scoring
  BuiltInRubricId,
  Rubric,
  RubricDimension,
  InterviewScore,
  ScoredCandidate,
  // Comparison
  ComparisonInput,
  ComparisonResult,
  RankedCandidate,
  // Compliance
  OfferChecklistItem,
  BGVRequirement,
  ProbationRules,
} from "./types";
