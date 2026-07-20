import {
  OfferChecklistItem,
  BGVRequirement,
  ProbationRules,
} from "../../types";

/**
 * Get a compliance checklist for making an employment offer in India.
 * Covers statutory, contractual, and recommended items.
 *
 * @example
 * ```ts
 * const checklist = offerChecklist();
 * const mandatory = checklist.filter(item => item.mandatory);
 * console.log(`${mandatory.length} mandatory items to include in the offer.`);
 * ```
 */
export function offerChecklist(): OfferChecklistItem[] {
  return [
    // Statutory
    {
      id: "stat-1",
      category: "statutory",
      item: "PF (Provident Fund) enrollment",
      description:
        "Employer must enroll the employee in EPF if the establishment has 20+ employees. Employee contributes 12% of basic + DA, employer matches. UAN to be generated within 7 days of joining.",
      legalReference: "Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
      mandatory: true,
    },
    {
      id: "stat-2",
      category: "statutory",
      item: "ESI coverage check",
      description:
        "If monthly wages are ≤₹21,000 and establishment has 10+ employees, employee must be enrolled in ESI. Employer contributes 3.25%, employee 0.75%. Check current ceiling — was ₹21,000 as of 2024.",
      legalReference: "Employees' State Insurance Act, 1948",
      mandatory: true,
    },
    {
      id: "stat-3",
      category: "statutory",
      item: "Professional Tax registration",
      description:
        "Telangana: employer must deduct Professional Tax (PT) from salary. Slab-based: ₹200/month for salary >₹20,000. Other states vary. Ensure correct state registration.",
      legalReference: "Telangana Tax on Professions, Trades, Callings and Employments Act, 1987",
      mandatory: true,
    },
    {
      id: "stat-4",
      category: "statutory",
      item: "Gratuity eligibility disclosure",
      description:
        "Employee is eligible for gratuity after 5 years of continuous service. Rate: 15 days' wages × years of service. Ceiling: ₹20 lakh (check for updates). Must mention this entitlement in the offer or appointment letter.",
      legalReference: "Payment of Gratuity Act, 1972",
      mandatory: true,
    },
    {
      id: "stat-5",
      category: "statutory",
      item: "Form 11 (PF declaration)",
      description:
        "New employee must fill Form 11 declaring previous PF membership, UAN, and existing PF balance for transfer. Collect on Day 1.",
      legalReference: "EPF Scheme, 1952 — Para 34",
      mandatory: true,
    },
    {
      id: "stat-6",
      category: "statutory",
      item: "Shops & Establishments Act compliance",
      description:
        "Telangana: employer must register under the Shops & Establishments Act. Working hours, leave policy, and notice period must comply. Max 9 hours/day, 48 hours/week. 15 days casual leave/year minimum.",
      legalReference: "Telangana Shops and Establishments Act, 1988",
      mandatory: true,
    },
    {
      id: "stat-7",
      category: "statutory",
      item: "Sexual Harassment policy (POSH)",
      description:
        "Company must have a POSH policy and an Internal Complaints Committee (ICC) if 10+ employees. New hires must be informed about the policy and ICC members during onboarding.",
      legalReference: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
      mandatory: true,
    },
    // Contractual
    {
      id: "con-1",
      category: "contractual",
      item: "CTC breakdown",
      description:
        "Full cost-to-company breakdown: basic salary, HRA, special allowance, PF (employer), medical insurance, any variable/bonus. Basic should ideally be 40-50% of CTC for PF/gratuity calculation purposes.",
      mandatory: true,
    },
    {
      id: "con-2",
      category: "contractual",
      item: "Notice period clause",
      description:
        "Clearly state notice period for both parties. Industry standard in India: 1 month during probation, 2-3 months post-confirmation. Include notice buyout terms if applicable.",
      mandatory: true,
    },
    {
      id: "con-3",
      category: "contractual",
      item: "Probation period and confirmation",
      description:
        "State probation duration (typically 3-6 months), extension policy, and confirmation criteria. Must be explicit about what happens at the end of probation.",
      mandatory: true,
    },
    {
      id: "con-4",
      category: "contractual",
      item: "Non-compete and IP assignment",
      description:
        "Non-compete clauses are generally unenforceable in India (Indian Contract Act, Section 27) but IP assignment and confidentiality clauses are standard and enforceable. Include both.",
      legalReference: "Indian Contract Act, 1872 — Section 27",
      mandatory: true,
    },
    {
      id: "con-5",
      category: "contractual",
      item: "Leave policy summary",
      description:
        "Include earned leave, casual leave, sick leave, maternity leave (26 weeks for first two children — Maternity Benefit Act), and paternity leave (if offered — no statutory mandate).",
      legalReference: "Maternity Benefit Act, 1961 (amended 2017)",
      mandatory: true,
    },
    {
      id: "con-6",
      category: "contractual",
      item: "ESOP/equity grant details",
      description:
        "If offering stock options: grant size, vesting schedule, cliff period, exercise price, exercise window, tax implications (perquisite tax at exercise, LTCG at sale). Must reference the ESOP scheme document.",
      mandatory: false,
    },
    // Recommended
    {
      id: "rec-1",
      category: "recommended",
      item: "Background verification consent",
      description:
        "Obtain written consent for BGV during offer stage. Specify which checks will be conducted (education, employment, criminal, address). Make offer contingent on successful BGV.",
      mandatory: false,
    },
    {
      id: "rec-2",
      category: "recommended",
      item: "Medical insurance details",
      description:
        "Group medical insurance coverage — sum insured, dependents covered (self, spouse, children, parents), pre-existing conditions waiting period, maternity coverage. Growing expectation in Indian tech.",
      mandatory: false,
    },
    {
      id: "rec-3",
      category: "recommended",
      item: "Relocation support",
      description:
        "If candidate is relocating: relocation allowance, temporary accommodation, joining bonus to offset moving costs. Document the terms clearly.",
      mandatory: false,
    },
    {
      id: "rec-4",
      category: "recommended",
      item: "Learning & development budget",
      description:
        "Annual L&D budget, conference attendance policy, certification reimbursement. Increasingly important for tech talent retention in India.",
      mandatory: false,
    },
  ];
}

