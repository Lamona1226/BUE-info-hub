// ============= Egyptian Students Tuition Fees =============
export interface EgyptianTuitionFee {
  faculty: string;
  program?: string;
  categoryC: number;
  categoryB: number;
  categoryA: number;
  categoryAStar: number;
  category: 'Technology' | 'Social Sciences' | 'Languages' | 'Health';
}

export const egyptianTuitionFees: EgyptianTuitionFee[] = [
  // Technology
  { faculty: 'Engineering', program: 'BSc (Hons)', categoryC: 290000, categoryB: 266000, categoryA: 242000, categoryAStar: 226000, category: 'Technology' },
  { faculty: 'Art & Design', program: 'BA (Hons)', categoryC: 240000, categoryB: 223500, categoryA: 207000, categoryAStar: 196000, category: 'Technology' },
  { faculty: 'Energy & Environmental Engineering', program: 'BSc (Hons)', categoryC: 230000, categoryB: 215000, categoryA: 200000, categoryAStar: 190000, category: 'Technology' },
  { faculty: 'Informatics & Computer Science', program: 'BSc (Hons)', categoryC: 260000, categoryB: 240500, categoryA: 221000, categoryAStar: 208000, category: 'Technology' },
  // Social Sciences
  { faculty: 'Business Administration', program: 'BSc (Hons)', categoryC: 265000, categoryB: 244750, categoryA: 224500, categoryAStar: 211000, category: 'Social Sciences' },
  { faculty: 'Political Science', program: 'BSc (Hons)', categoryC: 190000, categoryB: 181000, categoryA: 172000, categoryAStar: 166000, category: 'Social Sciences' },
  { faculty: 'Economics', program: 'BSc (Hons)', categoryC: 190000, categoryB: 181000, categoryA: 172000, categoryAStar: 166000, category: 'Social Sciences' },
  { faculty: 'Communication & Mass Media', program: 'BSc (Hons)', categoryC: 195000, categoryB: 185250, categoryA: 175500, categoryAStar: 169000, category: 'Social Sciences' },
  { faculty: 'Psychology', program: 'BA (Hons)', categoryC: 220000, categoryB: 206500, categoryA: 193000, categoryAStar: 184000, category: 'Social Sciences' },
  { faculty: 'Law', program: 'BSc (Hons)', categoryC: 190000, categoryB: 181000, categoryA: 172000, categoryAStar: 166000, category: 'Social Sciences' },
  // Languages
  { faculty: 'English Language and Literature', program: 'BA (Hons)', categoryC: 130000, categoryB: 121000, categoryA: 118000, categoryAStar: 115000, category: 'Languages' },
  { faculty: 'Chinese Language & Culture', program: 'BA (Hons)', categoryC: 90000, categoryB: 79500, categoryA: 69000, categoryAStar: 62000, category: 'Languages' },
  // Health
  { faculty: 'Dentistry', program: 'Bachelor of Dental Surgery', categoryC: 330000, categoryB: 302000, categoryA: 288000, categoryAStar: 274000, category: 'Health' },
  { faculty: 'Clinical Pharmacy', program: 'Pharm D - Clinical', categoryC: 220000, categoryB: 194500, categoryA: 169000, categoryAStar: 152000, category: 'Health' },
  { faculty: 'Pharmacy', program: 'Pharm-D', categoryC: 210000, categoryB: 186000, categoryA: 162000, categoryAStar: 146000, category: 'Health' },
  { faculty: 'Nursing', program: 'BSc (Hons)', categoryC: 79000, categoryB: 75400, categoryA: 71800, categoryAStar: 69400, category: 'Health' },
  { faculty: 'Physiotherapy', program: 'BSc (Hons)', categoryC: 230000, categoryB: 216500, categoryA: 203000, categoryAStar: 194000, category: 'Health' },
];

