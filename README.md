# recruitkit

**AI-powered recruitment toolkit — practitioner-grade hiring intelligence as code.**

Built by an HR professional who codes. 15 hand-built interview rubrics, boolean sourcing for Indian job platforms, Claude-powered resume screening, and Indian labor law compliance — all in one `npm install`.

```bash
npm install recruitkit
```

---

## Why recruitkit?

Most HR tools are UI-heavy SaaS products that cost $500+/month. Most open-source alternatives are built by developers who've never actually hired anyone.

**recruitkit** is different:

- **Practitioner-built rubrics** — Every scoring guide was written by someone who's actually evaluated Engineering Managers, Frontend Developers, Product Managers, and 12 other roles. Not generated. Not generic.
- **India-first compliance** — PF, ESI, Gratuity, POSH, Shops & Establishments Act, Telangana Professional Tax. Because 90% of HR tooling ignores India.
- **Works without AI** — Boolean search, rubrics, scoring, and compliance work offline with zero API calls. Claude integration enhances them, but isn't required.
- **Composable** — Use one function or chain the entire pipeline. You own the glue.

---

## Quick Start

### No API key needed

```typescript
import { buildBooleanQuery, createRubric, scoreCandidate, offerChecklist } from 'recruitkit';

// Generate platform-specific sourcing queries
const queries = buildBooleanQuery({
  role: 'Senior Backend Engineer',
  skills: ['python', 'fastapi', 'postgresql', 'microservices'],
  experience: '5+',
  location: 'Hyderabad',
  platforms: ['naukri', 'linkedin', 'github'],
  excludeCompanies: ['CurrentEmployer'],
});

console.log(queries.queries.naukri);
// → "Senior Backend Engineer" AND (python OR fastapi OR postgresql OR microservices) AND "5+ years" AND Hyderabad NOT ("CurrentEmployer")

console.log(queries.queries.linkedin);
// → title:"Senior Backend Engineer" AND (python OR fastapi OR postgresql) AND (microservices) AND location:"Hyderabad" NOT company:"CurrentEmployer"

// Get a practitioner-grade interview rubric
const rubric = createRubric({
  role: 'engineering-manager',
  level: 'senior',
  weightOverrides: { 'people-management': 30 },
  priorities: ['people-management', 'delivery-execution'],
});

// Score candidates from interview feedback
const scored = scoreCandidate(rubric, [
  {
    candidateName: 'Alice Chen',
    interviewerName: 'Bob (Hiring Manager)',
    interviewRound: 1,
    dimensionScores: [
      { dimensionId: 'people-management', score: 4, notes: 'Managed 12 engineers, strong retention' },
      { dimensionId: 'technical-depth', score: 3 },
      { dimensionId: 'delivery-execution', score: 5, notes: 'Led platform migration on time' },
      { dimensionId: 'process-systems', score: 4 },
      { dimensionId: 'communication-stakeholders', score: 4 },
      { dimensionId: 'hiring-talent', score: 3 },
    ],
  },
]);

console.log(scored.percentage); // 78.67%
console.log(scored.dimensionBreakdown);

// Indian compliance checklist
const checklist = offerChecklist();
const mandatory = checklist.filter(item => item.mandatory);
console.log(`${mandatory.length} mandatory items for an Indian offer letter`);
```

### With Claude AI

```typescript
import { configure, generateIntakeQuestions, generateJD, screenResume } from 'recruitkit';

configure({ anthropicApiKey: process.env.ANTHROPIC_API_KEY });

// Generate intake questions before the hiring manager meeting
const intake = await generateIntakeQuestions({
  role: 'Senior Backend Engineer',
  level: 'senior',
  department: 'engineering',
  context: 'Replacing someone who left. Team handles payment processing.',
});

intake.questions.forEach(q => {
  console.log(`[${q.category}] ${q.question}`);
  console.log(`  Why: ${q.rationale}`);
});

// Generate a JD from intake answers
const jd = await generateJD({
  intakeAnswers: {
    'role-scope': 'Own the payments microservice, handle Stripe integration...',
    'must-haves': 'Python, FastAPI, PostgreSQL, distributed systems, 5+ years',
  },
  role: 'Senior Backend Engineer',
  level: 'senior',
  department: 'engineering',
  companyName: 'Acme Corp',
  location: 'Hyderabad',
  locationType: 'hybrid',
  experienceRange: { min: 5, max: 10 },
});

// Screen resumes against the JD
const result = await screenResume({
  resumeText: '... parsed resume content ...',
  jd: jd,
  candidateName: 'Priya Sharma',
});

console.log(result.recommendation); // 'yes' | 'no' | 'maybe' | 'strong-yes' | 'strong-no'
console.log(result.overallScore);   // 0-100, calibrated (most resumes score 40-75)
console.log(result.redFlags);       // ['3-year employment gap', ...]
```

---

## Modules

