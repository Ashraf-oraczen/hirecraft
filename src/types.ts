// ============================================================
// recruitkit — Type definitions
// ============================================================

// ---- Config ----

export interface HireCraftConfig {
  anthropicApiKey?: string;
  exaApiKey?: string;
  /** Claude model to use. Default: claude-sonnet-4-6 */
  model?: string;
  /** Max tokens per AI call. Default: 4096 */
  maxTokens?: number;
  /** Budget cap per operation in estimated USD. Default: 0.50 */
  budgetCapUsd?: number;
}

// ---- Common ----

export type SeniorityLevel = 'intern' | 'junior' | 'mid' | 'senior' | 'staff' | 'principal' | 'lead' | 'manager' | 'director' | 'vp';
export type Department = 'engineering' | 'product' | 'design' | 'data' | 'devops' | 'qa' | 'hr' | 'sales' | 'marketing' | 'customer-success' | 'finance' | 'operations' | 'legal';

export type Platform = 'naukri' | 'linkedin' | 'indeed' | 'github' | 'stackoverflow' | 'instahyre' | 'iimjobs';

// ---- Module 1: Intake ----

export interface IntakeInput {
  role: string;
  level: SeniorityLevel;
  department: Department;
  /** Optional: specifics the hiring manager already shared */
  context?: string;
}

export interface IntakeQuestion {
  id: string;
  category: 'role-scope' | 'team-context' | 'must-haves' | 'nice-to-haves' | 'culture' | 'logistics' | 'budget' | 'timeline';
  question: string;
  /** Why this question matters for sourcing/screening */
  rationale: string;
  /** Suggested follow-ups if the answer is vague */
  followUps: string[];
}

export interface IntakeResult {
  questions: IntakeQuestion[];
  estimatedTokens: number;
}

// ---- Module 2: JD Generator ----

export interface JDInput {
  intakeAnswers: Record<string, string>;
  role: string;
  level: SeniorityLevel;
  department: Department;
  companyName?: string;
  companyContext?: string;
  /** Location requirement */
  location?: string;
  locationType?: 'remote' | 'hybrid' | 'onsite';
  /** Experience range in years */
  experienceRange?: { min: number; max: number };
}

export interface JobDescription {
  title: string;
  summary: string;
  responsibilities: string[];
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  qualifications: string[];
  experienceRange: { min: number; max: number };
  location: string;
  locationType: 'remote' | 'hybrid' | 'onsite';
  /** Full formatted JD text */
  fullText: string;
  /** Extracted keywords for sourcing */
  sourcingKeywords: string[];
  estimatedTokens: number;
}

// ---- Module 3: Sourcing ----

export interface BooleanQueryInput {
  /** Primary role/title keywords */
  role: string;
  /** Required technical skills */
  skills: string[];
  /** Minimum years of experience */
  experience?: string;
  /** Location filter */
  location?: string;
  /** Target platforms */
  platforms: Platform[];
  /** Exclude companies */
  excludeCompanies?: string[];
  /** Exclude titles */
  excludeTitles?: string[];
}

export interface BooleanQueryResult {
  queries: Record<Platform, string>;
  /** Human-readable explanation of the query logic */
  explanation: string;
  /** Estimated result volume: low / medium / high */
  estimatedVolume: 'low' | 'medium' | 'high';
  /** Suggestions to broaden or narrow */
  refinementTips: string[];
}

export interface ProfileSearchInput {
  /** JD object or raw description text */
  jd: JobDescription | string;
  /** Max profiles to return */
  maxProfiles?: number;
  /** Generate personalized outreach messages */
  generateMessages?: boolean;
}

export interface CandidateProfile {
  name: string;
  url: string;
  title: string;
  company: string;
  skills: string[];
  experienceYears: number | null;
  matchScore: number;
  /** Personalized connection message if requested */
  connectionMessage?: string;
}

export interface ProfileSearchResult {
  profiles: CandidateProfile[];
  totalFound: number;
  estimatedTokens: number;
}

// ---- Module 4: Resume Screening ----

export interface ScreenResumeInput {
  /** Resume text (parsed by developer) */
  resumeText: string;
  /** JD to screen against */
  jd: JobDescription | string;
  /** Custom rubric or use built-in */
  rubric?: Rubric;
  /** Candidate name for tracking */
  candidateName?: string;
}