// ============= International Students Tuition Fees =============
export interface InternationalTuitionFee {
  faculty: string;
  program?: string;
  categoryC: number;
  categoryB: number;
  categoryA: number;
  categoryAStar: number;
  category: 'Technology' | 'Social Sciences' | 'Languages' | 'Health';
}

export const internationalTuitionFees: InternationalTuitionFee[] = [
  // Technology
  { faculty: 'Engineering', program: 'BSc (Hons)', categoryC: 11000, categoryB: 9418, categoryA: 8627, categoryAStar: 7836, category: 'Technology' },
  { faculty: 'Art & Design', program: 'BA (Hons)', categoryC: 9600, categoryB: 8298, categoryA: 7647, categoryAStar: 6996, category: 'Technology' },
  { faculty: 'Energy & Environmental Engineering', program: 'BSc (Hons)', categoryC: 9350, categoryB: 8098, categoryA: 7472, categoryAStar: 6846, category: 'Technology' },
  { faculty: 'Informatics & Computer Science', program: 'BSc (Hons)', categoryC: 10850, categoryB: 9298, categoryA: 8522, categoryAStar: 7746, category: 'Technology' },
  // Social Sciences
  { faculty: 'Business Administration', program: 'BSc (Hons)', categoryC: 10500, categoryB: 9018, categoryA: 8277, categoryAStar: 7536, category: 'Social Sciences' },
  { faculty: 'Political Science', program: 'BSc (Hons)', categoryC: 7950, categoryB: 6978, categoryA: 6492, categoryAStar: 6006, category: 'Social Sciences' },
  { faculty: 'Economics', program: 'BSc (Hons)', categoryC: 7950, categoryB: 6978, categoryA: 6492, categoryAStar: 6006, category: 'Social Sciences' },
  { faculty: 'Communication & Mass Media', program: 'BSc (Hons)', categoryC: 7950, categoryB: 6978, categoryA: 6492, categoryAStar: 6006, category: 'Social Sciences' },
  { faculty: 'Psychology', program: 'BA (Hons)', categoryC: 7950, categoryB: 6978, categoryA: 6492, categoryAStar: 6006, category: 'Social Sciences' },
  { faculty: 'Law', program: 'BSc (Hons)', categoryC: 7950, categoryB: 6978, categoryA: 6492, categoryAStar: 6006, category: 'Social Sciences' },
  // Languages
  { faculty: 'English Language and Literature', program: 'BA (Hons)', categoryC: 4700, categoryB: 4148, categoryA: 3964, categoryAStar: 3780, category: 'Languages' },
  { faculty: 'Chinese Language & Culture', program: 'BA (Hons)', categoryC: 3450, categoryB: 2823, categoryA: 2614, categoryAStar: 2405, category: 'Languages' },
  // Health
  { faculty: 'Dentistry', program: 'Bachelor of Dental Surgery', categoryC: 12700, categoryB: 11145, categoryA: 10626, categoryAStar: 9589, category: 'Health' },
  { faculty: 'Clinical Pharmacy', program: 'Pharm D - Clinical', categoryC: 9050, categoryB: 7558, categoryA: 6812, categoryAStar: 6066, category: 'Health' },
  { faculty: 'Pharmacy', program: 'Pharm-D', categoryC: 8650, categoryB: 7238, categoryA: 6532, categoryAStar: 5826, category: 'Health' },
  { faculty: 'Nursing', program: 'BSc (Hons)', categoryC: 3100, categoryB: 2756, categoryA: 2584, categoryAStar: 2412, category: 'Health' },
  { faculty: 'Physiotherapy', program: 'BSc (Hons)', categoryC: 9450, categoryB: 8178, categoryA: 7542, categoryAStar: 6906, category: 'Health' },
];

// ============= Scholarships =============
export interface ScholarshipCategory {
  faculty: string;
  certificates: {
    igcse: { B: string; A: string; AStar: string };
    american: { B: string; A: string; AStar: string };
    arab: { B: string; A: string; AStar: string };
    thanwya: { B: string; A: string; AStar: string };
  };
}

