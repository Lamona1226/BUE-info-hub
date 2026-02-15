import { Award, BookOpen, Cpu, HeartPulse, Languages, Network } from 'lucide-react';
import {
  egyptianTuitionFees,
  internationalTuitionFees,
  scholarshipMaintenance,
  scholarshipNotes,
  scholarshipThresholds,
} from '@/data/fees';

export type StudentType = 'egyptian' | 'international';
export type FacultyGroupId = 'Technology' | 'Social Sciences' | 'Languages' | 'Health';

export interface FacultyGroupMeta {
  id: FacultyGroupId;
  title: string;
  description: string;
  icon: typeof Cpu;
}

export const facultyGroups: FacultyGroupMeta[] = [
  {
    id: 'Technology',
    title: 'Technology',
    description: 'Engineering, computing, and design programs.',
    icon: Cpu,
  },
  {
    id: 'Social Sciences',
    title: 'Social Sciences',
    description: 'Business, law, economics, and communications.',
    icon: Network,
  },
  {
    id: 'Languages',
    title: 'Languages',
    description: 'Language, literature, and cultural studies.',
    icon: Languages,
  },
  {
    id: 'Health',
    title: 'Health',
    description: 'Clinical and allied health programs.',
    icon: HeartPulse,
  },
];

export const feesModuleNavTabs = [
  { label: 'Fees', path: '/fees' },
  { label: 'Accommodation', path: '/fees/accommodation' },
  { label: 'Transportation', path: '/fees/transportation' },
  { label: 'Policies', path: '/policies/all' },
  { label: 'Refund Policy', path: '/policies/refund' },
  { label: 'Scholarship Policy', path: '/policies/scholarship' },
  { label: 'Contacts', path: '/contacts' },
];

export const tuitionTableColumns = [
  { id: 'faculty', label: 'Faculty / Program', sortable: true, filterable: true },
  { id: 'baseTuition', label: 'Base Tuition', sortable: true, filterable: false },
  { id: 'categoryB', label: 'Category B Fee', sortable: true, filterable: false },
  { id: 'categoryA', label: 'Category A Fee', sortable: true, filterable: false },
  { id: 'categoryAStar', label: 'Category A* Fee', sortable: true, filterable: false },
  { id: 'scoreIgcse', label: 'Required Score — IGCSE', sortable: true, filterable: true },
  { id: 'scoreAmerican', label: 'Required Score — American', sortable: true, filterable: true },
  { id: 'scoreThanaweya', label: 'Required Score — Thanaweya Amma', sortable: true, filterable: true },
  { id: 'scoreOther', label: 'Required Score — Other Certificates', sortable: true, filterable: true },
];

export const certificateTooltips = {
  igcse: 'Includes IGCSE and international certificates mapped to IGCSE bands.',
  american: 'American Diploma percentage thresholds.',
  thanaweya: 'Egyptian Thanaweya Amma equivalent thresholds.',
  other: 'Arab certificates and other listed equivalents.',
};

export const scholarshipCategoryStyles = {
  C: {
    badge: 'bg-muted text-foreground',
    cell: 'bg-muted/30',
  },
  B: {
    badge: 'bg-orange-500/15 text-orange-700 border border-orange-200',
    cell: 'bg-orange-50/70',
  },
  A: {
    badge: 'bg-blue-500/15 text-blue-700 border border-blue-200',
    cell: 'bg-blue-50/70',
  },
  AStar: {
    badge: 'bg-emerald-500/15 text-emerald-700 border border-emerald-200',
    cell: 'bg-emerald-50/70',
  },
};

export const feeToggleLabels = {
  original: 'Show Original Fees',
  discounted: 'Show Discounted Fees',
};

export const feeCellLabels = {
  base: 'Category C',
  categoryB: 'Category B',
  categoryA: 'Category A',
  categoryAStar: 'Category A*',
};

export const tuitionFilterPlaceholders = {
  faculty: 'Filter faculty/program...',
  igcse: 'Filter IGCSE...',
  american: 'Filter American...',
  thanaweya: 'Filter Thanaweya Amma...',
  other: 'Filter Other...',
};

export interface TuitionRow {
  id: string;
  faculty: string;
  program?: string;
  group: FacultyGroupId;
  baseTuition: number;
  discounts: {
    B: string;
    A: string;
    AStar: string;
  };
  thresholds: {
    igcse: string;
    american: string;
    thanaweya: string;
    other: string;
  };
  exceptions: string[];
  scholarshipRules: string[];
  renewalRequirements: string[];
}

const normalize = (value: string) => value.toLowerCase().trim();