| Module | Function | AI Required | Description |
|--------|----------|:-----------:|-------------|
| **Intake** | `generateIntakeQuestions()` | ✅ | Pre-built questions for hiring manager meetings |
| **JD** | `generateJD()` | ✅ | Job descriptions from intake data |
| **Sourcing** | `buildBooleanQuery()` | ❌ | Platform-specific search strings (Naukri, LinkedIn, Indeed, GitHub, Instahyre, IIMJobs) |
| **Sourcing** | `searchProfiles()` | ✅ + EXA | Find candidate profiles via EXA Search API |
| **Screening** | `screenResume()` | ✅ | Score resumes against JD with structured evaluation |
| **Screening** | `generateScreeningQs()` | ✅ | Candidate-specific screening questions |
| **Scoring** | `createRubric()` | ❌ | 15 built-in interview rubrics with customization |
| **Scoring** | `scoreCandidate()` | ❌ | Multi-interviewer weighted scoring engine |
| **Scoring** | `rankCandidates()` | ❌ | Rank scored candidates |
| **Comparison** | `compareCandidates()` | ✅ | AI-enhanced tradeoff analysis and recommendation |
| **Compliance** | `offerChecklist()` | ❌ | Indian offer letter compliance (17 items) |
| **Compliance** | `bgvRequirements()` | ❌ | Background verification requirements by role type |
| **Compliance** | `probationRules()` | ❌ | Indian probation and confirmation rules |

---

## Built-in Rubrics

15 practitioner-grade rubrics with 5-6 weighted dimensions each. Every scoring guide level (1-5) has specific, actionable descriptions — not generic "meets expectations" filler.

```typescript
import { listRubrics, getBuiltInRubric } from 'recruitkit';

console.log(listRubrics());
// ['engineering-manager', 'frontend-developer', 'backend-developer',
//  'fullstack-developer', 'product-manager', 'data-engineer',
//  'devops-engineer', 'qa-engineer', 'ui-ux-designer', 'hr-recruiter',
//  'sales-executive', 'marketing-manager', 'customer-success-manager',
//  'business-analyst', 'data-scientist']

const rubric = getBuiltInRubric('frontend-developer');
rubric.dimensions.forEach(d => {
  console.log(`${d.name} (${d.weight}%)`);
  console.log(`  Score 3: ${d.scoringGuide[3]}`);
  console.log(`  Score 5: ${d.scoringGuide[5]}`);
});
```

Customize any rubric:

```typescript
const customRubric = createRubric({
  role: 'frontend-developer',
  level: 'senior',
  weightOverrides: {
    'performance': 25,        // Increase performance weight
    'css-ui-craft': 10,       // Decrease CSS weight
  },
  removeDimensions: ['collaboration'],  // Remove a dimension
  priorities: ['performance', 'typescript-quality'],
  industry: 'fintech',
});
```

---

## Indian Compliance

First-class support for Indian labor law, because no other npm package covers this.

```typescript
import { offerChecklist, bgvRequirements, probationRules } from 'recruitkit';

// Full offer compliance checklist
const checklist = offerChecklist();
// Returns 17 items covering:
// - PF enrollment (EPF Act, 1952)
// - ESI coverage (ESI Act, 1948)
// - Professional Tax (Telangana)
// - Gratuity disclosure (Payment of Gratuity Act, 1972)
// - Form 11 (PF declaration)
// - Shops & Establishments Act
// - POSH policy
// - CTC breakdown, notice period, probation terms
// - ESOP details, BGV consent, medical insurance

// BGV requirements filtered by role
const bgv = bgvRequirements('finance');
// Includes credit check and sanctions screening for finance roles

// Probation rules with legal notes
const rules = probationRules();
console.log(rules.legalNotes);
// Includes deemed confirmation, gratuity clock, statutory benefits from Day 1
```

---

## Budget Guardrails

AI features include automatic cost estimation and budget caps to prevent surprise bills.

```typescript
configure({
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  budgetCapUsd: 0.25,  // Max estimated cost per API call
  model: 'claude-sonnet-4-6',
  maxTokens: 4096,
});

// Throws if estimated cost exceeds budget cap
await screenResume({ resumeText: veryLongResume, jd: myJD });
// Error: Estimated cost ($0.31) exceeds budget cap ($0.25)
```

---

## Architecture

```
recruitkit/
├── src/
│   ├── index.ts              # Public API exports
│   ├── types.ts              # All TypeScript types
│   ├── config.ts             # API keys, budget, Claude wrapper
│   ├── intake/               # generateIntakeQuestions()
│   ├── jd/                   # generateJD()
│   ├── sourcing/
│   │   ├── boolean.ts        # buildBooleanQuery() — pure logic
│   │   └── exa.ts            # searchProfiles() — EXA + Claude
│   ├── screening/
│   │   ├── resume.ts         # screenResume()
│   │   └── questions.ts      # generateScreeningQs()
│   ├── scoring/
│   │   ├── rubric.ts         # createRubric()
│   │   ├── score.ts          # scoreCandidate(), rankCandidates()
│   │   └── rubrics/          # 15 built-in rubrics
│   ├── comparison/           # compareCandidates()
│   └── compliance/
│       └── india/            # offerChecklist(), bgvRequirements(), probationRules()
```

---

## License

MIT

---

Built with domain expertise from real-world recruiting at early-stage startups, and Claude by Anthropic for the AI layer.
