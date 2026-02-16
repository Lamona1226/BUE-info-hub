import type { ScholarshipTier } from "./scholarshipTierMapping";
import {
  resolveDiscountForTier,
  resolveScholarshipThreshold,
  resolveTierForScore,
} from "./scholarshipTierMapping";
import {
  normalizeFinderScoreInput,
  type FinderCertificateType,
} from "./sharedCalculations";
import {
  getTuitionRowsByStudentType,
  resolveDiscountedFeeByTier,
  type FinderStudentType,
} from "./facultyFeeResolver";

export interface EligibilityResultRow {
  faculty: string;
  program?: string;
  category: ScholarshipTier;
  discount: string;
  discountedFee: number;
}

export interface EligibilityEngineResult {
  egyptian: EligibilityResultRow[];
  international: EligibilityResultRow[];
  allBelowThreshold: boolean;
}

const calculateEligibilityForStudentType = (
  studentType: FinderStudentType,
  certificateType: FinderCertificateType,
  score: number
): EligibilityResultRow[] =>
  getTuitionRowsByStudentType(studentType)
    .map((fee) => {
      const threshold = resolveScholarshipThreshold(fee.faculty);
      if (!threshold) return null;

      const category = resolveTierForScore(score, threshold, certificateType);
      const discount = resolveDiscountForTier(threshold, category);
      const discountedFee = resolveDiscountedFeeByTier(fee, category);

      return {
        faculty: fee.faculty,
        program: fee.program,
        category,
        discount,
        discountedFee,
      };
    })
    .filter((row): row is EligibilityResultRow => Boolean(row));

export const calculateFinderEligibility = (
  certificateType: FinderCertificateType,
  score: number
): EligibilityEngineResult => {
  const normalizedScore = normalizeFinderScoreInput(certificateType, score);
  const egyptian = calculateEligibilityForStudentType("egyptian", certificateType, normalizedScore);
  const international = calculateEligibilityForStudentType("international", certificateType, normalizedScore);
  const allResults = [...egyptian, ...international];

  const allBelowThreshold =
    allResults.length > 0 &&
    allResults.every((item) => item.category === "C");

  return {
    egyptian,
    international,
    allBelowThreshold,
  };
};