export const scholarshipCategories: ScholarshipCategory[] = [
  {
    faculty: 'Dentistry (Bachelor of Dental Surgery)',
    certificates: {
      igcse: { B: '95%', A: '97%', AStar: '100%' },
      american: { B: '110%', A: '115%', AStar: '120%' },
      arab: { B: '95%', A: '97%', AStar: '99%' },
      thanwya: { B: '85%', A: '88%', AStar: '90%' },
    },
  },
  {
    faculty: 'Pharmacy / Physiotherapy / Engineering / Energy & Environmental Engineering / Informatics & Computer Science',
    certificates: {
      igcse: { B: '90%', A: '95%', AStar: '98%' },
      american: { B: '77%', A: '85%', AStar: '90%' },
      arab: { B: '95%', A: '98%', AStar: '110%' },
      thanwya: { B: '100%', A: '110%', AStar: '98%' },
    },
  },
  {
    faculty: 'Art & Design / Business Administration / Communication & Mass Media / Psychology / Law / English Language and Literature / Chinese Language & Culture / Nursing',
    certificates: {
      igcse: { B: '85%', A: '90%', AStar: '98%' },
      american: { B: '90%', A: '100%', AStar: '110%' },
      arab: { B: '85%', A: '90%', AStar: '98%' },
      thanwya: { B: '70%', A: '75%', AStar: '85%' },
    },
  },
  {
    faculty: 'Other Programs',
    certificates: {
      igcse: { B: '80%', A: '96%', AStar: '100%' },
      american: { B: '60%', A: '100%', AStar: '96%' },
      arab: { B: '85%', A: '96%', AStar: '80%' },
      thanwya: { B: '70%', A: '80%', AStar: '-' },
    },
  },
];

export const scholarshipNotes = {
  egyptianStudents: [
    'The fees displayed include the Magdi Yacoub Grant, awarded as EGP 10,000 to the Faculty of Nursing and EGP 30,000 to the first cohort of the Faculty of Physiotherapy.',
    'All fees are paid in Egyptian Pounds.',
    'The Educational Support Services fees are paid with the equivalent of Egyptian pounds as per the fixed exchange rate.',
    'Academic scholarships are only applied to the tuition element of the fees.',
    'Category B corresponds to a 15% scholarship; category A corresponds to a 30% scholarship and Category A* corresponds to a 40% scholarship on the tuition element of the fees.',
    'Exception: Dentistry programme - Category B = 10%, Category A = 15%, Category A* = 20% scholarship.',
    'Exception: English programme - Category B = 30%, Category A = 40%, Category A* = 50% scholarship.',
    'All fees are paid annually except the labs insurance fees.',
    'Lab insurance fees are paid in the first year only, they are refundable in case of withdrawal or graduation provided no damages have been reported by the relevant faculty.',
    'Tuition fees are subject to an annual increase up to 10%.',
    'The late payment penalty policy is applied after the Installment\'s due date at a rate of 2% per month.',
  ],
  internationalStudents: [
    'All fees are paid in Sterling pounds or its equivalent in US dollars except for lab insurance Fees.',
    'Labs insurance Fees are paid in Egyptian pounds and paid in the first year only.',
    'They are refundable in case of withdrawal or graduation provided no damages have been reported by the relevant faculty.',
    'Category B corresponds to a 15% scholarship; category A corresponds to a 30% scholarship and Category A* corresponds to a 40% scholarship on the tuition element of the fees.',
    'Exception: Dentistry programme - Category B = 10%, Category A = 15%, Category A* = 20% scholarship.',
    'Exception: English programme - Category B = 30%, Category A = 40%, Category A* = 50% scholarship.',
    'Tuition fees are subject to an annual increase up to 10%.',
    'The late payment penalty policy is applied after the instalment\'s due date at a rate of (2%) for each month.',
  ],
  general: [
    'The BUE offers various partial scholarships based on certain criteria.',
    'The partial scholarships criteria are offered in addition to the academic scholarships categories (A*-A-B-C) with a maximum of (20%) for all faculties except for Dentistry which is up to (15%).',
    'Exceptions apply for Sports achievements and deceased Guardian.',
    'All scholarships apply to The Tuition Fees only.',
    'All scholarships are awarded for the first year only.',
    'As proper, they are reassessed at the beginning of every academic year based on the student\'s relevant achievements during the previous year.',
    'All scholarships are given on the condition that the student successfully progresses.',
  ],
  certificateClassifications: [
    'French Baccalaureate, IB, Canadian Diploma, German Abitur, Nile Schools and all other international certificates are classified in the same categories as the IGCSE.',
    'Alazhar, STEM certificates, Health technical institutes are classified as Egyptian Thanwya Amma.',
  ],
};

