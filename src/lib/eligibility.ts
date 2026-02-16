import {
  EgyptianTuitionFee,
  InternationalTuitionFee,
  ScholarshipThreshold,
  scholarshipThresholds,
} from '@/data/fees';

export type ScholarshipTier = 'C' | 'B' | 'A' | 'AStar';
export type CertificateThresholdKey = 'igcse' | 'american' | 'arab' | 'thanwya';

const FACULTY_ALIASES: Record<string, string[]> = {
  dentistry: ['dentistry', 'bachelor of dental surgery'],
  pharmacy: ['pharmacy', 'clinical pharmacy', 'pharm d', 'pharm-d'],
  physiotherapy: ['physiotherapy'],
  engineering: ['engineering'],
  energy: ['energy & environmental engineering', 'energy engineering'],
  ics: ['informatics & computer science', 'ics', 'computer science'],
  artDesign: ['art & design', 'arts & design'],
  social: [
    'business administration',
    'economics',
    'political science',
    'communication & mass media',
    'mass media',
    'psychology',
    'law',
  ],
  english: ['english language and literature'],
  chineseNursing: ['chinese language & culture', 'nursing'],
};

const CERTIFICATE_KEYWORDS: Array<{ key: CertificateThresholdKey; patterns: string[] }> = [
  {
    key: 'american',
    patterns: ['american', 'us diploma', 'act', 'sat', 'est'],
  },
  {
    key: 'thanwya',
    patterns: ['thanaweya', 'thanwya', 'thanawya', 'egyptian secondary', 'azhar', 'stem', 'technical'],
  },
  {
    key: 'arab',
    patterns: ['arab', 'kuwait', 'qatari', 'iraqi', 'saudi', 'emirati', 'uae'],
  },
  {
    key: 'igcse',
    patterns: ['igcse', 'gcse', 'ib', 'baccalaureate', 'abitur', 'canadian', 'international', 'nile'],
  },
];

const normalizeText = (value: string) => value.toLowerCase().trim().replace(/\s+/g, ' ');

const toPercentNumber = (value: string): number | null => {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
};

const matchesAlias = (faculty: string, aliases: string[]) => {
  const normalizedFaculty = normalizeText(faculty);
  return aliases.some((alias) => {
    const normalizedAlias = normalizeText(alias);
    return normalizedFaculty.includes(normalizedAlias) || normalizedAlias.includes(normalizedFaculty);
  });
};

export const normalizeCertificateType = (input: string): CertificateThresholdKey => {
  const normalized = normalizeText(input);

  for (const { key, patterns } of CERTIFICATE_KEYWORDS) {
    if (patterns.some((pattern) => normalized.includes(pattern))) {
      return key;
    }
  }

  return 'igcse';
};

export const getScholarshipThresholdForFaculty = (
  faculty: string,
  thresholds: ScholarshipThreshold[] = scholarshipThresholds
): ScholarshipThreshold | undefined => {
  const normalizedFaculty = normalizeText(faculty);

  const aliasGroups = Object.values(FACULTY_ALIASES).find((aliases) => matchesAlias(normalizedFaculty, aliases));

  return thresholds.find((threshold) => {
    if (aliasGroups) {
      return threshold.faculties.some((listed) => matchesAlias(listed, aliasGroups));
    }

    return threshold.faculties.some((listed) => matchesAlias(listed, [normalizedFaculty]));
  });
};

export const resolveScholarshipTier = (
  score: number,
  certificateThresholds: { B: string; A: string; AStar: string }
): ScholarshipTier => {
  const thresholdB = toPercentNumber(certificateThresholds.B);
  const thresholdA = toPercentNumber(certificateThresholds.A);
  const thresholdAStar = toPercentNumber(certificateThresholds.AStar);

  if (thresholdAStar !== null && score >= thresholdAStar) return 'AStar';
  if (thresholdA !== null && score >= thresholdA) return 'A';
  if (thresholdB !== null && score >= thresholdB) return 'B';

  return 'C';
};

export const resolveDiscountByTier = (threshold: ScholarshipThreshold, tier: ScholarshipTier): string => {
  if (tier === 'AStar') return threshold.discountAStar;
  if (tier === 'A') return threshold.discountA;
  if (tier === 'B') return threshold.discountB;
  return '0%';
};

export const resolveFeeByTier = (
  fee: EgyptianTuitionFee | InternationalTuitionFee,
  tier: ScholarshipTier
): number => {
  if (tier === 'AStar') return fee.categoryAStar;
  if (tier === 'A') return fee.categoryA;
  if (tier === 'B') return fee.categoryB;
  return fee.categoryC;
};

export interface EligibilityResult {
  faculty: string;
  program?: string;
  category: ScholarshipTier;
  discount: string;
  discountedFee: number;
}

export const calculateEligibilityForFees = (
  fees: Array<EgyptianTuitionFee | InternationalTuitionFee>,
  certificateType: string,
  score: number
): EligibilityResult[] => {
  const thresholdKey = normalizeCertificateType(certificateType);

  return fees
    .map((fee) => {
      const threshold = getScholarshipThresholdForFaculty(fee.faculty);
      if (!threshold) return null;

      const certificateThresholds = threshold.certificates[thresholdKey];
      const category = resolveScholarshipTier(score, certificateThresholds);

      return {
        faculty: fee.faculty,
        program: fee.program,
        category,
        discount: resolveDiscountByTier(threshold, category),
        discountedFee: resolveFeeByTier(fee, category),
      };
    })
    .filter((item): item is EligibilityResult => item !== null);
};

// Qualification normalization helpers (business rules from Quals-calculations.md)
const O_LEVEL_GRADE_MAP: Record<string, number> = {
  'a*': 100,
  a: 95,
  b: 85,
  c: 70,
  '9': 100,
  '8': 100,
  '7': 95,
  '6': 88,
  '5': 82,
  '4': 70,
};

export const normalizeIgcseGradeToPercentage = (grade: string): number | null => {
  const key = normalizeText(grade);
  return O_LEVEL_GRADE_MAP[key] ?? null;
};

export const calculateAmericanDiplomaPercentage = ({
  est1,
  est2,
  gpaPoints,
  subjectsCount,
}: {
  est1: number;
  est2?: number;
  gpaPoints: number;
  subjectsCount: 8 | 9;
}): number => {
  const est1Part = (est1 / 1600) * 60;
  const est2Part = ((est2 ?? 0) / 1600) * 15;
  const gpaPart = (gpaPoints * 40) / (subjectsCount * 100);
  return Number((est1Part + est2Part + gpaPart).toFixed(2));
};

export const calculateThanaweyaPercentage = ({
  totalScore,
  maxScore,
}: {
  totalScore: number;
  maxScore: 320 | 410;
}): number => {
  const divisor = maxScore === 320 ? 3.2 : 4.1;
  return Number((totalScore / divisor).toFixed(2));
};
