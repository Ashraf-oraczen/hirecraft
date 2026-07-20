import { Rubric, BuiltInRubricId } from "../../types";
import { engineeringManagerRubric } from "./engineering-manager";
import { frontendDeveloperRubric } from "./frontend-developer";
import { backendDeveloperRubric } from "./backend-developer";
import { productManagerRubric } from "./product-manager";
import { fullstackDeveloperRubric } from "./fullstack-developer";
import { dataEngineerRubric } from "./data-engineer";
import { devopsEngineerRubric } from "./devops-engineer";
import { qaEngineerRubric } from "./qa-engineer";
import { uiUxDesignerRubric } from "./ui-ux-designer";
import { hrRecruiterRubric } from "./hr-recruiter";
import { salesExecutiveRubric } from "./sales-executive";
import { marketingManagerRubric } from "./marketing-manager";
import { customerSuccessRubric } from "./customer-success-manager";
import { businessAnalystRubric } from "./business-analyst";
import { dataScientistRubric } from "./data-scientist";

export const BUILT_IN_RUBRICS: Record<BuiltInRubricId, Rubric> = {
  "engineering-manager": engineeringManagerRubric,
  "frontend-developer": frontendDeveloperRubric,
  "backend-developer": backendDeveloperRubric,
  "fullstack-developer": fullstackDeveloperRubric,
  "product-manager": productManagerRubric,
  "data-engineer": dataEngineerRubric,
  "devops-engineer": devopsEngineerRubric,
  "qa-engineer": qaEngineerRubric,
  "ui-ux-designer": uiUxDesignerRubric,
  "hr-recruiter": hrRecruiterRubric,
  "sales-executive": salesExecutiveRubric,
  "marketing-manager": marketingManagerRubric,
  "customer-success-manager": customerSuccessRubric,
  "business-analyst": businessAnalystRubric,
  "data-scientist": dataScientistRubric,
};

export function listRubrics(): BuiltInRubricId[] {
  return Object.keys(BUILT_IN_RUBRICS) as BuiltInRubricId[];
}

export function getBuiltInRubric(id: BuiltInRubricId): Rubric {
  const rubric = BUILT_IN_RUBRICS[id];
  if (!rubric) {
    const available = listRubrics().join(", ");
    throw new Error(
      `[recruitkit] Unknown rubric "${id}". Available: ${available}`
    );
  }
  return JSON.parse(JSON.stringify(rubric));
}
