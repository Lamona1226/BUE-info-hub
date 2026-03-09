import { Award, Cpu, HeartPulse, Languages, Network } from 'lucide-react';
import {
  facultyFeeConfig2026,
  resolveFacultyConfig2026,
  scholarshipDiscountByTier2026,
  type ScholarshipThresholdBand2026,
} from '@/data/fees-2026';
import { internationalTuitionFees } from '@/data/fees';

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
  { label: 'Down Payment', path: '/fees/down-payment' },
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
  group: FacultyGroupId;
  tuitionFees: number;
  educationalSupportServices: number;
  administrative: number;
  categoryC: number;
  categoryB: number;
  categoryA: number;
  categoryAStar: number;
  thresholdBands: {
    thanaweya: ScholarshipThresholdBand2026;
    alAzhar: ScholarshipThresholdBand2026;
    stem: ScholarshipThresholdBand2026;
    nile: ScholarshipThresholdBand2026;
    ig: ScholarshipThresholdBand2026;
    american: ScholarshipThresholdBand2026;
    arab: ScholarshipThresholdBand2026;
  };
  discountPolicy: {
    B: string;
    A: string;
    AStar: string;
  };
}

const groupByFaculty = (faculty: string): FacultyGroupId => {
  const value = faculty.toLowerCase();
  if (
    value.includes('engineering') ||
    value.includes('computer') ||
    value.includes('art')
  ) return 'Technology';
  if (value.includes('english') || value.includes('chinese')) return 'Languages';
  if (
    value.includes('dentistry') ||
    value.includes('pharmacy') ||
    value.includes('physiotherapy') ||
    value.includes('nursing')
  ) return 'Health';
  return 'Social Sciences';
};

const normalizeThresholdBands = (bands: TuitionRow['thresholdBands']) => ({
  ...bands,
});

const resolveDiscountPolicy = (faculty: string): TuitionRow['discountPolicy'] => {
  const value = faculty.toLowerCase();
  if (value.includes('dentistry')) return scholarshipDiscountByTier2026.dentistry;
  if (value.includes('english') || value.includes('chinese')) {
    return scholarshipDiscountByTier2026.englishAndChinese;
  }
  return scholarshipDiscountByTier2026.otherFaculties;
};

const buildEgyptianTuitionRows = (): TuitionRow[] =>
  facultyFeeConfig2026.map((fee) => ({
    id: fee.key,
    faculty: fee.faculty,
    group: groupByFaculty(fee.faculty),
    tuitionFees: fee.feeBreakdown.tuitionFees,
    educationalSupportServices: fee.feeBreakdown.educationalSupportServices,
    administrative: fee.feeBreakdown.administrativeFees,
    categoryC: fee.feeByTier.C,
    categoryB: fee.feeByTier.B,
    categoryA: fee.feeByTier.A,
    categoryAStar: fee.feeByTier.AStar,
    thresholdBands: normalizeThresholdBands({
      thanaweya: fee.thresholds.thanaweya,
      alAzhar: fee.thresholds.thanaweya,
      stem: fee.thresholds.thanaweya,
      nile: fee.thresholds.thanaweya,
      ig: fee.thresholds.igcse,
      american: fee.thresholds.american,
      arab: fee.thresholds.arab,
    }),
    discountPolicy: resolveDiscountPolicy(fee.faculty),
  }));

const internationalAnnualBreakdownByFaculty: Record<
  string,
  Pick<TuitionRow, 'tuitionFees' | 'educationalSupportServices' | 'administrative'>
> = {
  dentistry: { tuitionFees: 10370, educationalSupportServices: 0, administrative: 2330 },
  pharmacy: { tuitionFees: 7060, educationalSupportServices: 0, administrative: 1590 },
  "clinical pharmacy": { tuitionFees: 7460, educationalSupportServices: 0, administrative: 1590 },
  physiotherapy: { tuitionFees: 6360, educationalSupportServices: 1500, administrative: 1590 },
  engineering: { tuitionFees: 7910, educationalSupportServices: 1500, administrative: 1590 },
  "energy & environmental engineering": { tuitionFees: 6260, educationalSupportServices: 1500, administrative: 1590 },
  "informatics & computer science": { tuitionFees: 7760, educationalSupportServices: 1500, administrative: 1590 },
  "art & design": { tuitionFees: 6510, educationalSupportServices: 1500, administrative: 1590 },
  "business administration": { tuitionFees: 7410, educationalSupportServices: 1500, administrative: 1590 },
  "political science": { tuitionFees: 4860, educationalSupportServices: 1500, administrative: 1590 },
  economics: { tuitionFees: 4860, educationalSupportServices: 1500, administrative: 1590 },
  law: { tuitionFees: 4860, educationalSupportServices: 1500, administrative: 1590 },
  "communication & mass media": { tuitionFees: 4860, educationalSupportServices: 1500, administrative: 1590 },
  psychology: { tuitionFees: 4860, educationalSupportServices: 1500, administrative: 1590 },
  "english language and literature": { tuitionFees: 1840, educationalSupportServices: 1500, administrative: 1360 },
  "chinese language & culture": { tuitionFees: 2090, educationalSupportServices: 0, administrative: 1360 },
  nursing: { tuitionFees: 1720, educationalSupportServices: 750, administrative: 630 },
};

const normalizeFacultyKey = (value: string): string =>
  value.toLowerCase().trim();

const buildInternationalTuitionRows = (): TuitionRow[] =>
  internationalTuitionFees
    .map((fee) => {
      const config = resolveFacultyConfig2026(fee.faculty);
      if (!config) {
        return null;
      }

      const annualBreakdown =
        internationalAnnualBreakdownByFaculty[normalizeFacultyKey(fee.faculty)] ?? {
          tuitionFees: 0,
          educationalSupportServices: 0,
          administrative: 0,
        };

      return {
        id: `international-${config.key}`,
        faculty: config.faculty,
        group: groupByFaculty(config.faculty),
        tuitionFees: annualBreakdown.tuitionFees,
        educationalSupportServices: annualBreakdown.educationalSupportServices,
        administrative: annualBreakdown.administrative,
        categoryC: fee.categoryC,
        categoryB: fee.categoryB,
        categoryA: fee.categoryA,
        categoryAStar: fee.categoryAStar,
        thresholdBands: normalizeThresholdBands({
          thanaweya: config.thresholds.thanaweya,
          alAzhar: config.thresholds.thanaweya,
          stem: config.thresholds.thanaweya,
          nile: config.thresholds.thanaweya,
          ig: config.thresholds.igcse,
          american: config.thresholds.american,
          arab: config.thresholds.arab,
        }),
        discountPolicy: resolveDiscountPolicy(config.faculty),
      };
    })
    .filter((row): row is TuitionRow => Boolean(row));

export const tuitionDataByStudentType: Record<StudentType, TuitionRow[]> = {
  egyptian: buildEgyptianTuitionRows(),
  international: buildInternationalTuitionRows(),
};

export const tuitionTableCopy = {
  searchPlaceholder: 'Search faculty...',
  detailsTitle: 'Details',
  thresholdTitle: 'Scholarship thresholds',
  viewThresholds: 'View Thresholds',
  finalPayableLabel: 'Final payable',
  emptyState: 'No results match the selected filters.',
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
      description: '2026/2027 tuition structure with category mapping.',
    },
    international: {
      title: 'International Students Tuition Fees',
      description: '2026/2027 tuition structure with category mapping.',
    },
  },
};