const findThresholdForFaculty = (faculty: string) => {
  return scholarshipThresholds.find((threshold) =>
    threshold.faculties.some(
      (listed) =>
        normalize(listed).includes(normalize(faculty)) ||
        normalize(faculty).includes(normalize(listed))
    )
  );
};

const standardDiscounts = {
  B: '15%',
  A: '30%',
  AStar: '40%',
};

const exceptionNotes = [
  {
    match: ['Dentistry'],
    note: 'Dentistry exception: B=10%, A=15%, A*=20%.',
  },
  {
    match: ['English Language and Literature'],
    note: 'English exception: B=30%, A=40%, A*=50%.',
  },
];

const getExceptionNotes = (faculty: string, discounts: { B: string; A: string; AStar: string }) => {
  const hasException =
    discounts.B !== standardDiscounts.B ||
    discounts.A !== standardDiscounts.A ||
    discounts.AStar !== standardDiscounts.AStar;

  if (!hasException) {
    return [];
  }

  return exceptionNotes
    .filter((entry) => entry.match.some((match) => normalize(faculty).includes(normalize(match))))
    .map((entry) => entry.note);
};

const getRenewalRequirements = (faculty: string) => {
  const isClinicalGroup =
    normalize(faculty).includes('dentistry') || normalize(faculty).includes('pharmacy');

  return scholarshipMaintenance
    .filter((item) =>
      isClinicalGroup
        ? item.faculty.includes('Dentistry') || item.faculty.includes('Pharmacy')
        : item.faculty.includes('All Other Faculties')
    )
    .map(
      (item) =>
        `Category ${item.category} (${item.faculty}): Egyptian ${item.egyptianScale}, British ${item.britishScale}.`
    );
};

const buildTuitionRows = (studentType: StudentType): TuitionRow[] => {
  const fees = studentType === 'egyptian' ? egyptianTuitionFees : internationalTuitionFees;

  const formatThreshold = (label: string, value?: { B: string; A: string; AStar: string }) => {
    if (!value) {
      return '—';
    }

    return `${label} B:${value.B} / A:${value.A} / A*:${value.AStar}`;
  };

  return fees.map((fee) => {
    const threshold = findThresholdForFaculty(fee.faculty);
    const discounts = {
      B: threshold?.discountB || standardDiscounts.B,
      A: threshold?.discountA || standardDiscounts.A,
      AStar: threshold?.discountAStar || standardDiscounts.AStar,
    };

    return {
      id: `${studentType}-${normalize(fee.faculty)}-${fee.program || 'general'}`,
      faculty: fee.faculty,
      program: fee.program,
      group: fee.category,
      baseTuition: fee.categoryC,
      discounts,
      thresholds: {
        igcse: formatThreshold('IGCSE', threshold?.certificates.igcse),
        american: formatThreshold('American', threshold?.certificates.american),
        thanaweya: formatThreshold('Thanaweya', threshold?.certificates.thanwya),
        other: formatThreshold('Other', threshold?.certificates.arab),
      },
      exceptions: getExceptionNotes(fee.faculty, discounts),
      scholarshipRules: scholarshipNotes.general,
      renewalRequirements: getRenewalRequirements(fee.faculty),
    };
  });
};

export const tuitionDataByStudentType: Record<StudentType, TuitionRow[]> = {
  egyptian: buildTuitionRows('egyptian'),
  international: buildTuitionRows('international'),
};

export const tuitionTableCopy = {
  searchPlaceholder: 'Search faculty, fees, or thresholds...',
  filtersTitle: 'Column filters',
  detailsTitle: 'Details',
  scholarshipRulesTitle: 'Scholarship rules',
  exceptionTitle: 'Faculty exceptions',
  renewalTitle: 'Renewal requirements',
  emptyState: 'No results match the selected filters.',
  viewDetails: 'View details',
  hideDetails: 'Hide details',
};

export const scholarshipSectionCopy = {
  title: 'Scholarship categories',
  icon: Award,
  categories: [
    { id: 'C', label: 'Category C', discount: '0% OFF' },
    { id: 'B', label: 'Category B', discount: '15% OFF' },
    { id: 'A', label: 'Category A', discount: '30% OFF' },
    { id: 'AStar', label: 'Category A*', discount: '40% OFF' },
  ],
};

export const tuitionModuleCopy = {
  headers: {
    egyptian: {
      title: 'Egyptian Students Tuition Fees',
      description: 'Scholarship-aware tuition tables with thresholds by certificate.',
    },
    international: {
      title: 'International Students Tuition Fees',
      description: 'Scholarship-aware tuition tables with thresholds by certificate.',
    },
  },
};
