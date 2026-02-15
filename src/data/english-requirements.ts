export interface EnglishExemptionTest {
  testName: string;
  minimumScore: string;
  validDate?: string;
}

export interface EnglishRequirementCategory {
  id: string;
  category: string;
  description: string;
  exemptionCriteria: EnglishExemptionTest[];
  ifNotExempt: string[];
  lastUpdated: string;
  version: string;
}

export const englishRequirementCategories: EnglishRequirementCategory[] = [
  {
    id: 'international-certificates',
    category: 'International High School Certificates',
    description: 'Holders of international high school certificates are exempt from the BUE English Test, provided they have achieved the required score/mark in the English subject of their high school.',
    exemptionCriteria: [
      { testName: 'Academic IELTS', minimumScore: '5.0', validDate: 'Two Years From The Test Date' },
      { testName: 'Academic TOEFL', minimumScore: '60', validDate: 'Two Years From The Test Date' },
      { testName: 'IGCSE / GCSE', minimumScore: 'C/4 in High School English' },
      { testName: 'American Diploma', minimumScore: '520 in English or EST1/SAT1, OR 39 in English + Writing of ACT1' },
      { testName: 'French Baccalaureate (BAC)', minimumScore: '15 in High School English' },
      { testName: 'International Baccalaureate (IB)', minimumScore: '1 in High School English' },
      { testName: 'Canadian Diploma', minimumScore: '75% in High School English' },
      { testName: 'German Abitur', minimumScore: '4 in High School English' },
      { testName: 'Nile International Certificate', minimumScore: 'C in High School English' },
    ],
    ifNotExempt: [
      'Taking the BUE English Test',
      'Submitting a valid Academic IELTS certificate with a minimum score of 5.0',
      'Submitting a valid Academic TOEFL certificate with a minimum score of 60',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'thanaweya-amma-equivalent',
    category: 'Thanaweya Amma or Its Equivalent',
    description: 'For holders of Thanaweya Amma or its equivalent (approved Arab, Azharian, and other types of high school certificates), applicants must take the BUE English Test.',
    exemptionCriteria: [
      { testName: 'Academic IELTS', minimumScore: '5.0' },
      { testName: 'Academic TOEFL', minimumScore: '60' },
    ],
    ifNotExempt: [
      'Taking the BUE English Test is mandatory unless exempted with valid IELTS or TOEFL',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
];

export interface AdmissionInterview {
  faculty: string;
  type: 'Interview' | 'Assessment' | 'Both';
  description: string;
  purpose: string;
}

export const admissionInterviews: AdmissionInterview[] = [
  {
    faculty: 'Faculty of Arts & Design',
    type: 'Assessment',
    description: 'Portfolio or Aptitude Test',
    purpose: 'Assesses creativity and potential; helps evaluate artistic vision and skill level.',
  },
  {
    faculty: 'Faculty of Law',
    type: 'Interview',
    description: 'Behavioral and attitude interview',
    purpose: 'Focus on understanding behavior and attitude; ensures readiness for the challenges of a legal career.',
  },
  {
    faculty: 'Faculty of Physiotherapy',
    type: 'Interview',
    description: 'Physical and mental readiness evaluation',
    purpose: 'Evaluates physical and mental readiness to care for patients; ensures resilience and compassion required in the healthcare field.',
  },
  {
    faculty: 'Faculty of Nursing',
    type: 'Interview',
    description: 'Physical and mental readiness evaluation',
    purpose: 'Evaluates physical and mental readiness to care for patients; ensures resilience and compassion required in the healthcare field.',
  },
];

export const admissionInterviewIntro = 'The British University in Egypt (BUE) believes in providing a personalized approach during the admissions process. While interviews are not required for all faculties, they play a vital role in ensuring that each applicant is well-suited to their chosen program and future career.';

// Legacy exports for backward compatibility
export interface EnglishRequirement {
  id: string;
  testName: string;
  minimumScore: string;
  validityPeriod: string;
  exemptionCriteria?: string;
  notes?: string;
  lastUpdated: string;
  version: string;
}

export const englishRequirements: EnglishRequirement[] = [
  {
    id: 'ielts',
    testName: 'IELTS Academic',
    minimumScore: '5.0 overall',
    validityPeriod: 'Not taken before January 2025',
    exemptionCriteria: 'Exempts from BUE English Test',
    notes: 'Must be Academic IELTS',
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'toefl',
    testName: 'TOEFL Academic',
    minimumScore: '60',
    validityPeriod: 'Not taken before January 2025',
    exemptionCriteria: 'Exempts from BUE English Test',
    notes: 'Academic TOEFL only',
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'igcse-english',
    testName: 'IGCSE/GCSE English',
    minimumScore: 'Grade C or 4',
    validityPeriod: 'No expiry',
    exemptionCriteria: 'Exempts from BUE English Test',
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'american-diploma',
    testName: 'American Diploma English',
    minimumScore: '520 in English or EST1/SAT1, OR 39 in English + Writing of ACT1',
    validityPeriod: 'No expiry',
    exemptionCriteria: 'Exempts from BUE English Test',
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'ib',
    testName: 'International Baccalaureate (IB)',
    minimumScore: '1 in High School English',
    validityPeriod: 'No expiry',
    exemptionCriteria: 'Exempts from BUE English Test',
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'canadian',
    testName: 'Canadian Diploma',
    minimumScore: '75% in High School English',
    validityPeriod: 'No expiry',
    exemptionCriteria: 'Exempts from BUE English Test',
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'abitur',
    testName: 'German Abitur',
    minimumScore: '4 in High School English',
    validityPeriod: 'No expiry',
    exemptionCriteria: 'Exempts from BUE English Test',
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'french-bac',
    testName: 'French Baccalaureate',
    minimumScore: '15 in High School English',
    validityPeriod: 'No expiry',
    exemptionCriteria: 'Exempts from BUE English Test',
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'nile',
    testName: 'Nile International Certificate',
    minimumScore: 'Grade C in High School English',
    validityPeriod: 'No expiry',
    exemptionCriteria: 'Exempts from BUE English Test',
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
];

export const getEnglishRequirementById = (id: string): EnglishRequirement | undefined => {
  return englishRequirements.find(r => r.id === id);
};

export const searchEnglishRequirements = (query: string): EnglishRequirement[] => {
  const lowerQuery = query.toLowerCase();
  return englishRequirements.filter(r =>
    r.testName.toLowerCase().includes(lowerQuery) ||
    r.minimumScore.toLowerCase().includes(lowerQuery) ||
    r.exemptionCriteria?.toLowerCase().includes(lowerQuery)
  );
};
