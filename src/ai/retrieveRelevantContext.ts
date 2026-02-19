import type { AdmissionsRAGContext, FacultyContext } from "./types";

const normalize = (value: string): string =>
  value.toLowerCase().trim().replace(/\s+/g, " ");

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const questionIncludesTerm = (question: string, term: string): boolean => {
  const normalizedQuestion = normalize(question);
  const normalizedTerm = normalize(term);
  if (!normalizedTerm) return false;

  // Short terms (e.g., "Law") use word boundaries to avoid false positives.
  if (normalizedTerm.length <= 3) {
    const regex = new RegExp(`\\b${escapeRegex(normalizedTerm)}\\b`, "i");
    return regex.test(normalizedQuestion);
  }

  return normalizedQuestion.includes(normalizedTerm);
};

const matchesFaculty = (question: string, faculty: FacultyContext): boolean => {
  const candidates = [faculty.name, ...faculty.aliases];
  return candidates.some((candidate) => questionIncludesTerm(question, candidate));
};

export function retrieveRelevantContext(
  question: string,
  context: AdmissionsRAGContext
): AdmissionsRAGContext {
  const matchedFaculties = context.faculties.filter((faculty) =>
    matchesFaculty(question, faculty)
  );

  if (matchedFaculties.length === 0) {
    return {
      faculties: [...context.faculties],
      scholarships: [...context.scholarships],
      requirements: [...context.requirements],
      contacts: [...context.contacts],
    };
  }

  const matchedFacultyNames = new Set(
    matchedFaculties.flatMap((faculty) =>
      [faculty.name, ...faculty.aliases].map((value) => normalize(value))
    )
  );

  const scholarships = context.scholarships.filter((scholarship) =>
    matchedFacultyNames.has(normalize(scholarship.facultyName))
  );

  const requirements = context.requirements.filter((requirement) =>
    requirement.faculties.some((facultyName) =>
      matchedFacultyNames.has(normalize(facultyName))
    )
  );

  return {
    faculties: matchedFaculties,
    scholarships,
    requirements,
    contacts: [],
  };
}