export const otherPartialScholarships = [
  { name: 'Sports Achievement Scholarship', description: 'Available for students with exceptional sports achievements' },
];

// ============= Installments =============
export interface InstallmentPlan {
  installment: string;
  value: string;
  deadline: string;
}

export const installmentPlans: InstallmentPlan[] = [
  { installment: '1st Installment', value: '40%', deadline: 'Acceptance Date' },
  { installment: '2nd Installment', value: '30%', deadline: 'Before 30th November 2025' },
  { installment: '3rd Installment', value: '30%', deadline: 'Before 28th February 2026' },
];

// ============= Insurance Fees =============
export interface InsuranceFee {
  faculty: string;
  fee: number;
  refundable: boolean;
}

export const insuranceFees: InsuranceFee[] = [
  { faculty: 'Dentistry', fee: 20000, refundable: true },
  { faculty: 'Communication & Mass Media (CMM)', fee: 10000, refundable: true },
  { faculty: 'Arts & Design', fee: 10000, refundable: true },
  { faculty: 'Informatics & Computer Science (ICS)', fee: 10000, refundable: true },
  { faculty: 'Physiotherapy', fee: 10000, refundable: true },
];

// ============= Refund Policy =============
export interface RefundPolicyItem {
  dateOrItem: string;
  termsAndConditions: string;
}

export const refundPolicyItems: RefundPolicyItem[] = [
  { dateOrItem: 'Application fees', termsAndConditions: 'Non-refundable' },
  { dateOrItem: 'Before the 1st day of the Academic Year', termsAndConditions: 'Deduction of 10% of the downpayment amount' },
  { dateOrItem: 'Till the end of the 1st month of the Academic Year', termsAndConditions: 'Deduction 50% of the 1st installment' },
  { dateOrItem: 'After the end of 1st month of the Academic Year', termsAndConditions: 'Deduction of 100% of the 1st installment' },
  { dateOrItem: 'Before 21st of December 2025', termsAndConditions: 'Deduction of the 1st installment + 50% of the 2nd installment' },
  { dateOrItem: '1st of January 2026 and till 28th February 2026', termsAndConditions: 'No refund is allowed for the 1st & 2nd installment' },
  { dateOrItem: '1st of March 2026', termsAndConditions: 'No refund is allowed for the total annual tuition fee' },
  { dateOrItem: 'Applicants who joined Military and Police colleges', termsAndConditions: 'Deduction of 50% of the paid amount (Provided proof of enrollment)' },
];

export const accommodationTransportRefund = {
  egyptian: {
    accommodation: 'Deduction of 10,000 EGP from Accommodation fees till 2nd teaching week (no refund after 2nd teaching week)',
    transportation: 'Deduction of 5,000 EGP from Transportation till 2nd teaching week (no refund after 2nd teaching week)',
  },
  international: {
    accommodation: 'Deduction of 400.00 GBP from Accommodation fees till 2nd teaching week (no refund after 2nd teaching week)',
    transportation: 'Deduction of 5,000 EGP from transportation fees till 2nd teaching week (no refund after 2nd teaching week)',
  },
};

