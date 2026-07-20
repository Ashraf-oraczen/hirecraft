import { Rubric } from "../../types";

export const engineeringManagerRubric: Rubric = {
  id: "engineering-manager",
  role: "Engineering Manager",
  level: "manager",
  totalWeight: 100,
  metadata: {
    priorities: ["people-management", "technical-depth", "delivery"],
    createdAt: "2026-07-16",
  },
  dimensions: [
    {
      id: "people-management",
      name: "People management & team building",
      description:
        "Ability to hire, retain, grow, and performance-manage a team of 8+ engineers. Includes conflict resolution, career pathing, and creating psychological safety.",
      weight: 25,
      scoringGuide: {
        1: "No direct reports experience. Confuses tech lead with management.",
        2: "Managed 1-3 people informally. No experience with PIPs, promotions, or structured 1:1s.",
        3: "Managed 4-7 engineers. Has done hiring and performance reviews. Basic retention awareness.",
        4: "Managed 8-12 engineers. Track record of growing engineers to senior/lead. Handles difficult conversations. Has managed managers or led through a re-org.",
        5: "Built and scaled teams from scratch (0→15+). Established engineering ladders, review cycles, and culture rituals. Evidence of high retention and internal promotions.",
      },
    },
    {
      id: "technical-depth",
      name: "Technical depth & architecture judgment",
      description:
        "Can review architecture decisions, unblock engineers on hard problems, and make build-vs-buy calls. Does NOT need to write production code daily.",
      weight: 20,
      scoringGuide: {
        1: "Cannot discuss system design tradeoffs. Purely process/project manager.",
        2: "Understands codebase at a high level but cannot review PRs or assess technical risk.",
        3: "Can review design docs and identify risks. Familiar with the tech stack. Asks good questions in architecture reviews.",
        4: "Deep in at least one area (backend, infra, data). Can prototype solutions. Engineers respect their technical judgment.",
        5: "Could function as a staff engineer if needed. Drives technical strategy alongside IC leads. Published or open-source contributions.",
      },
    },
    {
      id: "delivery-execution",
      name: "Delivery & execution",
      description:
        "Track record of shipping complex projects on time. Manages scope, dependencies, and cross-team coordination. Handles ambiguity without paralysis.",
      weight: 20,
      scoringGuide: {
        1: "No evidence of owning end-to-end delivery. Worked only on individual tasks.",
        2: "Delivered small features. Struggles with multi-team dependencies or ambiguous requirements.",
        3: "Shipped medium projects (2-3 month timelines). Uses sprint/kanban effectively. Reasonable at scope management.",
        4: "Delivered large cross-functional projects (6+ months, 3+ teams). Proactive risk mitigation. Stakeholder management evidence.",
        5: "Led org-wide platform migrations, product launches, or 0→1 initiatives with multiple workstreams. Evidence of recovering failing projects.",
      },
    },
    {
      id: "process-systems",
      name: "Engineering process & systems thinking",
      description:
        "Establishes and iterates on team processes — sprint cadence, code review culture, incident response, on-call, deployment practices. Knows when process helps and when it's overhead.",
      weight: 15,
      scoringGuide: {
        1: "No process awareness. Ad-hoc everything.",
        2: "Follows existing processes but hasn't established or improved any.",
        3: "Set up basic sprint ceremonies and code review guidelines. Uses Jira/Linear competently.",
        4: "Designed incident response, on-call rotations, or deployment pipelines. Improved team velocity measurably. Balanced process with autonomy.",
        5: "Built engineering processes that scaled across multiple teams. Established engineering-wide standards (RFC process, ADRs, SLOs). Evidence of removing bad process too.",
      },
    },
    {
      id: "communication-stakeholders",
      name: "Communication & stakeholder management",
      description:
        "Communicates clearly up (to leadership), down (to team), and across (to product, design, other eng teams). Shields team from noise while keeping them informed.",
      weight: 10,
      scoringGuide: {
        1: "Poor communicator. Cannot summarize status for non-technical stakeholders.",
        2: "Adequate written communication. Struggles with executive-level updates or cross-functional alignment.",
        3: "Clear in 1:1s and team meetings. Can present project status to leadership. Reasonable at managing product expectations.",
        4: "Strong written and verbal communicator. Influences product roadmap. Navigates conflicting stakeholder priorities diplomatically.",
        5: "Executive-level communication. Represents engineering in board/investor contexts. Published thought leadership. Mentors other managers on communication.",
      },
    },
    {
      id: "hiring-talent",
      name: "Hiring & talent assessment",
      description:
        "Can source, assess, and close engineering candidates. Designs interview loops, calibrates evaluations, and makes defensible hire/no-hire decisions.",
      weight: 10,
      scoringGuide: {
        1: "Never involved in hiring beyond passing referrals.",
        2: "Conducted interviews but didn't design the process. Relies heavily on recruiter judgment.",
        3: "Designed interview questions for their team. Can assess technical and cultural fit. Reasonable close rate.",
        4: "Built interview processes from scratch. Trained other interviewers. Track record of strong hires with low regrettable attrition.",
        5: "Established org-wide hiring bars, built rubrics, ran calibration sessions. Known as someone whose team consistently has top talent.",
      },
    },
  ],
};
