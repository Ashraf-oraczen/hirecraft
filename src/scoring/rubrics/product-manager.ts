import { Rubric } from "../../types";

export const productManagerRubric: Rubric = {
  id: "product-manager",
  role: "Product Manager",
  level: "mid",
  totalWeight: 100,
  metadata: { priorities: ["user-insight", "prioritization", "execution"], createdAt: "2026-07-16" },
  dimensions: [
    {
      id: "user-insight", name: "User insight & problem discovery", weight: 25,
      description: "Ability to identify real user problems through research, data, and customer interaction — not just feature requests.",
      scoringGuide: {
        1: "Takes feature requests at face value. No user research practice.",
        2: "Conducts occasional user interviews but doesn't synthesize systematically. Relies on anecdotes.",
        3: "Regular user research cadence. Uses Jobs-to-be-Done or similar frameworks. Distinguishes problems from solutions in customer feedback.",
        4: "Combines qual + quant insights. Identifies underserved segments. Turns ambiguous signal into clear problem statements that engineering can act on.",
        5: "Discovers non-obvious user needs that create category-defining features. Builds continuous discovery practices that scale across teams.",
      },
    },
    {
      id: "prioritization", name: "Prioritization & strategic thinking", weight: 25,
      description: "Makes defensible tradeoff decisions with incomplete information. Connects feature work to business outcomes.",
      scoringGuide: {
        1: "Prioritizes by loudest stakeholder or HiPPO. No framework.",
        2: "Uses basic priority matrices but can't defend choices under pressure. Short-term focused.",
        3: "Applies RICE/ICE or similar consistently. Balances user value, business impact, and effort. Maintains a coherent roadmap.",
        4: "Strategic prioritization across quarters. Manages portfolio-level tradeoffs. Kills features that aren't working. Balances exploration vs exploitation.",
        5: "Shapes company strategy from product perspective. Makes bets that define market position. Portfolio thinking across multiple product lines.",
      },
    },
    {
      id: "execution", name: "Execution & shipping", weight: 20,
      description: "Drives from idea to shipped product. Manages scope, unblocks engineers, and iterates based on results.",
      scoringGuide: {
        1: "Writes specs and throws them over the wall. No follow-through.",
        2: "Attends standups but doesn't proactively unblock. Ships late or over-scoped.",
        3: "Writes clear specs with acceptance criteria. Manages scope proactively. Ships consistently. Iterates based on metrics.",
        4: "Runs complex multi-team initiatives. Navigates ambiguity. Adapts plans when assumptions break. Strong launch management.",
        5: "Ships 0→1 products that find PMF. Establishes execution culture that persists without them. Track record across multiple successful launches.",
      },
    },
    {
      id: "data-metrics", name: "Data literacy & metrics", weight: 15,
      description: "Defines success metrics, analyzes product data, and makes evidence-based decisions.",
      scoringGuide: {
        1: "No metrics defined for features. 'It feels like users like it.'",
        2: "Tracks basic metrics (DAU, conversion) but doesn't design experiments or analyze funnels.",
        3: "Defines OKRs with measurable key results. Sets up A/B tests. Analyzes funnels and cohorts. SQL-literate.",
        4: "Designs metric frameworks that catch leading indicators. Understands statistical significance. Uses data to kill features, not just validate them.",
        5: "Builds product analytics culture. Designs novel metrics that become company KPIs. Instrumental in data-informed product strategy.",
      },
    },
    {
      id: "communication", name: "Communication & influence", weight: 15,
      description: "Aligns engineering, design, leadership, and customers. Navigates disagreement productively.",
      scoringGuide: {
        1: "Cannot articulate 'why' behind decisions. Avoids conflict.",
        2: "Communicates clearly within the team. Struggles with executive updates or cross-functional negotiation.",
        3: "Clear PRDs, strong standup facilitation, good stakeholder updates. Can say 'no' with reasoning.",
        4: "Influences without authority. Aligns competing stakeholders. Represents product vision compellingly to executives and customers.",
        5: "Shapes organizational narrative. Trusted advisor to C-suite. Public thought leadership. Mentors other PMs.",
      },
    },
  ],
};
