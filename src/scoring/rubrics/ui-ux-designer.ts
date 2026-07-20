import { buildRubric } from "./_helpers";

export const uiUxDesignerRubric = buildRubric("ui-ux-designer", "UI/UX Designer", "mid", ["user-research", "visual-craft", "systems-thinking"], [
  { name: "User research & insight", weight: 25, description: "Conducts and synthesizes research to inform design decisions.",
    scoringGuide: { 1: "Designs based on personal preference.", 2: "Conducts occasional usability tests.", 3: "Regular research cadence. Synthesizes findings into actionable insights. Persona development.", 4: "Mixed-method research (qual + quant). Identifies non-obvious user needs. Influences roadmap.", 5: "Research practice that scales across teams. Novel methodologies." } },
  { name: "Visual & interaction design", weight: 25, description: "Creates polished, consistent, and delightful interfaces.",
    scoringGuide: { 1: "Inconsistent spacing, colors, typography.", 2: "Clean but derivative designs.", 3: "Strong visual hierarchy, micro-interactions, consistent design language.", 4: "Distinctive visual style. Animation and motion design. Brand-defining interfaces.", 5: "Industry-recognized design quality. Defines visual trends." } },
  { name: "Design systems", weight: 20, description: "Creates and maintains scalable component libraries and design tokens.",
    scoringGuide: { 1: "No component reuse.", 2: "Uses existing design systems.", 3: "Extends design systems. Creates new components with proper documentation.", 4: "Builds design systems from scratch. Token architecture, theming, responsive patterns.", 5: "Design systems adopted across multiple products or open-sourced." } },
  { name: "Prototyping & validation", weight: 15, description: "Prototypes at appropriate fidelity, tests with users, iterates based on feedback.",
    scoringGuide: { 1: "Static mockups only.", 2: "Basic Figma prototypes.", 3: "Interactive prototypes. A/B tests. Iterates based on usability findings.", 4: "High-fidelity prototypes with real data. Complex interaction prototyping.", 5: "Code-level prototypes. Blurs line between design and engineering." } },
  { name: "Collaboration", weight: 15, description: "Partners with engineering, product, and stakeholders effectively.",
    scoringGuide: { 1: "Throws designs over the wall.", 2: "Responsive to engineering questions.", 3: "Designs with engineering constraints in mind. Clear specs and handoff.", 4: "Co-creates with engineers. Shapes product strategy. Facilitates design workshops.", 5: "Defines how design works with other functions. Mentors designers and engineers." } },
]);
