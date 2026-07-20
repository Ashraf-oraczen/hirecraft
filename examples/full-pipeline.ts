/**
 * recruitkit — Full Pipeline Example
 *
 * This example walks through the entire hiring pipeline:
 * 1. Generate intake questions for hiring manager meeting
 * 2. Generate a job description from intake answers
 * 3. Build boolean sourcing queries
 * 4. Screen resumes against the JD
 * 5. Generate screening questions
 * 6. Score candidates with rubrics
 * 7. Compare and rank candidates
 *
 * To run: ANTHROPIC_API_KEY=sk-... npx ts-node examples/full-pipeline.ts
 */

import {
  configure,
  // AI-powered modules
  generateIntakeQuestions,
  generateJD,
  screenResume,
  generateScreeningQs,
  compareCandidates,
  // Pure logic modules (no API key needed)
  buildBooleanQuery,
  createRubric,
  scoreCandidate,
  rankCandidates,
  // Compliance
  offerChecklist,
  bgvRequirements,
  probationRules,
  // Types
  listRubrics,
} from "../src/index";

async function main() {
  // ============================================
  // PART 1: Pure logic features (no API key)
  // ============================================

  console.log("=== HIRECRAFT — Pure Logic Demo ===\n");

  // --- Boolean Search Builder ---
  console.log("1. Building boolean sourcing queries...\n");

  const sourcing = buildBooleanQuery({
    role: "Engineering Manager",
    skills: ["python", "microservices", "team-lead", "agile"],
    experience: "8+",
    location: "Hyderabad",
    platforms: ["naukri", "linkedin", "github"],
    excludeCompanies: ["CurrentCorp"],
    excludeTitles: ["intern", "trainee"],
  });

  for (const [platform, query] of Object.entries(sourcing.queries)) {
    console.log(`  ${platform}:`);
    console.log(`    ${query}\n`);
  }
  console.log(`  Volume estimate: ${sourcing.estimatedVolume}`);
  console.log(`  Tips: ${sourcing.refinementTips[0]}\n`);

  // --- Rubrics ---
  console.log("2. Available built-in rubrics:", listRubrics().join(", "), "\n");

  const rubric = createRubric({
    role: "engineering-manager",
    level: "senior",
    weightOverrides: { "people-management": 30, "technical-depth": 15 },
    priorities: ["people-management", "delivery-execution"],
    industry: "enterprise-saas",
  });

  console.log(`  Rubric: ${rubric.role} (${rubric.level})`);
  console.log(`  Dimensions:`);
  for (const dim of rubric.dimensions) {
    console.log(`    - ${dim.name}: ${dim.weight}%`);
  }
  console.log();

  // --- Scoring ---
  console.log("3. Scoring candidates...\n");

  const aliceScore = scoreCandidate(rubric, [
    {
      candidateName: "Alice Chen",
      interviewerName: "Bob (HM)",
      interviewRound: 1,
      dimensionScores: [
        { dimensionId: "people-management", score: 4, notes: "Managed 12 engineers" },
        { dimensionId: "technical-depth", score: 3 },
        { dimensionId: "delivery-execution", score: 5, notes: "Led platform migration" },
        { dimensionId: "process-systems", score: 4 },
        { dimensionId: "communication-stakeholders", score: 4 },
        { dimensionId: "hiring-talent", score: 3 },
      ],
    },
    {
      candidateName: "Alice Chen",
      interviewerName: "Carol (VP Eng)",
      interviewRound: 2,
      dimensionScores: [
        { dimensionId: "people-management", score: 5 },
        { dimensionId: "technical-depth", score: 3 },
        { dimensionId: "delivery-execution", score: 4 },
        { dimensionId: "process-systems", score: 4 },
        { dimensionId: "communication-stakeholders", score: 5 },
        { dimensionId: "hiring-talent", score: 4 },
      ],
    },
  ]);

  const bobScore = scoreCandidate(rubric, [
    {
      candidateName: "Bob Kumar",
      interviewerName: "Bob (HM)",
      interviewRound: 1,
      dimensionScores: [
        { dimensionId: "people-management", score: 3 },
        { dimensionId: "technical-depth", score: 5, notes: "Deep systems expertise" },
        { dimensionId: "delivery-execution", score: 4 },
        { dimensionId: "process-systems", score: 3 },
        { dimensionId: "communication-stakeholders", score: 3 },
        { dimensionId: "hiring-talent", score: 2 },
      ],
    },
  ]);

  console.log(`  Alice: ${aliceScore.percentage}% (${aliceScore.interviewCount} rounds)`);
  console.log(`  Bob:   ${bobScore.percentage}% (${bobScore.interviewCount} round)`);

  const ranked = rankCandidates([aliceScore, bobScore]);
  console.log(`  Ranked: ${ranked.map((r) => `${r.candidateName} (${r.percentage}%)`).join(" > ")}\n`);

  // --- Compliance ---
  console.log("4. Indian compliance...\n");

  const checklist = offerChecklist();
  const mandatory = checklist.filter((item) => item.mandatory);
  console.log(`  Offer checklist: ${checklist.length} items (${mandatory.length} mandatory)`);

  const bgv = bgvRequirements("engineering");
  console.log(`  BGV checks: ${bgv.length} (${bgv.filter((b) => b.mandatory).length} mandatory)`);

  const probation = probationRules();
  console.log(`  Probation: ${probation.defaultPeriodMonths} months + ${probation.maxExtensionMonths} month extension max`);
  console.log(`  Notice during probation: ${probation.noticePeriodDuringProbation}\n`);

  // ============================================
  // PART 2: AI-powered features (needs API key)
  // ============================================

  if (!process.env.ANTHROPIC_API_KEY) {
    console.log("=== Set ANTHROPIC_API_KEY to run AI-powered features ===");
    return;
  }

  configure({ anthropicApiKey: process.env.ANTHROPIC_API_KEY });

  console.log("=== HIRECRAFT — AI-Powered Demo ===\n");

  // --- Intake ---
  console.log("5. Generating intake questions...\n");
  const intake = await generateIntakeQuestions({
    role: "Senior Backend Engineer",
    level: "senior",
    department: "engineering",
    context: "Replacing someone who left. Team handles payment processing. Python/FastAPI stack.",
  });

  for (const q of intake.questions.slice(0, 3)) {
    console.log(`  [${q.category}] ${q.question}`);
    console.log(`    Why: ${q.rationale}\n`);
  }
  console.log(`  ... and ${intake.questions.length - 3} more questions\n`);

  // --- JD Generation ---
  console.log("6. Generating job description...\n");
  const jd = await generateJD({
    intakeAnswers: {
      "role-scope": "Own the payments microservice, handle Stripe and Razorpay integration, build the billing system",
      "must-haves": "Python 3.10+, FastAPI, PostgreSQL, distributed systems, 5+ years",
      "nice-to-haves": "Payments domain experience, Kubernetes, event-driven architecture",
      "team-context": "Team of 6 backend engineers, reports to Engineering Manager",
    },
    role: "Senior Backend Engineer",
    level: "senior",
    department: "engineering",
    companyName: "FinPay Technologies",
    companyContext: "Series B fintech, 80 employees, processing $50M ARR",
    location: "Hyderabad",
    locationType: "hybrid",
    experienceRange: { min: 5, max: 10 },
  });

  console.log(`  Title: ${jd.title}`);
  console.log(`  Skills: ${jd.mustHaveSkills.join(", ")}`);
  console.log(`  Sourcing keywords: ${jd.sourcingKeywords.join(", ")}\n`);

  // --- Resume Screening ---
  console.log("7. Screening a resume...\n");
  const screenResult = await screenResume({
    resumeText: `Priya Sharma — Senior Software Engineer
5 years at TechCorp (2020-present): Led payments team of 3, built Stripe integration processing $2M/month, migrated monolith to microservices using Python/FastAPI.
2 years at StartupXYZ (2018-2020): Full-stack development with Django, PostgreSQL. Built REST APIs for fintech product.
Skills: Python, FastAPI, Django, PostgreSQL, Redis, Docker, AWS, Stripe API
Education: B.Tech Computer Science, IIIT Hyderabad (2018)`,
    jd: jd,
    candidateName: "Priya Sharma",
  });

  console.log(`  Score: ${screenResult.overallScore}/100 (${screenResult.recommendation})`);
  console.log(`  Strengths: ${screenResult.strengths.join(", ")}`);
  console.log(`  Concerns: ${screenResult.concerns.join(", ")}\n`);

  // --- Screening Questions ---
  console.log("8. Generating screening questions...\n");
  const qs = await generateScreeningQs({
    resumeText: "Priya Sharma — same resume as above...",
    jd: jd,
    screenResult: screenResult,
    count: 5,
    focus: ["technical", "behavioral", "red-flag-probe"],
  });

  for (const q of qs.questions.slice(0, 3)) {
    console.log(`  [${q.type}] ${q.question}`);
    console.log(`    Time: ${q.timeMinutes} min\n`);
  }

  console.log("=== Pipeline complete! ===\n");
}

main().catch(console.error);
