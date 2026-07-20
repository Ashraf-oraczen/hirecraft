import { buildRubric } from "./_helpers";

export const businessAnalystRubric = buildRubric("business-analyst", "Business Analyst", "mid", ["requirements", "analysis", "stakeholders"], [
  { name: "Requirements gathering", weight: 25, description: "Elicits, documents, and validates requirements from diverse stakeholders.",
    scoringGuide: { 1: "Takes requirements at face value.", 2: "Documents stated requirements.", 3: "Probes for unstated needs. User stories with acceptance criteria. Gap analysis.", 4: "Navigates conflicting requirements diplomatically. Requirements that prevent rework.", 5: "Requirements methodology that scales across enterprise programs." } },
  { name: "Data analysis", weight: 25, description: "Analyzes data to inform business decisions. SQL, Excel, visualization.",
    scoringGuide: { 1: "Cannot query databases.", 2: "Basic Excel analysis.", 3: "SQL proficient. Pivot tables, lookups, basic visualization. Trend identification.", 4: "Complex analysis across multiple data sources. Statistical reasoning. Dashboard design.", 5: "Builds analytics frameworks. Predictive modeling. Data strategy influence." } },
  { name: "Process mapping & improvement", weight: 20, description: "Maps current-state processes, identifies inefficiencies, designs improved workflows.",
    scoringGuide: { 1: "No process documentation.", 2: "Documents existing processes.", 3: "BPMN or swimlane diagrams. Identifies bottlenecks. Improvement recommendations.", 4: "Redesigns cross-functional processes. Quantifies improvement impact.", 5: "Enterprise process architecture. Drives operational transformation." } },
  { name: "Stakeholder communication", weight: 15, description: "Translates between business and technical teams.",
    scoringGuide: { 1: "Uses jargon inappropriately.", 2: "Communicates within their team.", 3: "Clear documentation for both audiences. Facilitates productive meetings.", 4: "Trusted translator. Influences decision-making across functions.", 5: "Defines communication standards. Shapes organizational decision-making processes." } },
  { name: "Domain expertise", weight: 15, description: "Deep understanding of the industry/business domain they serve.",
    scoringGuide: { 1: "No domain knowledge.", 2: "Surface-level industry understanding.", 3: "Understands key business drivers, regulatory context, and competitive dynamics.", 4: "Subject matter expert. Anticipates business needs before they're articulated.", 5: "Industry thought leader. Shapes business strategy from analytical insights." } },
]);