export const refundProcess = [
  'In case of a refund request, the refunded amount will be via bank transfer after providing the guardian clear bank details and it takes 15 working days.',
  'Bank Transfers are only issued in the name of the applicant\'s legal guardian (father).',
];

export const refundPolicyNote = 'As per the Council of Private and National Universities (CPNU) Decree on the 14th of February 2023.';

// ============= Accommodation & Transportation =============
// Note: Specific accommodation and transportation fees were not provided in the data.
// These will be placeholder structures for when the data is provided.

export interface AccommodationFee {
  roomType: string;
  feePerYear: number;
  currency: 'EGP';
}

export interface TransportationFee {
  area: string;
  feePerYear: number;
  currency: 'EGP';
}

export const accommodationFees: AccommodationFee[] = [
  { roomType: 'Triple Room', feePerYear: 44500, currency: 'EGP' },
  { roomType: 'Double Room', feePerYear: 57500, currency: 'EGP' },
  { roomType: 'Premium Double Room', feePerYear: 70000, currency: 'EGP' },
  { roomType: 'Single Room', feePerYear: 82500, currency: 'EGP' },
  { roomType: 'Premium Single Room', feePerYear: 95000, currency: 'EGP' },
];

export const transportationFees: TransportationFee[] = [
  { area: 'El-Sherouk / Madinaty', feePerYear: 19000, currency: 'EGP' },
  { area: 'El-Rehab / New Cairo / 10th of Ramadan / Obour', feePerYear: 20000, currency: 'EGP' },
  { area: 'Nasr City / Heliopolis', feePerYear: 22000, currency: 'EGP' },
  { area: 'Maadi / Helwan / Downtown / Giza / Dokki / Agouza / Mohandeseen / Zagazig', feePerYear: 24500, currency: 'EGP' },
  { area: '6th October', feePerYear: 30000, currency: 'EGP' },
];

export interface AccommodationOption {
  id: string;
  name: string;
  feePerYear: number;
  currency: 'EGP' | 'GBP';
  features: string[];
  compareTag: string;
}

export interface TransportationOption {
  id: string;
  name: string;
  feePerYear: number;
  currency: 'EGP';
  features: string[];
  compareTag: string;
}

export const accommodationOptions: AccommodationOption[] = [
  {
    id: 'triple-room',
    name: 'Triple Room',
    feePerYear: 44500,
    currency: 'EGP',
    features: ['Shared occupancy', 'Standard furnishings', 'Annual contract'],
    compareTag: 'Best value',
  },
  {
    id: 'double-room',
    name: 'Double Room',
    feePerYear: 57500,
    currency: 'EGP',
    features: ['Double occupancy', 'Upgraded storage', 'Annual contract'],
    compareTag: 'Balanced',
  },
  {
    id: 'premium-double',
    name: 'Premium Double Room',
    feePerYear: 70000,
    currency: 'EGP',
    features: ['Double occupancy', 'Premium amenities', 'Preferred floor'],
    compareTag: 'Comfort',
  },
  {
    id: 'single-room',
    name: 'Single Room',
    feePerYear: 82500,
    currency: 'EGP',
    features: ['Single occupancy', 'Quiet zone', 'Annual contract'],
    compareTag: 'Private',
  },
  {
    id: 'premium-single',
    name: 'Premium Single Room',
    feePerYear: 95000,
    currency: 'EGP',
    features: ['Single occupancy', 'Premium amenities', 'Priority services'],
    compareTag: 'Premium',
  },
];

