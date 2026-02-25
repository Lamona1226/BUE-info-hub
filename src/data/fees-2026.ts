export type ScholarshipCertificateType2026 =
  | "igcse"
  | "american"
  | "arab"
  | "thanaweya";

export interface ScholarshipThresholdBand2026 {
  B: number;
  A: number;
  AStar: number;
}

export interface FeeBreakdown2026 {
  tuitionFees: number;
  educationalSupportServices: number;
  administrativeFees: number;
  totalCategoryC: number;
}

export interface FacultyFeeConfig2026 {
  key: string;
  faculty: string;
  aliases: string[];
  feeBreakdown: FeeBreakdown2026;
  feeByTier: {
    C: number;
    B: number;
    A: number;
    AStar: number;
  };
  thresholds: Record<ScholarshipCertificateType2026, ScholarshipThresholdBand2026>;
  minimumAdmission: {
    egyptianCertificates: number;
    internationalCertificates: number;
  };
}

const defaultThresholdBand: ScholarshipThresholdBand2026 = {
  B: 80,
  A: 85,
  AStar: 90,
};

const defaultAmericanThresholdBand: ScholarshipThresholdBand2026 = {
  B: 80,
  A: 90,
  AStar: 100,
};

const defaultArabThresholdBand: ScholarshipThresholdBand2026 = {
  B: 80,
  A: 85,
  AStar: 90,
};

const defaultThanaweyaThresholdBand: ScholarshipThresholdBand2026 = {
  B: 65,
  A: 75,
  AStar: 85,
};

const highThresholdBand: ScholarshipThresholdBand2026 = {
  B: 90,
  A: 93,
  AStar: 97,
};

const highAmericanThresholdBand: ScholarshipThresholdBand2026 = {
  B: 90,
  A: 100,
  AStar: 110,
};

const highArabThresholdBand: ScholarshipThresholdBand2026 = {
  B: 90,
  A: 93,
  AStar: 97,
};

const highThanaweyaThresholdBand: ScholarshipThresholdBand2026 = {
  B: 77,
  A: 80,
  AStar: 85,
};

export const scholarshipDiscountByTier2026 = {
  dentistry: { B: "15%", A: "20%", AStar: "30%" },
  englishAndChinese: { B: "30%", A: "40%", AStar: "50%" },
  otherFaculties: { B: "20%", A: "30%", AStar: "40%" },
} as const;

