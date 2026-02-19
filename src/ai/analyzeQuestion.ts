import type { AdmissionsIntent, FacultyContext } from "./types";

const normalize = (value: string): string =>
  value.toLowerCase().trim().replace(/\s+/g, " ");

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const containsTerm = (question: string, term: string): boolean => {
  const normalizedQuestion = normalize(question);
  const normalizedTerm = normalize(term);
  if (!normalizedTerm) return false;

  if (normalizedTerm.length <= 3) {
    return new RegExp(`(?<!\\w)${escapeRegex(normalizedTerm)}(?!\\w)`, "i").test(
      normalizedQuestion
    );
  }

  return normalizedQuestion.includes(normalizedTerm);
};

const intentKeywordMap: Record<Exclude<AdmissionsIntent, "general">, string[]> = {
  fees: ["fee", "fees", "tuition", "cost", "payment", "payable"],
  scholarships: ["scholarship", "category a", "category b", "a*", "discount", "tier"],
  requirements: [
    "requirement",
    "requirements",
    "eligible",
    "eligibility",
    "admission",
    "minimum",
    "score",
    "apply",
  ],
  contacts: ["contact", "email", "extension", "phone", "external number"],
};

export interface QuestionAnalysis {
  intents: AdmissionsIntent[];
  matchedFaculties: string[];
}

export function analyzeQuestion(
  question: string,
  faculties: FacultyContext[]
): QuestionAnalysis {
  const detectedIntents = (
    Object.entries(intentKeywordMap) as Array<
      [Exclude<AdmissionsIntent, "general">, string[]]
    >
  )
    .filter(([, keywords]) => keywords.some((keyword) => containsTerm(question, keyword)))
    .map(([intent]) => intent);

  const intents: AdmissionsIntent[] =
    detectedIntents.length > 0 ? detectedIntents : ["general"];

  const matchedFaculties = faculties
    .filter((faculty) =>
      [faculty.name, ...faculty.aliases].some((candidate) =>
        containsTerm(question, candidate)
      )
    )
    .map((faculty) => faculty.name)
    .sort((a, b) => a.localeCompare(b));

  return { intents, matchedFaculties };
}
