export interface Faculty {
  id: string;
  name: string;
  degree: string;
  duration: string;
  dualDegreePartner?: string;
  programs: string[];
  category: 'Technology' | 'Social Sciences' | 'Languages' | 'Health';
  lastUpdated: string;
  version: string;
}

export const faculties: Faculty[] = [
  // Technology Faculties
  {
    id: 'engineering',
    name: 'Faculty of Engineering',
    degree: 'BSc (Hons)',
    duration: '4-Year',
    dualDegreePartner: 'LSBU',
    programs: [
      'Architectural Engineering',
      'Chemical Engineering',
      'Civil Engineering',
      'Construction Engineering & Management',
      'Computer Engineering',
      'Landscape & Urban Development for Sustainable Cities',
      'Mechatronics & Robotics',
      'Electrical Engineering & Communications',
      'Mechanical Engineering'
    ],
    category: 'Technology',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'art-design',
    name: 'Faculty of Art & Design',
    degree: 'BA (Hons)',
    duration: '4-Year',
    dualDegreePartner: 'MMU',
    programs: [
      'Game Design',
      'Illustration & Animation',
      'Interior Design',
      'Fashion Design',
      'Fine Arts & Mixed Media'
    ],
    category: 'Technology',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'energy-environmental',
    name: 'Faculty of Energy & Environmental Engineering',
    degree: 'BSc (Hons)',
    duration: '4-Year',
    dualDegreePartner: 'LSBU',
    programs: [
      'Mechanical Engineering (Power) - Renewable Energy',
      'Electrical Engineering (Power) - Renewable Energy',
      'Biochemical Engineering',
      'Petroleum Engineering & Gas Technology',
      'Architecture Engineering - Sustainable Building Design'
    ],
    category: 'Technology',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'informatics-cs',
    name: 'Faculty of Informatics & Computer Science',
    degree: 'BSc (Hons)',
    duration: '4-Year',
    dualDegreePartner: 'LSBU',
    programs: [
      'Artificial Intelligence',
      'Computer Science',
      'Software Engineering',
      'Information Systems',
      'Computer Networks & Cybersecurity'
    ],
    category: 'Technology',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  // Social Sciences Faculties
  {
    id: 'business',
    name: 'Faculty of Business Administration',
    degree: 'BSc (Hons) Business Administration',
    duration: '4-Year',
    dualDegreePartner: 'LSBU',
    programs: [
      'Accounting & Finance',
      'Human Resource Management',
      'Entrepreneurship & Sustainability',
      'Business Information Systems',
      'International Business',
      'Marketing'
    ],
    category: 'Social Sciences',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'economics',
    name: 'Faculty of Economics',
    degree: 'BSc (Hons) Economics',
    duration: '4-Year',
    dualDegreePartner: 'LSBU',
    programs: ['Economics'],
    category: 'Social Sciences',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'political-science',
    name: 'Faculty of Political Science',
    degree: 'BSc (Hons) Political Science',
    duration: '4-Year',
    dualDegreePartner: 'LSBU',
    programs: ['Political Science'],
    category: 'Social Sciences',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'communication',
    name: 'Faculty of Communication & Mass Media',
    degree: 'BSc (Hons)',
    duration: '4-Year',
    dualDegreePartner: 'LSBU',
    programs: [
      'Content Creation & Social Media',
      'Advertising & Brand Communication',
      'Public Relations & Digital Marketing',
      'Filmmaking & Media Narratives',
      'Creative Broadcast Production'
    ],
    category: 'Social Sciences',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'law',
    name: 'Faculty of Law',
    degree: 'BSc (Hons)',
    duration: '4-Year',
    dualDegreePartner: 'LSBU',
    programs: ['Law'],
    category: 'Social Sciences',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  // Languages Faculties
  {
    id: 'arts-humanities',
    name: 'Faculty of Arts & Humanities',
    degree: 'BA (Hons)',
    duration: '4-Year',
    dualDegreePartner: 'LSBU',
    programs: [
      'English Language & Literature',
      'Applied Linguistics & Translation',
      'Basic and Applied Psychology',
      'Chinese Language and Culture'
    ],
    category: 'Languages',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  // Health Faculties
  {
    id: 'dentistry',
    name: 'Faculty of Dentistry',
    degree: 'Bachelor of Oral, Dental Medicine and Surgery',
    duration: '5-Year + Internship',
    programs: ['Dental Medicine & Surgery'],
    category: 'Health',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'pharmacy',
    name: 'Faculty of Pharmacy',
    degree: 'Bachelor of Pharmacy',
    duration: '5-Year + Internship',
    programs: ['General PharmD', 'PharmD Clinical'],
    category: 'Health',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'nursing',
    name: 'Faculty of Nursing',
    degree: 'BSc (Hons)',
    duration: '4-Year + Internship',
    dualDegreePartner: 'QMU',
    programs: ['Nursing Program'],
    category: 'Health',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
  {
    id: 'physiotherapy',
    name: 'Faculty of Physiotherapy',
    degree: 'BSc (Hons)',
    duration: '5-Year + Internship',
    dualDegreePartner: 'MMU',
    programs: ['Physiotherapy'],
    category: 'Health',
    lastUpdated: '2025-02-04',
    version: '3.0',
  },
];

export const getFacultyById = (id: string): Faculty | undefined => {
  return faculties.find(f => f.id === id);
};

export const getFacultiesByCategory = (category: Faculty['category']): Faculty[] => {
  return faculties.filter(f => f.category === category);
};

export const searchFaculties = (query: string): Faculty[] => {
  const lowerQuery = query.toLowerCase();
  return faculties.filter(f => 
    f.name.toLowerCase().includes(lowerQuery) ||
    f.programs.some(p => p.toLowerCase().includes(lowerQuery)) ||
    f.degree.toLowerCase().includes(lowerQuery)
  );
};