export const facultyFeeConfig2026: FacultyFeeConfig2026[] = [
  {
    key: "dentistry",
    faculty: "Dentistry",
    aliases: ["Dentistry", "Dentistry (Bachelor of Dental Surgery)"],
    feeBreakdown: {
      tuitionFees: 295000,
      educationalSupportServices: 0,
      administrativeFees: 55000,
      totalCategoryC: 350000,
    },
    feeByTier: { C: 350000, B: 305750, A: 291000, AStar: 261500 },
    thresholds: {
      igcse: { B: 90, A: 93, AStar: 97 },
      american: { B: 90, A: 100, AStar: 110 },
      arab: { B: 90, A: 93, AStar: 97 },
      thanaweya: { B: 80, A: 83, AStar: 85 },
    },
    minimumAdmission: { egyptianCertificates: 77, internationalCertificates: 82 },
  },
  {
    key: "pharmacy-d",
    faculty: "Pharmacy (D)",
    aliases: ["Pharmacy (D)", "Pharmacy", "Pharm-D"],
    feeBreakdown: {
      tuitionFees: 185000,
      educationalSupportServices: 0,
      administrativeFees: 55000,
      totalCategoryC: 240000,
    },
    feeByTier: { C: 240000, B: 203000, A: 184500, AStar: 166000 },
    thresholds: {
      igcse: { B: 90, A: 93, AStar: 97 },
      american: { B: 90, A: 100, AStar: 110 },
      arab: { B: 90, A: 93, AStar: 97 },
      thanaweya: { B: 77, A: 80, AStar: 85 },
    },
    minimumAdmission: { egyptianCertificates: 71, internationalCertificates: 73 },
  },
  {
    key: "pharmacy-clinical",
    faculty: "Pharmacy (Clinical)",
    aliases: ["Pharmacy (Clinical)", "Clinical Pharmacy", "Pharm D - Clinical"],
    feeBreakdown: {
      tuitionFees: 195000,
      educationalSupportServices: 0,
      administrativeFees: 55000,
      totalCategoryC: 250000,
    },
    feeByTier: { C: 250000, B: 211000, A: 191500, AStar: 172000 },
    thresholds: {
      igcse: { B: 90, A: 93, AStar: 97 },
      american: { B: 90, A: 100, AStar: 110 },
      arab: { B: 90, A: 93, AStar: 97 },
      thanaweya: { B: 77, A: 80, AStar: 85 },
    },
    minimumAdmission: { egyptianCertificates: 71, internationalCertificates: 73 },
  },
  {
    key: "physiotherapy",
    faculty: "Physiotherapy",
    aliases: ["Physiotherapy"],
    feeBreakdown: {
      tuitionFees: 115000,
      educationalSupportServices: 90000,
      administrativeFees: 55000,
      totalCategoryC: 260000,
    },
    feeByTier: { C: 260000, B: 237000, A: 225500, AStar: 214000 },
    thresholds: {
      igcse: highThresholdBand,
      american: highAmericanThresholdBand,
      arab: highArabThresholdBand,
      thanaweya: highThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 75, internationalCertificates: 78 },
  },
  {
    key: "engineering",
    faculty: "Engineering",
    aliases: ["Engineering"],
    feeBreakdown: {
      tuitionFees: 195000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 330000,
    },
    feeByTier: { C: 330000, B: 291000, A: 271500, AStar: 252000 },
    thresholds: {
      igcse: highThresholdBand,
      american: highAmericanThresholdBand,
      arab: highArabThresholdBand,
      thanaweya: highThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 67, internationalCertificates: 70 },
  },
  {
    key: "energy-engineering",
    faculty: "Energy Engineering",
    aliases: ["Energy Engineering", "Energy & Environmental Engineering"],
    feeBreakdown: {
      tuitionFees: 125000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 260000,
    },
    feeByTier: { C: 260000, B: 235000, A: 222500, AStar: 210000 },
    thresholds: {
      igcse: highThresholdBand,
      american: highAmericanThresholdBand,
      arab: highArabThresholdBand,
      thanaweya: highThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 67, internationalCertificates: 70 },
  },
  {
    key: "computer-science",
    faculty: "Computer Science",
    aliases: ["Computer Science", "Informatics & Computer Science"],
    feeBreakdown: {
      tuitionFees: 165000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 300000,
    },
    feeByTier: { C: 300000, B: 267000, A: 250500, AStar: 234000 },
    thresholds: {
      igcse: { B: 80, A: 85, AStar: 90 },
      american: { B: 80, A: 90, AStar: 100 },
      arab: { B: 80, A: 85, AStar: 90 },
      thanaweya: { B: 65, A: 75, AStar: 85 },
    },
    minimumAdmission: { egyptianCertificates: 60, internationalCertificates: 65 },
  },
  {
    key: "arts-design",
    faculty: "Arts & Design",
    aliases: ["Arts & Design", "Art & Design"],
    feeBreakdown: {
      tuitionFees: 130000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 265000,
    },
    feeByTier: { C: 265000, B: 239000, A: 226000, AStar: 213000 },
    thresholds: {
      igcse: defaultThresholdBand,
      american: defaultAmericanThresholdBand,
      arab: defaultArabThresholdBand,
      thanaweya: defaultThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 53, internationalCertificates: 58 },
  },
  {
    key: "business-administration",
    faculty: "Business Administration",
    aliases: ["Business Administration"],
    feeBreakdown: {
      tuitionFees: 160000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 295000,
    },
    feeByTier: { C: 295000, B: 263000, A: 247000, AStar: 231000 },
    thresholds: {
      igcse: defaultThresholdBand,
      american: defaultAmericanThresholdBand,
      arab: defaultArabThresholdBand,
      thanaweya: defaultThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 53, internationalCertificates: 58 },
  },
  {
    key: "political-science",
    faculty: "Political Science",
    aliases: ["Political Science"],
    feeBreakdown: {
      tuitionFees: 85000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 220000,
    },
    feeByTier: { C: 220000, B: 203000, A: 194500, AStar: 186000 },
    thresholds: {
      igcse: defaultThresholdBand,
      american: defaultAmericanThresholdBand,
      arab: defaultArabThresholdBand,
      thanaweya: defaultThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 53, internationalCertificates: 58 },
  },
  {
    key: "economics",
    faculty: "Economics",
    aliases: ["Economics"],
    feeBreakdown: {
      tuitionFees: 85000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 220000,
    },
    feeByTier: { C: 220000, B: 203000, A: 194500, AStar: 186000 },
    thresholds: {
      igcse: defaultThresholdBand,
      american: defaultAmericanThresholdBand,
      arab: defaultArabThresholdBand,
      thanaweya: defaultThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 53, internationalCertificates: 58 },
  },
  {
    key: "law",
    faculty: "Law",
    aliases: ["Law"],
    feeBreakdown: {
      tuitionFees: 85000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 220000,
    },
    feeByTier: { C: 220000, B: 203000, A: 194500, AStar: 186000 },
    thresholds: {
      igcse: defaultThresholdBand,
      american: defaultAmericanThresholdBand,
      arab: defaultArabThresholdBand,
      thanaweya: defaultThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 53, internationalCertificates: 58 },
  },
  {
    key: "mass-communication",
    faculty: "Mass Communication",
    aliases: ["Mass Communication", "Communication & Mass Media"],
    feeBreakdown: {
      tuitionFees: 85000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 220000,
    },
    feeByTier: { C: 220000, B: 203000, A: 194500, AStar: 186000 },
    thresholds: {
      igcse: defaultThresholdBand,
      american: defaultAmericanThresholdBand,
      arab: defaultArabThresholdBand,
      thanaweya: defaultThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 53, internationalCertificates: 58 },
  },
  {
    key: "psychology",
    faculty: "Psychology",
    aliases: ["Psychology"],
    feeBreakdown: {
      tuitionFees: 85000,
      educationalSupportServices: 90000,
      administrativeFees: 45000,
      totalCategoryC: 220000,
    },
    feeByTier: { C: 220000, B: 203000, A: 194500, AStar: 186000 },
    thresholds: {
      igcse: defaultThresholdBand,
      american: defaultAmericanThresholdBand,
      arab: defaultArabThresholdBand,
      thanaweya: defaultThanaweyaThresholdBand,
    },
    minimumAdmission: { egyptianCertificates: 53, internationalCertificates: 58 },
  },
  {
    key: "english",
    faculty: "English",
    aliases: ["English", "English Language and Literature"],
    feeBreakdown: {
      tuitionFees: 30000,
      educationalSupportServices: 90000,
      administrativeFees: 10000,
      totalCategoryC: 130000,
    },
    feeByTier: { C: 130000, B: 121000, A: 118000, AStar: 115000 },
    thresholds: {
      igcse: { B: 80, A: 85, AStar: 90 },
      american: { B: 80, A: 90, AStar: 100 },
      arab: { B: 80, A: 85, AStar: 90 },
      thanaweya: { B: 65, A: 75, AStar: 85 },
    },
    minimumAdmission: { egyptianCertificates: 53, internationalCertificates: 58 },
  },
  {
    key: "chinese",
    faculty: "Chinese",
    aliases: ["Chinese", "Chinese Language & Culture"],
    feeBreakdown: {
      tuitionFees: 70000,
      educationalSupportServices: 0,
      administrativeFees: 25000,
      totalCategoryC: 95000,
    },
    feeByTier: { C: 95000, B: 74000, A: 67000, AStar: 60000 },
    thresholds: {
      igcse: { B: 80, A: 85, AStar: 90 },
      american: { B: 80, A: 90, AStar: 100 },
      arab: { B: 80, A: 85, AStar: 90 },
      thanaweya: { B: 65, A: 75, AStar: 85 },
    },
    minimumAdmission: { egyptianCertificates: 53, internationalCertificates: 58 },
  },
  {
    key: "nursing",
    faculty: "Nursing",
    aliases: ["Nursing"],
    feeBreakdown: {
      tuitionFees: 25000,
      educationalSupportServices: 45000,
      administrativeFees: 15000,
      totalCategoryC: 85000,
    },
    feeByTier: { C: 85000, B: 80000, A: 77500, AStar: 75000 },
    thresholds: {
      igcse: { B: 80, A: 85, AStar: 90 },
      american: { B: 80, A: 90, AStar: 100 },
      arab: { B: 80, A: 85, AStar: 90 },
      thanaweya: { B: 60, A: 70, AStar: 80 },
    },
    minimumAdmission: { egyptianCertificates: 55, internationalCertificates: 58 },
  },
];