export const internationalAccommodationOptions: AccommodationOption[] = [
  {
    id: 'triple-room-intl',
    name: 'Triple Room',
    feePerYear: 1800,
    currency: 'GBP',
    features: ['Shared occupancy', 'Standard furnishings', 'Annual contract'],
    compareTag: 'Best value',
  },
  {
    id: 'double-room-intl',
    name: 'Double Room',
    feePerYear: 2500,
    currency: 'GBP',
    features: ['Double occupancy', 'Upgraded storage', 'Annual contract'],
    compareTag: 'Balanced',
  },
  {
    id: 'premium-double-intl',
    name: 'Premium Double Room',
    feePerYear: 3000,
    currency: 'GBP',
    features: ['Double occupancy', 'Premium amenities', 'Preferred floor'],
    compareTag: 'Comfort',
  },
  {
    id: 'single-room-intl',
    name: 'Single Room',
    feePerYear: 3500,
    currency: 'GBP',
    features: ['Single occupancy', 'Quiet zone', 'Annual contract'],
    compareTag: 'Private',
  },
  {
    id: 'premium-single-intl',
    name: 'Premium Single Room',
    feePerYear: 4000,
    currency: 'GBP',
    features: ['Single occupancy', 'Premium amenities', 'Priority services'],
    compareTag: 'Premium',
  },
];

export const transportationOptions: TransportationOption[] = [
  {
    id: 'sherouk-madinaty',
    name: 'El-Sherouk / Madinaty',
    feePerYear: 19000,
    currency: 'EGP',
    features: ['Main campus route', 'Morning + afternoon loops'],
    compareTag: 'Budget',
  },
  {
    id: 'rehab-newcairo',
    name: 'El-Rehab / New Cairo / 10th of Ramadan / Obour',
    feePerYear: 20000,
    currency: 'EGP',
    features: ['Multi-zone coverage', 'Priority pickup points'],
    compareTag: 'Popular',
  },
  {
    id: 'nasr-heliopolis',
    name: 'Nasr City / Heliopolis',
    feePerYear: 22000,
    currency: 'EGP',
    features: ['Express stops', 'Late return option'],
    compareTag: 'Express',
  },
  {
    id: 'maadi-giza',
    name: 'Maadi / Helwan / Downtown / Giza / Dokki / Agouza / Mohandeseen / Zagazig',
    feePerYear: 24500,
    currency: 'EGP',
    features: ['Extended coverage', 'Multiple pickup windows'],
    compareTag: 'Extended',
  },
  {
    id: 'sixth-october',
    name: '6th October',
    feePerYear: 30000,
    currency: 'EGP',
    features: ['Long distance route', 'Reserved seats'],
    compareTag: 'Long haul',
  },
];

export const accommodationTransportCopy = {
  sortByPriceLabel: 'Sort by price',
  compareTitle: 'Quick compare',
  compareLabels: {
    lowest: 'Lowest price',
    highest: 'Highest price',
  },
};

// ============= Utility Functions =============
export const formatEGP = (amount: number): string => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatGBP = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getEgyptianFeesByCategory = (category: EgyptianTuitionFee['category']): EgyptianTuitionFee[] => {
  return egyptianTuitionFees.filter(f => f.category === category);
};

export const getInternationalFeesByCategory = (category: InternationalTuitionFee['category']): InternationalTuitionFee[] => {
  return internationalTuitionFees.filter(f => f.category === category);
};

// ============= Academic Scholarship Score Thresholds =============
export interface ScholarshipThreshold {
  facultyGroup: string;
  faculties: string[];
  discountB: string;
  discountA: string;
  discountAStar: string;
  certificates: {
    igcse: { B: string; A: string; AStar: string };
    american: { B: string; A: string; AStar: string };
    arab: { B: string; A: string; AStar: string };
    thanwya: { B: string; A: string; AStar: string };
  };
}

