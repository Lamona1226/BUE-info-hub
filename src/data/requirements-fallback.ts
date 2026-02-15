import type { RequirementItem } from '@/pages/RequirementsPage';

export const fallbackRequirementsData: RequirementItem[] = [
  {
    id: 'req-igcse-core',
    title: 'IGCSE Core Requirements',
    category: 'Academic',
    certificateType: 'IGCSE',
    minimumScore: '5 subjects at C or above',
    shortSummary: 'Core eligibility for IGCSE students applying to undergraduate programs.',
    fullDetails:
      'Applicants must present at least five subjects with grades C or above, including English and Mathematics. Faculty-specific subject requirements may apply.',
    badgeLabel: 'IGCSE',
    iconName: 'graduation',
  },
  {
    id: 'req-american',
    title: 'American Diploma Eligibility',
    category: 'Admission',
    certificateType: 'American',
    minimumScore: '70% cumulative GPA',
    shortSummary: 'Minimum cumulative GPA requirement for American Diploma applicants.',
    fullDetails:
      'Applicants must meet or exceed the minimum cumulative GPA, with subject prerequisites depending on the target faculty. Official transcripts are required.',
    badgeLabel: 'American',
    iconName: 'book',
  },
  {
    id: 'req-thanaweya',
    title: 'Thanaweya Amma Thresholds',
    category: 'Academic',
    certificateType: 'Thanaweya',
    minimumScore: '70% overall score',
    shortSummary: 'Baseline score requirements for Egyptian Thanaweya Amma.',
    fullDetails:
      'Minimum overall score applies to general admission. Certain faculties require higher thresholds and specific subject grades.',
    badgeLabel: 'Thanaweya',
    iconName: 'award',
  },
  {
    id: 'req-docs',
    title: 'Document Checklist',
    category: 'Documentation',
    certificateType: 'Other',
    minimumScore: 'All documents required',
    shortSummary: 'Mandatory documents for application completion.',
    fullDetails:
      'Applicants must submit national ID/passport copy, certified transcripts, graduation certificate, and proof of English proficiency where applicable.',
    badgeLabel: 'Docs',
    iconName: 'file',
  },
];
