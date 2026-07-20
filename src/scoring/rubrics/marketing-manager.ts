import { buildRubric } from "./_helpers";

export const marketingManagerRubric = buildRubric("marketing-manager", "Marketing Manager", "mid", ["strategy", "content", "analytics"], [
  { name: "Marketing strategy", weight: 25, description: "Develops positioning, messaging, and GTM plans that drive pipeline.",
    scoringGuide: { 1: "Executes tactics with no strategy.", 2: "Follows templates for campaigns.", 3: "Develops channel strategies aligned to ICP. Clear positioning and messaging frameworks.", 4: "Shapes GTM strategy. Identifies new channels and audiences. Competitive positioning.", 5: "Defines market categories. Brand strategy that creates competitive moats." } },
  { name: "Content & creative", weight: 20, description: "Creates or directs compelling content across channels.",
    scoringGuide: { 1: "Generic, templated content.", 2: "Decent writing but no clear voice or differentiation.", 3: "Strong content across blog, social, email. Clear brand voice. SEO awareness.", 4: "Content that generates significant organic traffic and leads. Thought leadership.", 5: "Content strategy that defines the brand. Viral or industry-defining campaigns." } },
  { name: "Demand generation", weight: 25, description: "Builds and optimizes lead generation programs across channels.",
    scoringGuide: { 1: "No pipeline contribution.", 2: "Runs campaigns but can't attribute pipeline.", 3: "Multi-channel demand gen with clear attribution. Landing page optimization. Email nurture.", 4: "Full-funnel optimization. ABM programs. Predictable pipeline contribution.", 5: "Builds demand gen engine that scales with the company. Revenue marketing." } },
  { name: "Analytics & measurement", weight: 20, description: "Tracks, analyzes, and optimizes marketing performance with data.",
    scoringGuide: { 1: "No metrics.", 2: "Tracks vanity metrics (impressions, likes).", 3: "Measures CAC, pipeline contribution, conversion rates. A/B tests regularly.", 4: "Multi-touch attribution. Cohort analysis. Budget optimization with clear ROI.", 5: "Marketing analytics infrastructure. Predictive models. Data-driven budget allocation." } },
  { name: "Cross-functional partnership", weight: 10, description: "Works with sales, product, and customer success effectively.",
    scoringGuide: { 1: "Marketing operates in a silo.", 2: "Basic coordination with sales.", 3: "Sales enablement materials. Joint planning with sales. Product launch coordination.", 4: "Shapes product positioning. Customer advisory board. Revenue team alignment.", 5: "Defines how marketing partners with the entire org. GTM council leadership." } },
]);
