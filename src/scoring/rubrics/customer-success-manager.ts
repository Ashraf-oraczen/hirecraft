import { buildRubric } from "./_helpers";

export const customerSuccessRubric = buildRubric("customer-success-manager", "Customer Success Manager", "mid", ["retention", "expansion", "advocacy"], [
  { name: "Onboarding & adoption", weight: 25, description: "Drives new customers to value realization quickly.",
    scoringGuide: { 1: "No structured onboarding.", 2: "Follows a checklist without adapting to customer needs.", 3: "Tailored onboarding plans. Tracks adoption milestones. Escalates early if off-track.", 4: "Designs onboarding frameworks. Time-to-value optimization. Health scoring integration.", 5: "Builds scalable onboarding programs. Product-led + high-touch hybrid strategies." } },
  { name: "Retention & risk management", weight: 25, description: "Identifies churn risk early and intervenes effectively.",
    scoringGuide: { 1: "Surprised by churn.", 2: "Reacts to obvious warning signs.", 3: "Proactive health monitoring. Usage data analysis. Executive business reviews.", 4: "Predictive churn models. Multi-threaded relationships. Saves at-risk accounts consistently.", 5: "Industry-leading retention rates. Builds CS operations that prevent churn at scale." } },
  { name: "Expansion & upsell", weight: 20, description: "Identifies and drives expansion revenue within accounts.",
    scoringGuide: { 1: "Never mentions upsell.", 2: "Mentions features but doesn't drive commercial conversations.", 3: "Identifies expansion opportunities from usage patterns. Partners with sales on upsell.", 4: "Drives significant NRR through expansion. Value-based commercial conversations.", 5: "Builds expansion playbooks. CS as a revenue engine." } },
  { name: "Product feedback loop", weight: 15, description: "Channels customer feedback to product effectively.",
    scoringGuide: { 1: "No feedback captured.", 2: "Forwards individual requests.", 3: "Aggregates and prioritizes feedback. Patterns analysis. Product partnership.", 4: "Influences roadmap with data-backed customer insights. Beta program management.", 5: "Defines voice-of-customer function. Customer advisory board." } },
  { name: "Operational efficiency", weight: 15, description: "Manages book of business efficiently. Scales impact through automation and process.",
    scoringGuide: { 1: "Overwhelmed by account volume. No prioritization.", 2: "Manages accounts reactively.", 3: "Tiered engagement model. Automated touchpoints. Clear playbooks.", 4: "Manages 50+ accounts effectively. Tech-touch and high-touch balance.", 5: "Builds CS ops function. Automation that scales to 100+ accounts per CSM." } },
]);