export interface ScreenResult {
  candidateName: string;
  overallScore: number;
  /** 'strong-yes' | 'yes' | 'maybe' | 'no' | 'strong-no' */
  recommendation: 'strong-yes' | 'yes' | 'maybe' | 'no' | 'strong-no';
  dimensionScores: DimensionScore[];
  strengths: string[];
  concerns: string[];
  /** Red flags: employment gaps, skill mismatches, etc. */
  redFlags: string[];
  /** Missing info that needs verification */
  needsVerification: string[];
  estimatedTokens: number;
}

export interface DimensionScore {
  dimension: string;
  score: number;
  maxScore: number;
  evidence: string;
}

// ---- Module 5: Screening Questions ----

export interface ScreeningQsInput {
  resumeText: string;
  jd: JobDescription | string;
  screenResult?: ScreenResult;
  /** Number of questions to generate */
  count?: number;
  /** Focus areas */
  focus?: ('technical' | 'behavioral' | 'situational' | 'culture-fit' | 'red-flag-probe')[];
}

export interface ScreeningQuestion {
  id: string;
  type: 'technical' | 'behavioral' | 'situational' | 'culture-fit' | 'red-flag-probe';
  question: string;
  /** What a good answer looks like */
  idealAnswer: string;
  /** What to listen for */
  evaluationCriteria: string[];
  /** Why this question was generated for this specific candidate */
  rationale: string;
  /** Time allocation in minutes */
  timeMinutes: number;
}

export interface ScreeningQsResult {
  questions: ScreeningQuestion[];
  totalTimeMinutes: number;
  estimatedTokens: number;
}

// ---- Module 6: Rubrics & Scoring ----

export type BuiltInRubricId =
  | 'engineering-manager'
  | 'frontend-developer'
  | 'backend-developer'
  | 'fullstack-developer'
  | 'product-manager'
  | 'data-engineer'
  | 'devops-engineer'
  | 'qa-engineer'
  | 'ui-ux-designer'
  | 'hr-recruiter'
  | 'sales-executive'
  | 'marketing-manager'
  | 'customer-success-manager'
  | 'business-analyst'
  | 'data-scientist';

export interface RubricDimension {
  id: string;
  name: string;
  description: string;
  weight: number;
  /** What each score level means */
  scoringGuide: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
}

export interface Rubric {
  id: string;
  role: string;
  level: SeniorityLevel;
  dimensions: RubricDimension[];
  /** Total weight should sum to 100 */
  totalWeight: number;
  metadata?: {
    industry?: string;
    priorities?: string[];
    createdAt: string;
  };
}

export interface InterviewScore {
  candidateName: string;
  interviewerName: string;
  interviewRound: number;
  dimensionScores: { dimensionId: string; score: number; notes?: string }[];
  overallNotes?: string;
}

export interface ScoredCandidate {
  candidateName: string;
  rubricId: string;
  weightedScore: number;
  maxPossibleScore: number;
  percentage: number;
  dimensionBreakdown: {
    dimensionId: string;
    dimensionName: string;
    rawScore: number;
    weight: number;
    weightedScore: number;
    interviewerScores: { interviewer: string; score: number }[];
  }[];
  interviewCount: number;
}

// ---- Module 7: Comparison ----

export interface ComparisonInput {
  candidates: {
    name: string;
    screenResult?: ScreenResult;
    scoredRubric?: ScoredCandidate;
    /** Any additional notes/context */
    notes?: string;
  }[];
  /** What matters most for this hire */
  priorities?: string[];
  /** Team context for culture fit */
  teamContext?: string;
}

export interface ComparisonResult {
  rankedCandidates: RankedCandidate[];
  /** Head-to-head tradeoff analysis */
  tradeoffAnalysis: string;
  /** AI recommendation with reasoning */
  recommendation: string;
  /** Risks of the top pick */
  topPickRisks: string[];
  estimatedTokens: number;
}

export interface RankedCandidate {
  rank: number;
  name: string;
  compositeScore: number;
  strengths: string[];
  weaknesses: string[];
  /** Best suited for what type of work/environment */
  bestFitFor: string;
}

// ---- Compliance: India ----

export interface OfferChecklistItem {
  id: string;
  category: 'statutory' | 'contractual' | 'recommended';
  item: string;
  description: string;
  legalReference?: string;
  mandatory: boolean;
}

export interface BGVRequirement {
  checkType: string;
  description: string;
  applicableTo: string[];
  estimatedDays: number;
  mandatory: boolean;
}

export interface ProbationRules {
  defaultPeriodMonths: number;
  maxExtensionMonths: number;
  noticePeriodDuringProbation: string;
  noticePeriodAfterConfirmation: string;
  confirmationProcess: string[];
  legalNotes: string[];
}