export const scholarshipThresholds: ScholarshipThreshold[] = [
  {
    facultyGroup: 'Dentistry',
    faculties: ['Dentistry (Bachelor of Dental Surgery)'],
    discountB: '10%',
    discountA: '15%',
    discountAStar: '20%',
    certificates: {
      igcse: { B: '95%', A: '97%', AStar: '100%' },
      american: { B: '110%', A: '115%', AStar: '120%' },
      arab: { B: '95%', A: '97%', AStar: '99%' },
      thanwya: { B: '85%', A: '88%', AStar: '90%' },
    },
  },
  {
    facultyGroup: 'Pharmacy',
    faculties: ['Pharmacy', 'Clinical Pharmacy'],
    discountB: '15%',
    discountA: '30%',
    discountAStar: '40%',
    certificates: {
      igcse: { B: '90%', A: '95%', AStar: '98%' },
      american: { B: '77%', A: '85%', AStar: '90%' },
      arab: { B: '95%', A: '98%', AStar: '98%' },
      thanwya: { B: '100%', A: '110%', AStar: '90%' },
    },
  },
  {
    facultyGroup: 'Physiotherapy / Engineering / Energy / ICS',
    faculties: ['Physiotherapy', 'Engineering', 'Energy & Environmental Engineering', 'Informatics & Computer Science'],
    discountB: '15%',
    discountA: '30%',
    discountAStar: '40%',
    certificates: {
      igcse: { B: '85%', A: '90%', AStar: '98%' },
      american: { B: '90%', A: '100%', AStar: '110%' },
      arab: { B: '85%', A: '90%', AStar: '98%' },
      thanwya: { B: '70%', A: '75%', AStar: '85%' },
    },
  },
  {
    facultyGroup: 'Art & Design / BAEPS / Mass Com / Psychology / Law',
    faculties: ['Art & Design', 'Business Administration', 'Economics', 'Political Science', 'Communication & Mass Media', 'Psychology', 'Law'],
    discountB: '15%',
    discountA: '30%',
    discountAStar: '40%',
    certificates: {
      igcse: { B: '80%', A: '85%', AStar: '96%' },
      american: { B: '60%', A: '85%', AStar: '100%' },
      arab: { B: '85%', A: '96%', AStar: '96%' },
      thanwya: { B: '70%', A: '80%', AStar: '80%' },
    },
  },
  {
    facultyGroup: 'Chinese / Nursing',
    faculties: ['Chinese Language & Culture', 'Nursing'],
    discountB: '15%',
    discountA: '30%',
    discountAStar: '40%',
    certificates: {
      igcse: { B: '75%', A: '80%', AStar: '90%' },
      american: { B: '60%', A: '82%', AStar: '95%' },
      arab: { B: '75%', A: '80%', AStar: '90%' },
      thanwya: { B: '60%', A: '65%', AStar: '75%' },
    },
  },
  {
    facultyGroup: 'English Language and Literature',
    faculties: ['English Language and Literature'],
    discountB: '30%',
    discountA: '40%',
    discountAStar: '50%',
    certificates: {
      igcse: { B: '75%', A: '80%', AStar: '90%' },
      american: { B: '75%', A: '80%', AStar: '95%' },
      arab: { B: '75%', A: '80%', AStar: '90%' },
      thanwya: { B: '60%', A: '65%', AStar: '75%' },
    },
  },
];

// ============= Scholarship Maintenance Requirements =============
export interface ScholarshipMaintenance {
  category: string;
  faculty: string;
  egyptianScale: string;
  britishScale: string;
}

export const scholarshipMaintenance: ScholarshipMaintenance[] = [
  { category: 'A*', faculty: 'Dentistry & Pharmacy', egyptianScale: '97%', britishScale: '—' },
  { category: 'A*', faculty: 'All Other Faculties', egyptianScale: '97%', britishScale: '77%' },
  { category: 'A', faculty: 'Dentistry & Pharmacy', egyptianScale: '95%', britishScale: '—' },
  { category: 'A', faculty: 'All Other Faculties', egyptianScale: '95%', britishScale: '70%' },
  { category: 'B', faculty: 'Dentistry & Pharmacy', egyptianScale: '90%', britishScale: '—' },
  { category: 'B', faculty: 'All Other Faculties', egyptianScale: '90%', britishScale: '60%' },
];

