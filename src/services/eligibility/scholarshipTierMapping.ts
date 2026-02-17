import {
  resolveFacultyConfig2026,
  type ScholarshipCertificateType2026,
} from "@/data/fees-2026";
import { roundTo, type FinderCertificateType } from "./sharedCalculations";

export type ScholarshipTier = "C" | "B" | "A" | "AStar";
export type MinimumAdmissionCertificateGroup =
  | "egyptianCertificates"
  | "internationalCertificates";

const certificateKeyByType: Record<FinderCertificateType, ScholarshipCertificateType2026> = {
  igcse: "igcse",
  american: "american",
  thanaweya: "thanaweya",
  // Existing finder UX defines "other" to use IGCSE-equivalent thresholds.
  other: "igcse",
};

export const isFinderCertificateType = (value: string): value is FinderCertificateType =>
  value === "igcse" || value === "american" || value === "thanaweya" || value === "other";

const parsePercentValue = (value: string): number => {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
};

export const resolveScholarshipThreshold = (
  faculty: string
): Record<ScholarshipCertificateType2026, { B: number; A: number; AStar: number }> | undefined =>
  resolveFacultyConfig2026(faculty)?.thresholds;

export const resolveMinimumAdmissionThreshold = (
  faculty: string,
  certificateGroup: MinimumAdmissionCertificateGroup
): number | undefined => resolveFacultyConfig2026(faculty)?.minimumAdmission[certificateGroup];

export const resolveTierForScore = (
  score: number,
  threshold: Record<ScholarshipCertificateType2026, { B: number; A: number; AStar: number }>,
  certificateType: FinderCertificateType
): ScholarshipTier => {
  const certificateKey = certificateKeyByType[certificateType];
  const certificateThresholds = threshold[certificateKey];
  const scoreB = roundTo(parsePercentValue(String(certificateThresholds.B)), 2);
  const scoreA = roundTo(parsePercentValue(String(certificateThresholds.A)), 2);
  const scoreAStar = roundTo(parsePercentValue(String(certificateThresholds.AStar)), 2);
  const normalizedScore = roundTo(score, 2);
  const epsilon = 1e-9;

  if (normalizedScore + epsilon >= scoreAStar) return "AStar";
  if (normalizedScore + epsilon >= scoreA) return "A";
  if (normalizedScore + epsilon >= scoreB) return "B";
  return "C";
};

export const resolveDiscountForTier = (
  _threshold: Record<ScholarshipCertificateType2026, { B: number; A: number; AStar: number }>,
  tier: ScholarshipTier
): string => {
  if (tier === "AStar") return "Category A*";
  if (tier === "A") return "Category A";
  if (tier === "B") return "Category B";
  return "0%";
};
