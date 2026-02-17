import type { ScholarshipTier } from "./scholarshipTierMapping";
import {
  resolveDiscountForTier,
  resolveMinimumAdmissionThreshold,
  resolveScholarshipThreshold,
  resolveTierForScore,
  type MinimumAdmissionCertificateGroup,
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
  status: "eligible" | "not_eligible";
  category?: ScholarshipTier;
  discount?: string;
  discountedFee?: number;
  minimumRequiredScore: number;
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
      const certificateGroup: MinimumAdmissionCertificateGroup =
        certificateType === "thanaweya"
          ? "egyptianCertificates"
          : "internationalCertificates";

      const minimumRequiredScore =
        resolveMinimumAdmissionThreshold(fee.faculty, certificateGroup) ?? 0;

      if (score < minimumRequiredScore) {
        return {
          faculty: fee.faculty,
          program: fee.program,
          status: "not_eligible",
          minimumRequiredScore,
        };
      }

      const threshold = resolveScholarshipThreshold(fee.faculty);
      if (!threshold) return null;

      const category = resolveTierForScore(score, threshold, certificateType);
      const discount = resolveDiscountForTier(threshold, category);
      const discountedFee = resolveDiscountedFeeByTier(fee, category);

      return {
        faculty: fee.faculty,
        program: fee.program,
        status: "eligible",
        category,
        discount,
        discountedFee,
        minimumRequiredScore,
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
    allResults.some((item) => item.status === "eligible") &&
    allResults
      .filter((item) => item.status === "eligible")
      .every((item) => item.category === "C");

  return {
    egyptian,
    international,
    allBelowThreshold,
  };
};