export const certificateTypesForMinimumAdmission = {
  egyptianCertificates: [
    "Thanaweya Amma",
    "Al-Azhar",
    "STEM",
    "Nile",
  ],
  internationalCertificates: [
    "Arab",
    "IGCSE",
    "American Diploma",
  ],
} as const;

const normalize = (value: string): string => value.toLowerCase().trim();

const facultyLookup2026 = new Map<string, FacultyFeeConfig2026>();
facultyFeeConfig2026.forEach((entry) => {
  [entry.faculty, ...entry.aliases].forEach((alias) => {
    const key = normalize(alias);
    if (!facultyLookup2026.has(key)) {
      facultyLookup2026.set(key, entry);
    }
  });
});

export const resolveFacultyConfig2026 = (
  facultyOrAlias: string
): FacultyFeeConfig2026 | undefined => {
  const input = normalize(facultyOrAlias);
  const exact = facultyLookup2026.get(input);
  if (exact) return exact;

  for (const [key, value] of facultyLookup2026.entries()) {
    if (key.includes(input) || input.includes(key)) {
      return value;
    }
  }
  return undefined;
};

export const scholarshipThresholdRows2026 = facultyFeeConfig2026.map((entry) => ({
  faculty: entry.faculty,
  thresholds: entry.thresholds,
}));
