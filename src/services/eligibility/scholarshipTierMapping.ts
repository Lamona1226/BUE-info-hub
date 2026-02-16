import { scholarshipThresholds, type ScholarshipThreshold } from "@/data/fees";
import { roundTo, type FinderCertificateType } from "./sharedCalculations";

export type ScholarshipTier = "C" | "B" | "A" | "AStar";

const normalize = (value: string): string => value.toLowerCase().trim();

const certificateKeyByType: Record<
  FinderCertificateType,
  keyof ScholarshipThreshold["certificates"]
> = {
  igcse: "igcse",
  american: "american",
  thanaweya: "thanwya",
  // Existing finder UX defines "other" to use IGCSE-equivalent thresholds.
  other: "igcse",
};

export const isFinderCertificateType = (value: string): value is FinderCertificateType =>
  value === "igcse" || value === "american" || value === "thanaweya" || value === "other";

const parsePercentValue = (value: string): number => {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
};

const thresholdIndex = scholarshipThresholds.flatMap((threshold) =>
  threshold.faculties.map((faculty) => ({
    key: normalize(faculty),
    threshold,
  }))
);

const exactThresholdMap = new Map<string, ScholarshipThreshold>();
thresholdIndex.forEach(({ key, threshold }) => {
  if (!exactThresholdMap.has(key)) {
    exactThresholdMap.set(key, threshold);
  }
});

export const resolveScholarshipThreshold = (
  faculty: string
): ScholarshipThreshold | undefined => {
  const normalizedFaculty = normalize(faculty);
  const exact = exactThresholdMap.get(normalizedFaculty);
  if (exact) return exact;

  for (const entry of thresholdIndex) {
    if (
      entry.key.includes(normalizedFaculty) ||
      normalizedFaculty.includes(entry.key)
    ) {
      return entry.threshold;
    }
  }
  return undefined;
};

export const resolveTierForScore = (
  score: number,
  threshold: ScholarshipThreshold,
  certificateType: FinderCertificateType
): ScholarshipTier => {
  const certificateKey = certificateKeyByType[certificateType];
  const certificateThresholds = threshold.certificates[certificateKey];
  const scoreB = roundTo(parsePercentValue(certificateThresholds.B), 2);
  const scoreA = roundTo(parsePercentValue(certificateThresholds.A), 2);
  const scoreAStar = roundTo(parsePercentValue(certificateThresholds.AStar), 2);
  const normalizedScore = roundTo(score, 2);
  const epsilon = 1e-9;

  if (normalizedScore + epsilon >= scoreAStar) return "AStar";
  if (normalizedScore + epsilon >= scoreA) return "A";
  if (normalizedScore + epsilon >= scoreB) return "B";
  return "C";
};

export const resolveDiscountForTier = (
  threshold: ScholarshipThreshold,
  tier: ScholarshipTier
): string => {
  if (tier === "AStar") return threshold.discountAStar;
  if (tier === "A") return threshold.discountA;
  if (tier === "B") return threshold.discountB;
  return "0%";
};
