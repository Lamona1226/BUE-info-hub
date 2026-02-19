const normalizeText = (value: string): string => value.toLowerCase().trim().replace(/\s+/g, " ");

export const EXCEL_SOURCE_DEPARTMENT_KEY = "Sheet1";

export const contactsDepartmentDisplayMap: Record<string, string> = {
  [EXCEL_SOURCE_DEPARTMENT_KEY]: "General Directory",
};

export const getContactsDepartmentDisplayName = (departmentName: string): string =>
  contactsDepartmentDisplayMap[departmentName] ?? departmentName;

export const contactsTitleDepartmentMap: Record<string, string> = {
  "student recruitment": "Recruitment",
  "international recruitment officer": "Recruitment",
  "admission & student affairs": "Student Affairs",
  "admissions coordinator": "Student Affairs",
  "student affairs": "Student Affairs",
  "student services": "Student Affairs",
  "finance": "Finance",
  "business operation": "Finance",
  "hr": "Human Resources",
  "human resources": "Human Resources",
  "it": "IT Department",
  "head it": "IT Department",
  "legal affairs": "Legal Affairs",
  "security": "Security",
  "transportation": "Transportation",
  "marketing communication": "Marketing & Public Relations",
  "alumni office": "Marketing & Public Relations",
  "library": "Library",
  "warehouse": "Warehouse Management",
  "supply chain": "Purchases",
  "medical affairs": "Medical Clinic",
  "student activities": "Student Activities",
  "campus services": "Campus Management",
  "estates and facilities": "Campus Management",
  "maintenance": "Campus Management",
  "dormitory": "Dormitories",
  "office of the president": "Academic Affairs",
  "office of the provost": "Academic Affairs",
  "president advisor office": "Academic Affairs",
  "vice president for research and enterprise": "Vice President's Office",
  "coo": "Vice President's Office",
  "president": "Reception & President's Office",
  "strategy development": "Campus Management",
  "engineering": "Engineering Department",
  "engineering (puc)": "Engineering Department",
  "energy": "Engineering Department",
  "nursing": "Faculty of Computer Nursing",
  "external nursing": "Faculty of Computer Nursing",
  "ics": "Faculty of Computer Science",
  "arts & design": "Faculty of Art & Design",
  "arts & humanities": "Faculty of Art & Design",
  "physiotherapy": "Faculty of Physiotherapy",
  "law": "Faculty of Law",
  "dentistry": "Faculty of Dentistry",
  "pharmacy": "Faculty of Pharmacy",
};

const titleKeywordRules: Array<{ keyword: RegExp; department: string }> = [
  { keyword: /recruit|alumn/i, department: "Recruitment" },
  { keyword: /admission|student affairs|student services/i, department: "Student Affairs" },
  { keyword: /finance|business operation/i, department: "Finance" },
  { keyword: /\bhr\b|human resources|people/i, department: "Human Resources" },
  { keyword: /\bit\b|e-?learning/i, department: "IT Department" },
  { keyword: /legal/i, department: "Legal Affairs" },
  { keyword: /security/i, department: "Security" },
  { keyword: /transport/i, department: "Transportation" },
  { keyword: /marketing|public relations/i, department: "Marketing & Public Relations" },
  { keyword: /library/i, department: "Library" },
  { keyword: /warehouse/i, department: "Warehouse Management" },
  { keyword: /supply chain|purchas/i, department: "Purchases" },
  { keyword: /medical|clinic/i, department: "Medical Clinic" },
  { keyword: /campus|estates|facilit|maintenance/i, department: "Campus Management" },
  { keyword: /dormitory/i, department: "Dormitories" },
  { keyword: /provost|president advisor|office of the president|academic services|cemes/i, department: "Academic Affairs" },
  { keyword: /vice president|coo|dvc office/i, department: "Vice President's Office" },
  { keyword: /engineering|energy/i, department: "Engineering Department" },
  { keyword: /nursing/i, department: "Faculty of Computer Nursing" },
  { keyword: /\bics\b|computer science/i, department: "Faculty of Computer Science" },
  { keyword: /arts|design|humanities/i, department: "Faculty of Art & Design" },
  { keyword: /physiotherapy/i, department: "Faculty of Physiotherapy" },
  { keyword: /\blaw\b/i, department: "Faculty of Law" },
  { keyword: /dentistry/i, department: "Faculty of Dentistry" },
  { keyword: /pharmacy/i, department: "Faculty of Pharmacy" },
];

export const inferDepartmentFromTitle = (title?: string, name?: string): string | undefined => {
  const normalizedTitle = normalizeText(title ?? "");
  const exactMatch = contactsTitleDepartmentMap[normalizedTitle];
  if (exactMatch) {
    return exactMatch;
  }

  const context = `${title ?? ""} ${name ?? ""}`;
  for (const rule of titleKeywordRules) {
    if (rule.keyword.test(context)) {
      return rule.department;
    }
  }

  return undefined;
};
