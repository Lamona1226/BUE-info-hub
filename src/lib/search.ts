import { faculties, Faculty } from '@/data/faculties';
import { englishRequirements, EnglishRequirement } from '@/data/english-requirements';
import { admissionRequirements, AdmissionRequirement } from '@/data/admission-requirements';
import { egyptianTuitionFees, EgyptianTuitionFee } from '@/data/fees';
import { policies, Policy } from '@/data/policies';
import { getAllContacts } from '@/data/contacts';

export interface SearchResult {
  id: string;
  type: 'faculty' | 'english' | 'admission' | 'tuition' | 'policy' | 'contact';
  title: string;
  subtitle: string;
  path: string;
  icon: string;
  lastUpdated: string;
}

export const searchAll = (query: string): SearchResult[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  // Search faculties
  faculties.forEach((f: Faculty) => {
    if (
      f.name.toLowerCase().includes(lowerQuery) ||
      f.programs.some(p => p.toLowerCase().includes(lowerQuery)) ||
      f.degree.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: f.id,
        type: 'faculty',
        title: f.name,
        subtitle: `${f.programs.length} programs • ${f.duration}`,
        path: `/faculties#${f.id}`,
        icon: 'GraduationCap',
        lastUpdated: f.lastUpdated,
      });
    }
  });

  // Search english requirements
  englishRequirements.forEach((r: EnglishRequirement) => {
    if (
      r.testName.toLowerCase().includes(lowerQuery) ||
      r.minimumScore.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: r.id,
        type: 'english',
        title: r.testName,
        subtitle: `Min: ${r.minimumScore}`,
        path: `/english#${r.id}`,
        icon: 'Languages',
        lastUpdated: r.lastUpdated,
      });
    }
  });

  // Search admission requirements
  admissionRequirements.forEach((r: AdmissionRequirement) => {
    if (
      r.curriculum.toLowerCase().includes(lowerQuery) ||
      r.generalRequirements.some(req => req.toLowerCase().includes(lowerQuery)) ||
      r.facultyRequirements.some(fr => 
        fr.facultyGroup.toLowerCase().includes(lowerQuery) ||
        fr.faculties.some(f => f.toLowerCase().includes(lowerQuery))
      )
    ) {
      results.push({
        id: r.id,
        type: 'admission',
        title: `${r.curriculum} Requirements`,
        subtitle: `${r.studentType} students`,
        path: `/requirements/${r.id}`,
        icon: 'FileCheck',
        lastUpdated: r.lastUpdated,
      });
    }
  });

  // Search tuition fees
  egyptianTuitionFees.forEach((t: EgyptianTuitionFee) => {
    if (
      t.faculty.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: `tuition-${t.faculty.toLowerCase().replace(/ /g, '-')}`,
        type: 'tuition',
        title: `${t.faculty} Tuition`,
        subtitle: `${t.category} faculty`,
        path: `/fees`,
        icon: 'CreditCard',
        lastUpdated: '2025-02-04',
      });
    }
  });

  // Search policies
  policies.forEach((p: Policy) => {
    if (
      p.title.toLowerCase().includes(lowerQuery) ||
      p.summary.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: p.id,
        type: 'policy',
        title: p.title,
        subtitle: p.summary.substring(0, 60) + '...',
        path: `/policies#${p.id}`,
        icon: 'ScrollText',
        lastUpdated: p.lastUpdated,
      });
    }
  });

  // Search contacts
  const contacts = getAllContacts();
  contacts.forEach((c) => {
    if (
      c.name.toLowerCase().includes(lowerQuery) ||
      c.extension.includes(query) ||
      c.departmentName.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: `contact-${c.extension}`,
        type: 'contact',
        title: c.name,
        subtitle: `Ext: ${c.extension} | ${c.departmentName}`,
        path: `/contacts`,
        icon: 'Phone',
        lastUpdated: '2025-02-05',
      });
    }
  });

  return results.slice(0, 15); // Limit results
};

export const getRecentSearches = (): string[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('recentSearches');
  return stored ? JSON.parse(stored) : [];
};

export const addRecentSearch = (query: string): void => {
  if (typeof window === 'undefined') return;
  const recent = getRecentSearches();
  const updated = [query, ...recent.filter(s => s !== query)].slice(0, 5);
  localStorage.setItem('recentSearches', JSON.stringify(updated));
};
