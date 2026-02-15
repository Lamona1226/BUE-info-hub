export interface FacultyRequirement {
  facultyGroup: string;
  faculties: string[];
  section: string;
  requirements: string[];
  notes?: string;
}

export interface AdmissionRequirement {
  id: string;
  curriculum: string;
  studentType: 'Egyptian' | 'International' | 'Both';
  generalRequirements: string[];
  facultyRequirements: FacultyRequirement[];
  importantNotes: string[];
  requiredDocuments: string[];
  approvedSubjects?: string[];
  minimumScores?: { [key: string]: string };
  lastUpdated: string;
  version: string;
}

export const generalEligibilityNotes: string[] = [
  'Hold the Egyptian General Secondary School Certificate (Thanaweya Amma) OR its equivalent (Arab and international high school certificates).',
  'Admission to BUE is highly competitive — priority is given to early bird applicants.',
  'Minimum score of entry is subject to be decided by the Egyptian Ministry of Higher Education for each academic year.',
  'Specific entry requirements are outlined by type of high school certificate.',
];

export const admissionRequirements: AdmissionRequirement[] = [
  {
    id: 'thanaweya-amma',
    curriculum: 'Egyptian Thanaweya Amma',
    studentType: 'Egyptian',
    generalRequirements: [
      'Hold the Egyptian General Secondary School Certificate (Thanaweya Amma)',
      'Meet minimum score requirements set by the Egyptian Ministry of Higher Education',
    ],
    facultyRequirements: [
      {
        facultyGroup: 'Medical & Health Sciences',
        faculties: ['Dentistry', 'Pharmacy', 'Physiotherapy', 'Nursing'],
        section: 'Science Section',
        requirements: ['Science Section: Thanaweya Amma'],
      },
      {
        facultyGroup: 'Engineering',
        faculties: ['Engineering', 'Energy & Environmental Engineering'],
        section: 'Mathematics Section',
        requirements: ['Mathematics Section: Thanaweya Amma'],
      },
      {
        facultyGroup: 'Informatics & Computer Science',
        faculties: ['Informatics & Computer Science'],
        section: 'Mathematics or Science Section',
        requirements: ['Mathematics or Science Section: Thanaweya Amma'],
        notes: 'Science section accepted subject to successful completion of Advanced Mathematics in the first year at the university.',
      },
      {
        facultyGroup: 'Arts & Social Sciences',
        faculties: ['Business Administration', 'Communication & Mass Media', 'Economics', 'Political Science', 'Arts & Design (except Interior)', 'Arts & Humanities', 'Law'],
        section: 'All Sections',
        requirements: ['Arts — Mathematics or Science Section: Thanaweya Amma (All sections can apply)'],
        notes: 'The Interior Architectural Programme (Arts & Design) requires Math or Science Section only.',
      },
    ],
    importantNotes: [
      'The Interior Architectural Programme (Arts & Design) requires Math or Science Section only.',
      'The Faculty of Informatics and Computer Science accepts students from the Science section subject to successful completion of Advanced Mathematics in the first year at the university.',
    ],
    requiredDocuments: [
      'The original Egyptian Thanaweya Amma certificate or Authenticated Statement of Results.',
      'The original birth certificate.',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'igcse-gcse',
    curriculum: 'IGCSE / GCSE (O-Level)',
    studentType: 'Egyptian',
    generalRequirements: [
      'Minimum grade required in IGCSE/GCSE (O.level) subjects is C or 4.',
      'Minimum grade required in AS/ASL is D.',
      'Applicants with 11 years of schooling are eligible provided they meet the specified entry requirements.',
    ],
    facultyRequirements: [
      {
        facultyGroup: 'Medical & Health Sciences',
        faculties: ['Dentistry', 'Pharmacy', 'Physiotherapy', 'Nursing'],
        section: 'Science Section',
        requirements: [
          'English',
          'Mathematics (or any branch of Mathematics)',
          'Biology',
          'Chemistry',
          'Physics',
          'Any other 3 approved subjects',
        ],
      },
      {
        facultyGroup: 'Engineering & Technology',
        faculties: ['Engineering', 'Energy & Environmental Engineering', 'Informatics & Computer Science'],
        section: 'Mathematics Section',
        requirements: [
          'English',
          'Mathematics',
          'Chemistry',
          'Physics',
          'Any other 4 approved subjects',
          'AS/ASL Mathematics (additional requirement)',
        ],
      },
      {
        facultyGroup: 'Arts & Social Sciences',
        faculties: ['Business Administration', 'Communication & Mass Media', 'Economics', 'Political Science', 'Arts & Design (except Interior)', 'Arts & Humanities', 'Law'],
        section: 'Arts — Mathematics or Science Section',
        requirements: [
          'English',
          'Any other 7 approved subjects',
        ],
      },
    ],
    importantNotes: [
      'Minimum grade required in IGCSE/GCSE (O.level) subjects is C or 4.',
      'Minimum grade required in AS/ASL is D.',
      'The Interior Architectural programme (Faculty of Arts & Design) requires Mathematics or Science Section only.',
      'The Faculty of Informatics and Computer Science accepts Science section applicants subject to successful completion of Advanced Mathematics in the first year at the university.',
      'The English or Chinese programmes in the Faculty of Arts & Humanities require IGCSE/GCSE (O.level) second foreign language (e.g., French, German, Spanish).',
      'Applicants with 11 years of schooling are eligible provided they meet the specified entry requirements.',
    ],
    approvedSubjects: [
      'Accounting', 'Business Studies', 'Computer Studies', 'Information & Computer Technology', 'Economics',
      'French/German/Spanish', 'Geography', 'Global Studies', 'History', 'Logic/Philosophy',
      'Psychology', 'Sociology', 'Social Studies', 'Statistics', 'US Government',
    ],
    requiredDocuments: [
      'All original IGCSE/GCSE statements of results or certificates: authenticated by the British Council in Egypt (True Document - Golden Stamp) and the Egyptian Ministry of Foreign Affairs.',
      'If IGCSE/GCSE was completed in Egypt, documents must also be stamped by the General Department of Examinations.',
      'Academic Sequence of 12 or 11 Years of Schooling: must be authenticated by relevant authorities; if completed abroad, also bear stamp of the Egyptian Ministry of Foreign Affairs.',
      'Supplementary National Exams: proof of successful completion of Arabic and Religion exams (for Egyptian and Arab students only).',
      'The original birth certificate.',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'american-diploma',
    curriculum: 'American High School Diploma',
    studentType: 'Both',
    generalRequirements: [
      'EST1 / ACT1 / SAT1 required',
      '8 different subjects with a minimum of 1 credit hour each',
      'Minimum score of SAT1 / EST1 required to apply: 800 (or ACT1 14)',
      'Minimum score of EST2 required to be considered: 900',
    ],
    facultyRequirements: [
      {
        facultyGroup: 'Medical & Health Sciences',
        faculties: ['Dentistry', 'Pharmacy', 'Physiotherapy', 'Nursing'],
        section: 'Science Section',
        requirements: [
          'EST1 / ACT1 / SAT1',
          '8 different subjects with minimum 1 credit hour each',
          'English',
          'Mathematics (or any branch)',
          'Biology',
          'Chemistry',
          'Physics',
          'Any other 3 approved subjects',
        ],
        notes: 'Faculty of Dentistry requires successful completion of ACT2 / EST2, with Biology and one subject of (Mathematics - Chemistry or Physics).',
      },
      {
        facultyGroup: 'Engineering & Technology',
        faculties: ['Engineering', 'Energy & Environmental Engineering', 'Informatics & Computer Science'],
        section: 'Mathematics Section',
        requirements: [
          'EST1 / ACT1 / SAT1',
          'EST2 / ACT2',
          '8 different subjects with minimum 1 credit hour each',
          'English',
          'Mathematics',
          'Chemistry',
          'Physics',
          'Any other 4 approved subjects',
        ],
        notes: 'Requires ACT2/EST2 with Mathematics and one subject of (Biology - Chemistry or Physics). Alternatively, applicants may apply with a high school transcript clarifying at least 9 subjects, including Advanced Mathematics.',
      },
      {
        facultyGroup: 'Arts & Social Sciences',
        faculties: ['Business Administration', 'Communication & Mass Media', 'Economics', 'Political Science', 'Arts & Design (except Interior)', 'Arts & Humanities', 'Law'],
        section: 'Arts — Mathematics or Science Section',
        requirements: [
          'EST1 / ACT1 / SAT1',
          '8 different subjects (≥1 credit hour each)',
          'English',
          'Any other 7 approved subjects',
        ],
      },
    ],
    importantNotes: [
      'Minimum score of SAT1 / EST1 required to apply: 800 (or ACT1 14).',
      'Minimum score of EST2 required to be considered: 900.',
      'Faculty of Dentistry requires successful completion of ACT2 / EST2, with Biology and one subject of (Mathematics - Chemistry or Physics).',
      'Faculties of Engineering / Energy Engineering / Computer Science require ACT2/EST2, with Mathematics and one subject of (Biology - Chemistry or Physics).',
      'Alternatively, applicants may apply with a high school transcript clarifying at least 9 subjects, including Advanced Mathematics.',
      'Faculty of Informatics & Computer Science: Science section accepted subject to successful completion of Advanced Mathematics in the first year.',
      'Faculty of Art & Design (Interior Architecture): Either Mathematics section with ACT2/EST2 (Mathematics + one of Biology/Chemistry/Physics), OR transcript with 9 subjects including Advanced Mathematics; OR Science section with transcript including English, Mathematics, Biology, Chemistry, Physics.',
      'Faculty of Arts & Humanities (English or Chinese Dept.) requires successful completion of a second foreign language (e.g., French, German, Spanish) in the high school transcript (GPA).',
    ],
    minimumScores: {
      'SAT1 / EST1': '800',
      'ACT1': '14',
      'EST2': '900',
    },
    requiredDocuments: [
      'ACT1 / EST1: stamped by the concerned department at the Egyptian Ministry of Education.',
      'SAT1: stamped by AMIDEAST in Cairo and the Egyptian Ministry of Foreign Affairs.',
      'High School Transcript (GPA): stamped by the General Department of Examinations at the Ministry of Education. If issued outside Egypt, stamp by relevant authorities and authenticated by the Egyptian Ministry of Foreign Affairs.',
      'School Accreditation Letter (for high school outside Egypt): issued by AMIDEAST in Cairo and authenticated by the Egyptian Ministry of Foreign Affairs.',
      'Academic Sequence of 12 Years of Schooling: stamped by the relevant education department; if abroad, stamped by appropriate authorities and authenticated by the Egyptian Ministry of Foreign Affairs.',
      'Statement from the Private Education Department: for high school education in Egypt.',
      'Supplementary National Exams: proof of successful completion of Arabic and Religion exams (for Egyptian and Arab students only).',
      'Certificate of birth.',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'canadian-diploma',
    curriculum: 'Canadian High School Diploma',
    studentType: 'Both',
    generalRequirements: [
      '8-9 different subjects with minimum 1 credit hour each',
      'A maximum of 3 subjects passed in Grade 11 and the remaining passed in Grade 12',
    ],
    facultyRequirements: [
      {
        facultyGroup: 'Medical & Health Sciences',
        faculties: ['Dentistry', 'Pharmacy', 'Physiotherapy', 'Nursing'],
        section: 'Science Section',
        requirements: [
          '8 different subjects (≥1 credit hour each)',
          'English',
          'Mathematics (or branch)',
          'Biology',
          'Chemistry',
          'Physics',
          'Any other 3 approved subjects',
          'Maximum 3 subjects from Grade 11, remaining from Grade 12',
        ],
      },
      {
        facultyGroup: 'Engineering & Technology',
        faculties: ['Engineering', 'Energy & Environmental Engineering', 'Informatics & Computer Science'],
        section: 'Mathematics Section',
        requirements: [
          '9 different subjects (≥1 credit hour each)',
          'English',
          'Mathematics',
          'Advanced Mathematics',
          'Chemistry',
          'Physics',
          'Any other 4 approved subjects',
          'Maximum 3 subjects from Grade 11, remaining from Grade 12',
        ],
      },
      {
        facultyGroup: 'Arts & Social Sciences',
        faculties: ['Business Administration', 'Communication & Mass Media', 'Economics', 'Political Science', 'Arts & Design (except Interior)', 'Arts & Humanities', 'Law'],
        section: 'Arts — Mathematics or Science Section',
        requirements: [
          '8 different subjects (≥1 credit hour each)',
          'English',
          'Any other 7 approved subjects',
        ],
      },
    ],
    importantNotes: [
      'Faculty of Informatics & Computer Science: Science section accepted subject to successful completion of Advanced Mathematics in the first year.',
      'Faculty of Art & Design (Interior Architecture): Either Mathematics section with at least 9 subjects including Advanced Mathematics; OR Science section with transcript including English, Mathematics, Biology, Chemistry, Physics.',
      'Faculty of Arts & Humanities (English or Chinese Dept.) requires successful completion of a second foreign language (e.g., French / German / Spanish).',
    ],
    requiredDocuments: [
      'High School Transcript (GPA): stamped by the General Department of Examinations at the Egyptian Ministry of Education. If issued outside Egypt, stamp by relevant authorities and authenticated by the Egyptian Ministry of Foreign Affairs.',
      'Academic Sequence of 12 Years of Schooling: stamped by relevant education department; if abroad, appropriate authorities + authentication by Egyptian Ministry of Foreign Affairs.',
      'Supplementary National Exams: proof of successful completion of Arabic and Religion exams (for Egyptian and Arab students only).',
      'Certificate of birth.',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'french-baccalaureate',
    curriculum: 'French Baccalaureate',
    studentType: 'Both',
    generalRequirements: [
      '7 different subjects required',
      'Minimum points required to apply: 10',
    ],
    facultyRequirements: [
      {
        facultyGroup: 'Medical & Health Sciences',
        faculties: ['Dentistry', 'Pharmacy', 'Physiotherapy', 'Nursing'],
        section: 'Science Section',
        requirements: [
          '7 different subjects including:',
          'English',
          'Mathematics',
          'Biology (must be passed in basic/mandatory subjects)',
          'Chemistry',
          'Physics',
          'Any other 2 approved subjects',
        ],
      },
      {
        facultyGroup: 'Engineering & Technology',
        faculties: ['Engineering', 'Energy & Environmental Engineering', 'Informatics & Computer Science'],
        section: 'Mathematics Section',
        requirements: [
          '7 different subjects including:',
          'English',
          'Mathematics (must be passed in basic/mandatory subjects)',
          'Chemistry',
          'Physics',
          'Any other 3 approved subjects',
        ],
      },
      {
        facultyGroup: 'Arts & Social Sciences',
        faculties: ['Business Administration', 'Communication & Mass Media', 'Economics', 'Political Science', 'Arts & Design (except Interior)', 'Arts & Humanities', 'Law'],
        section: 'Arts — Mathematics or Science Section',
        requirements: [
          '7 different subjects including:',
          'English',
          'Any other 6 approved subjects',
        ],
      },
    ],
    importantNotes: [
      'Minimum points required to apply: 10.',
      'Interior Architectural programme (Faculty of Arts & Design) requires Mathematics or Science Section only.',
      'Faculty of Informatics and Computer Science: Science section accepted subject to successful completion of Advanced Mathematics in the first year.',
      'English or Chinese programmes (Faculty of Arts & Humanities) require a second foreign language (e.g., French / German / Spanish).',
    ],
    minimumScores: {
      'Minimum Points': '10',
    },
    requiredDocuments: [
      'Copy of High School Transcript: stamped by the General Department of Examinations at the Ministry of Education and the French Embassy in Egypt; authenticated by the Egyptian Ministry of Foreign Affairs.',
      'If issued by a school outside Egypt, stamp by relevant authorities and authentication by the Egyptian Ministry of Foreign Affairs.',
      'Academic Sequence of 12 Years of Schooling or French Brevet: stamped by relevant education department; if abroad, appropriate authorities + authentication by the Egyptian Ministry of Foreign Affairs.',
      'Supplementary National Exams: proof of successful completion of Arabic and Religion exams (for Egyptian and Arab students only).',
      'Certificate of birth.',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'german-abitur',
    curriculum: 'German Abitur',
    studentType: 'Both',
    generalRequirements: [
      '7 different subjects in Abitur transcript',
      'Minimum points required to apply: 1 for each subject',
      'If one compulsory subject is missing, it can be considered from Grade 10',
    ],
    facultyRequirements: [
      {
        facultyGroup: 'Medical & Health Sciences',
        faculties: ['Dentistry', 'Pharmacy', 'Physiotherapy', 'Nursing'],
        section: 'Science Section',
        requirements: [
          '7 different subjects in Abitur transcript including:',
          'English',
          'Mathematics',
          'Biology',
          'Chemistry',
          'Physics',
          'Any other 2 approved subjects',
        ],
      },
      {
        facultyGroup: 'Engineering & Technology',
        faculties: ['Engineering', 'Energy & Environmental Engineering', 'Informatics & Computer Science'],
        section: 'Mathematics Section',
        requirements: [
          '7 different subjects in Abitur transcript including:',
          'English',
          'Mathematics',
          'Chemistry',
          'Physics',
          'Any other 3 approved subjects',
        ],
      },
      {
        facultyGroup: 'Arts & Social Sciences',
        faculties: ['Business Administration', 'Communication & Mass Media', 'Economics', 'Political Science', 'Arts & Design (except Interior)', 'Arts & Humanities', 'Law'],
        section: 'Arts — Mathematics or Science Section',
        requirements: [
          '7 different subjects in Abitur including:',
          'English',
          'Any other 6 approved subjects',
        ],
      },
    ],
    importantNotes: [
      'If one compulsory subject in the Abitur is missing, it can be considered from Grade 10.',
      'Minimum points required to apply: 1 for each subject.',
      'Interior Architectural programme (Faculty of Arts & Design) requires Mathematics or Science Section only.',
      'Faculty of Informatics and Computer Science: Science section accepted subject to successful completion of Advanced Mathematics in the first year.',
      'English or Chinese programmes (Faculty of Arts & Humanities) require a second foreign language (e.g., French / German / Spanish).',
    ],
    minimumScores: {
      'Per Subject': '1 point',
    },
    requiredDocuments: [
      'High School Transcript (Abitur): stamped by the General Department of Examinations at the Egyptian Ministry of Education and the German Embassy in Egypt; authenticated by the Egyptian Ministry of Foreign Affairs.',
      'If issued abroad, stamp by relevant authorities + authentication by Egyptian Ministry of Foreign Affairs.',
      'Academic Sequence of 12 Years of Schooling: stamped by relevant education department; if abroad, appropriate authorities + authentication by Egyptian Ministry of Foreign Affairs.',
      'Supplementary National Exams: proof of successful completion of Arabic and Religion exams (for Egyptian and Arab students only).',
      'Certificate of birth.',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'international-baccalaureate',
    curriculum: 'International Baccalaureate (IB)',
    studentType: 'Both',
    generalRequirements: [
      '6 different subjects: 3 Higher Level (HL) and 3 Standard Level (SL)',
      'Completion of Extended Essay and Theory of Knowledge (TOK) subjects',
      'Minimum total points to apply: 24',
    ],
    facultyRequirements: [
      {
        facultyGroup: 'Medical & Health Sciences',
        faculties: ['Dentistry', 'Pharmacy', 'Physiotherapy', 'Nursing'],
        section: 'Science Section',
        requirements: [
          '6 different subjects: 3 HL and 3 SL',
          'Must include English and Mathematics',
          'HL must include Biology and Chemistry',
        ],
      },
      {
        facultyGroup: 'Engineering & Technology',
        faculties: ['Engineering', 'Energy & Environmental Engineering', 'Informatics & Computer Science'],
        section: 'Mathematics Section',
        requirements: [
          '6 different subjects: 3 HL and 3 SL',
          'Must include English',
          'HL must include Mathematics and Physics',
        ],
      },
      {
        facultyGroup: 'Arts & Social Sciences',
        faculties: ['Business Administration', 'Communication & Mass Media', 'Economics', 'Political Science', 'Arts & Design (except Interior)', 'Arts & Humanities', 'Law'],
        section: 'Arts — Mathematics or Science Section',
        requirements: [
          '6 different subjects: 3 HL and 3 SL',
          'Must include English',
          'No specific HL subjects required',
        ],
      },
    ],
    importantNotes: [
      'Completion of Extended Essay and Theory of Knowledge (TOK) subjects required.',
      'Minimum total points to apply: 24.',
      'Interior Architectural programme (Faculty of Arts & Design) requires Mathematics or Science Section only.',
      'Faculty of Informatics and Computer Science: Science section accepted subject to successful completion of Advanced Mathematics in the first year.',
      'English or Chinese programmes (Faculty of Arts & Humanities) require a second foreign language (e.g., French / German / Spanish).',
    ],
    minimumScores: {
      'Total Points': '24',
    },
    requiredDocuments: [
      'Original Transcript and Diploma of International Baccalaureate: authenticated by the concerned department in Switzerland (Geneva) and the Swiss Ministry of Foreign Affairs as well as the Egyptian Embassy in Switzerland.',
      'Official academic sequence proving 12 years of pre-university study, issued and authenticated by the department in the country where schooling was completed and by the Egyptian Embassy in that country.',
      'Supplementary National Exams: proof of successful completion of Arabic and Religion exams (for Egyptian and Arab students only).',
      'Certificate of birth.',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
  {
    id: 'arab-azharian',
    curriculum: 'Arab & Azharian High School Certificate',
    studentType: 'Both',
    generalRequirements: [
      'The approved national high school certificate of the relevant country',
    ],
    facultyRequirements: [
      {
        facultyGroup: 'Science Faculties',
        faculties: ['Dentistry', 'Pharmacy', 'Physiotherapy', 'Nursing', 'Engineering', 'Energy & Environmental Engineering', 'Informatics & Computer Science'],
        section: 'Science Section',
        requirements: [
          'The approved national high school certificate of the relevant country',
        ],
      },
      {
        facultyGroup: 'Arts & Social Sciences',
        faculties: ['Business Administration', 'Communication & Mass Media', 'Economics', 'Political Science', 'Arts & Design (except Interior)', 'Arts & Humanities', 'Law'],
        section: 'Arts — Mathematics or Science Section',
        requirements: [
          'The approved national high school certificate of the relevant country',
        ],
      },
    ],
    importantNotes: [
      'Interior Architectural programme (Faculty of Arts & Design) requires Science Section only.',
    ],
    requiredDocuments: [
      'Original high school certificate: must be stamped by the Ministry of Education of the relevant country, authenticated by the Ministry of Foreign Affairs of that country, and verified by the Egyptian Embassy in that country.',
      'For Azharian High School certificate: the original Azharian Thanaweya certificate or Authenticated Statement of Results.',
      'Certificate of birth.',
    ],
    lastUpdated: '2025-02-02',
    version: '4.0',
  },
];

export const internationalApplicantNotes: string[] = [
  'All International students are requested to complete the British University in Egypt online application.',
  'International applicants need to apply through Study in Egypt Platform which is a mandatory step decided by the Egyptian Ministry of Higher Education.',
  'International applicants need to complete the necessary process of this platform in terms of payment & needed documents in order to get the final acceptance.',
];

export const getRequirementById = (id: string): AdmissionRequirement | undefined => {
  return admissionRequirements.find(r => r.id === id);
};

export const searchAdmissionRequirements = (query: string): AdmissionRequirement[] => {
  const lowerQuery = query.toLowerCase();
  return admissionRequirements.filter(r =>
    r.curriculum.toLowerCase().includes(lowerQuery) ||
    r.generalRequirements.some(req => req.toLowerCase().includes(lowerQuery)) ||
    r.facultyRequirements.some(fr => 
      fr.facultyGroup.toLowerCase().includes(lowerQuery) ||
      fr.faculties.some(f => f.toLowerCase().includes(lowerQuery)) ||
      fr.requirements.some(req => req.toLowerCase().includes(lowerQuery))
    )
  );
};
