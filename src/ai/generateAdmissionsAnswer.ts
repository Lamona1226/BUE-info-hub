import type { AdmissionsRAGContext, FacultyContext, RequirementContext } from "./types";

const UNAVAILABLE_MESSAGE =
  "This information is not available in the official admissions data.";

const normalize = (value: string): string => value.toLowerCase().trim();

const questionHasAny = (question: string, terms: string[]): boolean => {
  const normalizedQuestion = normalize(question);
  return terms.some((term) => normalizedQuestion.includes(term));
};

const includesFaculty = (faculty: FacultyContext, requirement: RequirementContext): boolean => {
  const names = [faculty.name, ...faculty.aliases].map(normalize);
  return requirement.faculties.some((item) => names.includes(normalize(item)));
};

const formatFacultyFees = (faculty: FacultyContext): string[] => [
  `${faculty.name}: Category C total is EGP ${faculty.fees.categoryC.toLocaleString()} (Tuition EGP ${faculty.fees.tuition.toLocaleString()}, Educational Support EGP ${faculty.fees.educationalSupportServices.toLocaleString()}, Administrative EGP ${faculty.fees.administrativeFees.toLocaleString()}).`,
  `${faculty.name} scholarship-tier fees: C EGP ${faculty.fees.feeByTier.C.toLocaleString()}, B EGP ${faculty.fees.feeByTier.B.toLocaleString()}, A EGP ${faculty.fees.feeByTier.A.toLocaleString()}, A* EGP ${faculty.fees.feeByTier.AStar.toLocaleString()}.`,
];

const formatFacultyAdmission = (faculty: FacultyContext): string =>
  `${faculty.name}: minimum admission score is ${faculty.minimumAdmission.egyptianCertificates}% (Egyptian certificates) and ${faculty.minimumAdmission.internationalCertificates}% (International certificates).`;

const formatScholarshipLine = (
  facultyName: string,
  certificate: "igcse" | "american" | "arab" | "thanaweya",
  thresholds: { B: number; A: number; AStar: number }
): string =>
  `${facultyName} ${certificate.toUpperCase()} scholarship thresholds: B >= ${thresholds.B}, A >= ${thresholds.A}, A* >= ${thresholds.AStar}.`;

export function generateAdmissionsAnswer(
  question: string,
  context: AdmissionsRAGContext
): string {
  const feeIntent = questionHasAny(question, ["fee", "fees", "tuition", "cost", "pay"]);
  const scholarshipIntent = questionHasAny(question, [
    "scholarship",
    "category a",
    "category b",
    "a*",
    "discount",
    "tier",
  ]);
  const requirementIntent = questionHasAny(question, [
    "requirement",
    "requirements",
    "eligible",
    "eligibility",
    "admission",
    "minimum",
    "score",
    "apply",
  ]);
  const contactIntent = questionHasAny(question, [
    "contact",
    "email",
    "extension",
    "phone",
    "external number",
  ]);

  const lines: string[] = [];
  const faculties = [...context.faculties].sort((a, b) => a.name.localeCompare(b.name));

  if (faculties.length > 0) {
    lines.push("Based on the official admissions data:");
  }

  if (feeIntent) {
    if (faculties.length === 0) {
      return UNAVAILABLE_MESSAGE;
    }
    faculties.forEach((faculty) => {
      lines.push(...formatFacultyFees(faculty));
    });
  }

  if (scholarshipIntent) {
    if (faculties.length === 0 || context.scholarships.length === 0) {
      return UNAVAILABLE_MESSAGE;
    }
    const scholarships = [...context.scholarships].sort((a, b) =>
      a.facultyName.localeCompare(b.facultyName)
    );
    scholarships.forEach((scholarship) => {
      lines.push(
        formatScholarshipLine(scholarship.facultyName, "igcse", scholarship.thresholds.igcse),
        formatScholarshipLine(
          scholarship.facultyName,
          "american",
          scholarship.thresholds.american
        ),
        formatScholarshipLine(scholarship.facultyName, "arab", scholarship.thresholds.arab),
        formatScholarshipLine(
          scholarship.facultyName,
          "thanaweya",
          scholarship.thresholds.thanaweya
        )
      );
    });
  }

  if (requirementIntent) {
    if (faculties.length === 0) {
      return UNAVAILABLE_MESSAGE;
    }
    faculties.forEach((faculty) => {
      lines.push(formatFacultyAdmission(faculty));
      const requirementRows = context.requirements
        .filter((row) => includesFaculty(faculty, row))
        .sort((a, b) => a.curriculum.localeCompare(b.curriculum));

      if (requirementRows.length > 0) {
        const selectedRows = requirementRows.slice(0, 3);
        selectedRows.forEach((row) => {
          lines.push(
            `${faculty.name} - ${row.curriculum} (${row.studentType}): ${row.requirements.join(
              "; "
            )}.`
          );
        });
      }
    });
  }

  if (contactIntent) {
    if (context.contacts.length === 0) {
      return UNAVAILABLE_MESSAGE;
    }
    const topContacts = [...context.contacts]
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 5);
    topContacts.forEach((contact) => {
      const email = Array.isArray(contact.email)
        ? contact.email.join(", ")
        : contact.email ?? "N/A";
      lines.push(
        `${contact.name} (${contact.department}) - Extension: ${
          contact.extension || "N/A"
        }, Email: ${email}, External Number: ${contact.externalNumber ?? "N/A"}.`
      );
    });
  }

  // If no explicit intent but faculty is matched, return concise official overview.
  if (!feeIntent && !scholarshipIntent && !requirementIntent && !contactIntent) {
    if (faculties.length === 0) {
      return UNAVAILABLE_MESSAGE;
    }
    faculties.forEach((faculty) => {
      lines.push(formatFacultyAdmission(faculty));
      lines.push(
        `${faculty.name}: Category C total fee is EGP ${faculty.fees.categoryC.toLocaleString()}.`
      );
    });
  }

  if (lines.length === 0) {
    return UNAVAILABLE_MESSAGE;
  }

  return lines.join("\n");
}
