export const roundTo = (value: number, decimals = 2): number => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const percentageFromPart = (achieved: number, total: number): number => {
  if (total <= 0) return 0;
  return (achieved / total) * 100;
};

export interface AmericanQualificationInput {
  est1: number;
  est2?: number;
  gpaTotal: number;
  gpaSubjectCount: 8 | 9;
}

// Formula from Quals-calculations.md:
// EST1 contributes 60%, EST2 contributes 15%, GPA contributes 40%.
export const calculateAmericanQualificationScore = ({
  est1,
  est2 = 0,
  gpaTotal,
  gpaSubjectCount,
}: AmericanQualificationInput): number => {
  const est1Contribution = (est1 / 1600) * 60;
  const est2Contribution = (est2 / 1600) * 15;
  const gpaContribution = (gpaTotal * 40) / (gpaSubjectCount * 100);
  return roundTo(est1Contribution + est2Contribution + gpaContribution, 2);
};

const igcseLetterScale: Record<string, number> = {
  "A*": 100,
  A: 95,
  B: 85,
  C: 70,
  D: 60,
};

const igcseNumericScale: Record<string, number> = {
  "9": 100,
  "8": 100,
  "7": 95,
  "6": 88,
  "5": 82,
  "4": 70,
};

export const convertIgcseGradeToPercent = (grade: string): number => {
  const normalized = grade.trim().toUpperCase();
  if (normalized in igcseLetterScale) {
    return igcseLetterScale[normalized];
  }
  if (normalized in igcseNumericScale) {
    return igcseNumericScale[normalized];
  }
  return 0;
};

export const calculateIgcseAveragePercent = (grades: string[]): number => {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((total, grade) => total + convertIgcseGradeToPercent(grade), 0);
  return roundTo(sum / grades.length, 2);
};

export const calculateThanaweyaPercent = (
  achievedScore: number,
  maxScore: 320 | 410
): number => roundTo(percentageFromPart(achievedScore, maxScore), 2);

export type FinderCertificateType = "igcse" | "american" | "thanaweya" | "other";

// Normalizes the free-form numeric finder input into comparable score units.
export const normalizeFinderScoreInput = (
  certificateType: FinderCertificateType,
  rawScore: number
): number => {
  if (!Number.isFinite(rawScore)) return 0;

  if (certificateType === "thanaweya") {
    // Support raw total scores as entered on certificates (320 / 410 systems).
    if (rawScore > 100 && rawScore <= 320) {
      return calculateThanaweyaPercent(rawScore, 320);
    }
    if (rawScore > 320) {
      return calculateThanaweyaPercent(rawScore, 410);
    }
    return roundTo(clamp(rawScore, 0, 100), 2);
  }

  if (certificateType === "igcse" || certificateType === "other") {
    return roundTo(clamp(rawScore, 0, 100), 2);
  }

  // American thresholds in this dataset can exceed 100.
  return roundTo(clamp(rawScore, 0, 200), 2);
};
