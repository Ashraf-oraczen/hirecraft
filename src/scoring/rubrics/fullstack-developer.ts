import { buildRubric } from "./_helpers";

export const fullstackDeveloperRubric = buildRubric("fullstack-developer", "Fullstack Developer", "mid", ["versatility", "system-thinking"], [
  { name: "Frontend proficiency", weight: 20, description: "React/Next.js, CSS, responsive design, accessibility.",
    scoringGuide: { 1: "No frontend experience.", 2: "Basic React components, relies on UI libraries.", 3: "Builds complex UIs, custom hooks, state management.", 4: "Architects frontend systems, design system contributions.", 5: "Staff-level frontend skills alongside backend depth." } },
  { name: "Backend proficiency", weight: 20, description: "API design, database modeling, server-side logic.",
    scoringGuide: { 1: "No backend experience.", 2: "Basic CRUD APIs.", 3: "Designs multi-table schemas, auth flows, caching.", 4: "Builds scalable services, message queues, background jobs.", 5: "Architects distributed systems end-to-end." } },
  { name: "System integration", weight: 20, description: "Connects frontend, backend, third-party services, and infrastructure into working products.",
    scoringGuide: { 1: "Cannot deploy their own code.", 2: "Follows existing patterns for integration.", 3: "Sets up CI/CD, manages env configs, integrates APIs end-to-end.", 4: "Designs integration architecture. Handles auth flows, webhooks, real-time systems.", 5: "Builds entire product stacks solo. Makes definitive build-vs-buy decisions." } },
  { name: "Database & data", weight: 15, description: "SQL/NoSQL, migrations, query optimization, data modeling.",
    scoringGuide: { 1: "Cannot write SQL.", 2: "Basic queries, simple schemas.", 3: "Normalized schemas, indexing, migration safety.", 4: "Performance tuning, read replicas, multi-DB strategies.", 5: "Designs data architecture across OLTP and OLAP systems." } },
  { name: "Shipping & ownership", weight: 15, description: "Takes features from design to production. Monitors, debugs, and iterates.",
    scoringGuide: { 1: "Needs hand-holding at every step.", 2: "Completes assigned tasks within established patterns.", 3: "Owns features end-to-end. Writes tests, monitors production.", 4: "Drives technical decisions for their area. Mentors others. Handles incidents.", 5: "Defines technical direction for the team. Trusted to own critical paths." } },
  { name: "Code quality", weight: 10, description: "TypeScript, testing, documentation, PR quality.",
    scoringGuide: { 1: "No tests, unclear naming, no docs.", 2: "Basic tests, reasonable code.", 3: "Good test coverage, TypeScript discipline, clear PRs.", 4: "Sets team standards for quality. Refactors proactively.", 5: "Establishes org-wide coding standards and tooling." } },
]);
