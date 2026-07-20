import { buildRubric } from "./_helpers";

export const salesExecutiveRubric = buildRubric("sales-executive", "Sales Executive / AE", "mid", ["pipeline", "closing", "relationships"], [
  { name: "Pipeline generation", weight: 20, description: "Sources, qualifies, and builds pipeline independently.",
    scoringGuide: { 1: "Waits for inbound leads.", 2: "Basic cold outreach with low response rates.", 3: "Multi-channel prospecting. Qualifies rigorously. Consistent pipeline coverage.", 4: "Account-based strategies. Creates demand in net-new accounts. Strong personal brand.", 5: "Builds repeatable pipeline playbooks. Mentors team on prospecting." } },
  { name: "Discovery & qualification", weight: 25, description: "Uncovers real business pain, decision process, and budget through effective questioning.",
    scoringGuide: { 1: "Pitches features without understanding the prospect's situation.", 2: "Asks basic questions but misses decision-making dynamics.", 3: "Uses MEDDIC/BANT consistently. Maps buying committee. Identifies compelling events.", 4: "Discovers pain the prospect hasn't articulated. Multi-threaded across the org.", 5: "Reframes how prospects think about their problem. Creates urgency from insight." } },
  { name: "Closing & negotiation", weight: 25, description: "Drives deals to close on timeline. Handles objections and negotiates terms.",
    scoringGuide: { 1: "Avoids asking for the close.", 2: "Closes but folds on pricing quickly.", 3: "Consistent close rate. Handles common objections. Manages procurement process.", 4: "Closes complex multi-stakeholder deals. Negotiates value-based pricing. Wins competitive deals.", 5: "Closes transformational deals. Creates new deal structures. Highest win rate on the team." } },
  { name: "Product & domain knowledge", weight: 15, description: "Understands the product deeply enough to sell value, not features.",
    scoringGuide: { 1: "Cannot demo the product.", 2: "Feature-level knowledge. Relies on SE for everything.", 3: "Can run a full demo independently. Connects features to business outcomes.", 4: "Trusted as a domain advisor. Gives product feedback that shapes the roadmap.", 5: "Industry thought leader. Prospects seek them out for expertise." } },
  { name: "CRM & process discipline", weight: 15, description: "Maintains clean data, accurate forecasts, and follows sales methodology.",
    scoringGuide: { 1: "CRM is empty. Forecasts are fiction.", 2: "Updates CRM sporadically. Forecast accuracy below 60%.", 3: "Clean CRM hygiene. Stage-appropriate activities. 70%+ forecast accuracy.", 4: "Meticulous pipeline management. Identifies deal risks early. Coaches others on process.", 5: "Defines forecasting methodology. Process innovation that improves team performance." } },
]);