/**
 * Get background verification requirements by role type.
 *
 * @example
 * ```ts
 * const bgv = bgvRequirements('engineering');
 * const mandatory = bgv.filter(r => r.mandatory);
 * ```
 */
export function bgvRequirements(
  roleType?: string
): BGVRequirement[] {
  const base: BGVRequirement[] = [
    {
      checkType: "Identity verification",
      description: "Aadhaar, PAN card, and passport verification. Cross-reference name and DOB.",
      applicableTo: ["all"],
      estimatedDays: 2,
      mandatory: true,
    },
    {
      checkType: "Education verification",
      description: "Verify highest degree directly with the university/institution. Check UGC recognition for the institution.",
      applicableTo: ["all"],
      estimatedDays: 7,
      mandatory: true,
    },
    {
      checkType: "Previous employment verification",
      description: "Verify last 2-3 employers: dates of employment, designation, reason for leaving. Contact HR directly — don't rely on offer/relieving letters alone.",
      applicableTo: ["all"],
      estimatedDays: 10,
      mandatory: true,
    },
    {
      checkType: "Criminal record check",
      description: "Court record search in current and permanent address jurisdictions. Covers civil and criminal cases. Note: India has no centralized criminal database.",
      applicableTo: ["all"],
      estimatedDays: 14,
      mandatory: true,
    },
    {
      checkType: "Address verification",
      description: "Physical verification of current and permanent address via field agent.",
      applicableTo: ["all"],
      estimatedDays: 7,
      mandatory: true,
    },
    {
      checkType: "Professional reference check",
      description: "Speak with 2-3 references (ideally managers, not peers). Structured questions about performance, collaboration, and reasons for departure.",
      applicableTo: ["all"],
      estimatedDays: 5,
      mandatory: false,
    },
    {
      checkType: "Credit check",
      description: "CIBIL score and credit history. Required for roles handling finances or sensitive data. Obtain written consent.",
      applicableTo: ["finance", "leadership", "procurement"],
      estimatedDays: 3,
      mandatory: false,
    },
    {
      checkType: "Drug screening",
      description: "Pre-employment drug test. Standard for manufacturing, logistics, and safety-sensitive roles. Less common in tech but increasingly required by US-headquartered companies.",
      applicableTo: ["manufacturing", "logistics", "safety-critical"],
      estimatedDays: 3,
      mandatory: false,
    },
    {
      checkType: "Global sanctions & PEP check",
      description: "Screen against OFAC, UN, EU sanctions lists and Politically Exposed Persons databases. Required for fintech, banking, and regulated industries.",
      applicableTo: ["finance", "fintech", "banking", "regulated"],
      estimatedDays: 2,
      mandatory: false,
    },
  ];

  // Filter by role type if provided
  if (roleType) {
    return base.filter(
      (b) =>
        b.applicableTo.includes("all") ||
        b.applicableTo.includes(roleType.toLowerCase())
    );
  }

  return base;
}

/**
 * Get probation and confirmation rules for Indian employment.
 */
export function probationRules(): ProbationRules {
  return {
    defaultPeriodMonths: 6,
    maxExtensionMonths: 3,
    noticePeriodDuringProbation: "1 month (industry standard; 15 days minimum)",
    noticePeriodAfterConfirmation: "2-3 months (as per appointment letter)",
    confirmationProcess: [
      "Manager submits confirmation recommendation with performance summary",
      "HR reviews attendance, conduct, and probation-period deliverables",
      "Confirmation letter issued with revised terms (if any)",
      "If not confirmed: extend probation (with documented reason) or terminate with notice",
      "Employee must be informed in writing before probation end date",
    ],
    legalNotes: [
      "Indian courts have held that probation cannot be extended indefinitely — typically 1 extension max.",
      "During probation, the employment relationship is still governed by the appointment letter — you cannot terminate without notice unless the letter explicitly allows it.",
      "If an employee works beyond the probation period without written extension or termination, they are deemed confirmed by conduct (deemed confirmation).",
      "Gratuity clock starts from date of joining, not date of confirmation.",
      "PF, ESI, and other statutory benefits are mandatory from Day 1, regardless of probation status.",
    ],
  };
}