// ============= Other Partial Scholarships =============
export interface PartialScholarship {
  name: string;
  discount: string;
  validity: string;
  notes?: string;
}

export const partialScholarships: PartialScholarship[] = [
  { name: 'Early Application', discount: '5%', validity: '30th April 2025', notes: 'Apply before deadline' },
  { name: 'Immediate Deposit', discount: '5%', validity: 'Paying downpayment within (5) working days of acceptance letter' },
  { name: 'International Certificates', discount: '5%', validity: 'IGCSE-GCSE-IB-FB-Abitur-Canadian' },
  { name: 'Partner Schools', discount: '10%', validity: 'All faculties except Dentistry & Pharmacy & Physiotherapy' },
  { name: 'Siblings', discount: '10%', validity: 'Applied for the 2nd sibling' },
  { name: 'Sports - International Levels', discount: '80% / 60% / 40%', validity: '1st / 2nd / 3rd rank' },
  { name: 'Sports - National Levels', discount: '40% / 30% / 20%', validity: '1st / 2nd / 3rd rank' },
  { name: 'Sports - Egyptian Levels', discount: '30% / 20% / 10%', validity: '1st / 2nd / 3rd rank' },
  { name: 'Gov Universities Staff', discount: '10%', validity: 'Still active in the workforce' },
  { name: 'Guardian Deceased', discount: '50%', validity: 'Application payment date is prior to the death date' },
];

// ============= Late Payment Policy =============
export const latePaymentPolicy = {
  rate: '2%',
  period: 'per month',
  description: 'The late payment penalty policy is applied after the Installment\'s due date at a rate of 2% per month.',
};

// ============= Down Payment & Application Fees =============
export interface DownPaymentFeeRow {
  faculty: string;
  egyptian: number;
  international: number;
}

export const downPaymentFees: DownPaymentFeeRow[] = [
  { faculty: 'Engineering', egyptian: 90000, international: 3000 },
  { faculty: 'Arts & Design', egyptian: 70000, international: 2500 },
  { faculty: 'Energy', egyptian: 70000, international: 2500 },
  { faculty: 'ICS', egyptian: 80000, international: 2800 },
  { faculty: 'Business Administration', egyptian: 60000, international: 2000 },
  { faculty: 'Political Science', egyptian: 60000, international: 2000 },
  { faculty: 'Economics', egyptian: 60000, international: 2000 },
  { faculty: 'Mass Communication', egyptian: 60000, international: 2000 },
  { faculty: 'Psychology', egyptian: 60000, international: 2000 },
  { faculty: 'Law', egyptian: 60000, international: 2000 },
  { faculty: 'English', egyptian: 40000, international: 1400 },
  { faculty: 'Chinese', egyptian: 25000, international: 1000 },
  { faculty: 'Dentistry', egyptian: 100000, international: 3500 },
  { faculty: 'Clinical Pharmacy', egyptian: 65000, international: 2400 },
  { faculty: 'Pharmacy', egyptian: 60000, international: 2300 },
  { faculty: 'Nursing', egyptian: 20000, international: 900 },
  { faculty: 'Physiotherapy', egyptian: 70000, international: 2500 },
];

export interface AssessmentFee {
  label: string;
  egyptian: number;
  international: number;
}

export const applicationFees: AssessmentFee = {
  label: 'Application',
  egyptian: 1500,
  international: 60,
};

export const englishTestFees: AssessmentFee[] = [
  {
    label: 'English Test',
    egyptian: 1500,
    international: 60,
  },
  {
    label: 'English Test Retake',
    egyptian: 1000,
    international: 40,
  },
  {
    label: 'Portfolio Exam or Aptitude Test',
    egyptian: 1000,
    international: 40,
  },
];
