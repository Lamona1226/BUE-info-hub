export interface Policy {
  id: string;
  title: string;
  category: 'Academic' | 'Financial' | 'Administrative' | 'Student Life' | 'Scholarship' | 'Refund' | 'Installment';
  summary: string;
  details: string[];
  importantDates?: ImportantDate[];
  lastUpdated: string;
  version: string;
}

export interface ImportantDate {
  event: string;
  date: string;
  notes?: string;
}

export const policies: Policy[] = [
  {
    id: 'scholarship-validity',
    title: 'Scholarship Validity & Renewal',
    category: 'Scholarship',
    summary: 'Rules for maintaining academic scholarship eligibility across categories.',
    details: [
      'All scholarships apply to Tuition Fees only.',
      'All scholarships are awarded for the first year only.',
      'Scholarships are reassessed at the beginning of every academic year based on the student\'s relevant achievements during the previous year.',
      'All scholarships are given on the condition that the student successfully progresses.',
      'The partial scholarships criteria are offered in addition to the academic scholarship categories (A*-A-B-C) with a maximum of 20% for all faculties except Dentistry which is capped at 15%.',
      'Exceptions apply for Sports achievements and deceased Guardian.',
    ],
    lastUpdated: '2025-02-05',
    version: '1.0',
  },
  {
    id: 'scholarship-maintenance',
    title: 'Scholarship Maintenance Requirements',
    category: 'Scholarship',
    summary: 'Annual GPA and percentage requirements to maintain scholarship categories.',
    details: [
      'Category A* (Dentistry & Pharmacy): Requires 97% annual average on Egyptian scale.',
      'Category A* (All Other Faculties): Requires 97% Egyptian scale OR 77% British scale.',
      'Category A (Dentistry & Pharmacy): Requires 95% annual average on Egyptian scale.',
      'Category A (All Other Faculties): Requires 95% Egyptian scale OR 70% British scale.',
      'Category B (Dentistry & Pharmacy): Requires 90% annual average on Egyptian scale.',
      'Category B (All Other Faculties): Requires 90% Egyptian scale OR 60% British scale.',
      'Students who do not meet these requirements will be moved to a lower category or lose scholarship eligibility.',
    ],
    lastUpdated: '2025-02-05',
    version: '1.0',
  },
  {
    id: 'scholarship-sports',
    title: 'Sports Achievement Scholarship Rules',
    category: 'Scholarship',
    summary: 'Rules and eligibility criteria for sports-based scholarships.',
    details: [
      'Non-Olympic Sports (e.g., sliding games, skydiving, dodgeball) are not eligible for university participation advantages as the Egyptian Sports Federation for Universities does not arrange competitions for them.',
      'Sports International Level includes: World, African, Mediterranean, Arab-African, and International University Championships.',
      'Sports National Level includes: Egyptian Arab Republic Championships.',
      'Sports Governorate Level includes: Universities, Sectors, and Governorate tournaments.',
      'Students must continue participating in University Federation tournaments to maintain the sports discount.',
      'New applicants must have achieved sports success in their last study year of high school.',
      'International Levels discount: 80% (1st rank) / 60% (2nd rank) / 40% (3rd rank).',
      'National Levels discount: 40% (1st rank) / 30% (2nd rank) / 20% (3rd rank).',
      'Egyptian Levels discount: 30% (1st rank) / 20% (2nd rank) / 10% (3rd rank).',
    ],
    lastUpdated: '2025-02-05',
    version: '1.0',
  },
  {
    id: 'certificate-classification',
    title: 'Certificate Classification for Scholarships',
    category: 'Scholarship',
    summary: 'How different high school certificates are classified for scholarship eligibility.',
    details: [
      'French Baccalaureate, IB, Canadian Diploma, German Abitur, Nile Schools, and all other international certificates are classified in the same categories as IGCSE.',
      'Al Azhar, STEM certificates, and Health Technical Institutes are classified as Egyptian Thanwya Amma.',
      'Certificate classification determines which scholarship threshold table applies to the student.',
    ],
    lastUpdated: '2025-02-05',
    version: '1.0',
  },
  {
    id: 'refund-tuition',
    title: 'Tuition Fee Refund Policy',
    category: 'Refund',
    summary: 'Official refund terms as per CPNU Decree dated 14th February 2023.',
    details: [
      'Application fees are non-refundable under any circumstances.',
      'Before the 1st day of Academic Year: Deduction of 10% of the downpayment amount.',
      'Till the end of the 1st month: Deduction of 50% of the 1st installment.',
      'After the end of 1st month: Deduction of 100% of the 1st installment.',
      'Before 21st December 2025: Deduction of 1st installment + 50% of 2nd installment.',
      '1st January 2026 to 28th February 2026: No refund for 1st & 2nd installments.',
      '1st March 2026 onwards: No refund for total annual tuition fee.',
      'Military/Police college applicants: 50% deduction of paid amount (proof required).',
    ],
    importantDates: [
      { event: 'Full Refund Deadline', date: 'Before Academic Year Start', notes: '10% deduction only' },
      { event: 'Partial Refund Deadline', date: '21st December 2025', notes: '1st + 50% of 2nd installment' },
      { event: 'No Refund Date', date: '1st March 2026', notes: 'Full annual fee retained' },
    ],
    lastUpdated: '2025-02-05',
    version: '1.0',
  },
  {
    id: 'refund-accommodation',
    title: 'Accommodation & Transportation Refund',
    category: 'Refund',
    summary: 'Refund rules for dormitory and bus services.',
    details: [
      'Egyptian Students Accommodation: Deduction of EGP 10,000 till 2nd teaching week.',
      'Egyptian Students Transportation: Deduction of EGP 5,000 till 2nd teaching week.',
      'International Students Accommodation: Deduction of £400 GBP till 2nd teaching week.',
      'International Students Transportation: Deduction of EGP 5,000 till 2nd teaching week.',
      'No refund is allowed after the 2nd teaching week for both accommodation and transportation.',
    ],
    lastUpdated: '2025-02-05',
    version: '1.0',
  },
  {
    id: 'installment-schedule',
    title: 'Installment Payment Schedule',
    category: 'Installment',
    summary: 'Official payment schedule for tuition fees in installments.',
    details: [
      '1st Installment: 40% of total fees - Due at Acceptance Date.',
      '2nd Installment: 30% of total fees - Due before 30th November 2025.',
      '3rd Installment: 30% of total fees - Due before 28th February 2026.',
      'All payment deadlines are strict and subject to late payment penalties.',
    ],
    importantDates: [
      { event: '1st Installment (40%)', date: 'Acceptance Date' },
      { event: '2nd Installment (30%)', date: '30th November 2025' },
      { event: '3rd Installment (30%)', date: '28th February 2026' },
    ],
    lastUpdated: '2025-02-05',
    version: '1.0',
  },
  {
    id: 'late-payment',
    title: 'Late Payment Penalty Policy',
    category: 'Installment',
    summary: 'Penalties applied for late tuition fee payments.',
    details: [
      'Late payment penalty is applied after the installment\'s due date.',
      'Penalty rate: 2% per month on outstanding balance.',
      'Penalties are calculated from the day after the due date.',
      'Students with outstanding balances may have registration holds placed on their accounts.',
    ],
    lastUpdated: '2025-02-05',
    version: '1.0',
  },
  {
    id: 'registration',
    title: 'Registration Policy',
    category: 'Academic',
    summary: 'Guidelines for course registration, add/drop periods, and enrollment procedures.',
    details: [
      'Students must complete registration before the semester deadline',
      'Course load: 12-18 credit hours per semester (undergraduate)',
      'Overload requests (19+ credits) require minimum 3.0 GPA and advisor approval',
      'Add/Drop period: First 2 weeks of semester without penalty',
      'Late registration incurs EGP 2,000 fee after deadline',
      'Students must clear all financial holds before registration',
    ],
    importantDates: [
      { event: 'Fall Registration Opens', date: 'July 1', notes: 'Continuing students' },
      { event: 'Fall Registration Deadline', date: 'August 15' },
      { event: 'Spring Registration Opens', date: 'December 1' },
      { event: 'Spring Registration Deadline', date: 'January 10' },
    ],
    lastUpdated: '2025-01-20',
    version: '3.2',
  },
  {
    id: 'deferral',
    title: 'Admission Deferral Policy',
    category: 'Administrative',
    summary: 'Procedures for deferring admission to a future semester.',
    details: [
      'Admitted students may defer admission for up to 1 academic year',
      'Deferral request must be submitted within 30 days of offer',
      'Non-refundable deferral fee: EGP 10,000',
      'Scholarship offers are not guaranteed upon deferral',
      'Maximum one deferral allowed per student',
      'Deferred students must confirm enrollment 60 days before intended start',
    ],
    lastUpdated: '2025-01-15',
    version: '2.0',
  },
  {
    id: 'withdrawal',
    title: 'Withdrawal & Leave Policy',
    category: 'Academic',
    summary: 'Guidelines for temporary leave and permanent withdrawal from programs.',
    details: [
      'Temporary leave: Up to 2 semesters with approved petition',
      'Medical leave requires documentation from licensed physician',
      'Military service leave granted automatically with documentation',
      'Withdrawal before midterms: "W" grade recorded',
      'Withdrawal after midterms: "WF" grade (calculated as F in GPA)',
      'Complete withdrawal from university requires clearance from all departments',
    ],
    lastUpdated: '2025-01-18',
    version: '2.5',
  },
  {
    id: 'payment',
    title: 'Payment & Financial Policy',
    category: 'Financial',
    summary: 'Tuition payment schedules, methods, and financial obligations.',
    details: [
      'Tuition due in 4 installments per semester',
      'Accepted payment methods: Bank transfer, Credit card (3% surcharge), Cash at bursar',
      'Late payment fee: 1.5% per month on outstanding balance',
      'Financial holds prevent registration, transcript release, and graduation',
      'Payment plans available for documented financial hardship',
      'All fees quoted in EGP; international students may pay in USD at posted rate',
    ],
    importantDates: [
      { event: '1st Installment (40%)', date: 'Upon Registration' },
      { event: '2nd Installment (25%)', date: 'October 15 / March 1' },
      { event: '3rd Installment (20%)', date: 'December 15 / April 15' },
      { event: '4th Installment (15%)', date: 'February 15 / May 30' },
    ],
    lastUpdated: '2025-01-20',
    version: '3.0',
  },
  {
    id: 'scholarship',
    title: 'Scholarship Maintenance Policy',
    category: 'Financial',
    summary: 'Requirements for maintaining scholarship eligibility.',
    details: [
      'Academic scholarships require minimum 3.0 GPA each semester',
      'Athletic scholarships require active team participation',
      'GPA review conducted after each semester',
      'One probation semester allowed before scholarship suspension',
      'Reinstated after achieving required GPA for one semester',
      'Scholarships not applicable to summer courses',
    ],
    lastUpdated: '2025-01-12',
    version: '2.3',
  },
  {
    id: 'transfer',
    title: 'Credit Transfer Policy',
    category: 'Academic',
    summary: 'Guidelines for transferring credits from other institutions.',
    details: [
      'Maximum 30% of program credits may be transferred',
      'Transfer credits must be from accredited institutions',
      'Minimum grade B required for credit transfer',
      'Course syllabi required for evaluation',
      'Transfer evaluation takes 2-4 weeks',
      'Credits older than 5 years subject to additional review',
    ],
    lastUpdated: '2025-01-10',
    version: '2.1',
  },
  {
    id: 'attendance',
    title: 'Attendance Policy',
    category: 'Academic',
    summary: 'Class attendance requirements and consequences.',
    details: [
      'Maximum absence: 25% of total class sessions',
      'Exceeding limit results in automatic "FA" (Fail due to Absence)',
      'Medical absences require documentation within 1 week',
      'Attendance tracked via student ID card system',
      'Three late arrivals (15+ minutes) = one absence',
      'Participation may count toward final grade (professor discretion)',
    ],
    lastUpdated: '2025-01-08',
    version: '1.9',
  },
  {
    id: 'housing',
    title: 'On-Campus Housing Policy',
    category: 'Student Life',
    summary: 'Dormitory rules, regulations, and accommodation guidelines.',
    details: [
      'Housing applications open March 1 for following academic year',
      'Priority given to international students and distance residents (100+ km)',
      'Room assignments based on application date and availability',
      'Quiet hours: 10 PM - 8 AM daily',
      'Guests must register at reception; overnight guests not permitted',
      'Meal plans optional but recommended for residents',
    ],
    importantDates: [
      { event: 'Housing Application Opens', date: 'March 1' },
      { event: 'Application Deadline', date: 'May 31' },
      { event: 'Room Assignments Released', date: 'July 15' },
    ],
    lastUpdated: '2025-01-05',
    version: '2.0',
  },
];

export const getPolicyById = (id: string): Policy | undefined => {
  return policies.find(p => p.id === id);
};

export const getPoliciesByCategory = (category: Policy['category']): Policy[] => {
  return policies.filter(p => p.category === category);
};

export const searchPolicies = (query: string): Policy[] => {
  const lowerQuery = query.toLowerCase();
  return policies.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.summary.toLowerCase().includes(lowerQuery) ||
    p.details.some(d => d.toLowerCase().includes(lowerQuery))
  );
};
