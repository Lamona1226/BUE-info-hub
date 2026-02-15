import { useMemo } from 'react';
import { FileCheck, GraduationCap, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RequirementsErrorBoundary } from '../components/RequirementsErrorBoundary';
import {
  admissionRequirements,
  generalEligibilityNotes,
  internationalApplicantNotes,
  type AdmissionRequirement,
} from '@/data/admission-requirements';
import { RequirementsModuleNav } from '../components/RequirementsModuleNav';

interface RequirementspageProps {
  requirementsData?: AdmissionRequirement[];
  generalNotes?: string[];
  internationalNotes?: string[];
  isLoading?: boolean;
  errorMessage?: string;
}

const studentTypeStyles: Record<AdmissionRequirement['studentType'], string> = {
  Egyptian: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  International: 'bg-blue-100 text-blue-700 border-blue-200',
  Both: 'bg-slate-100 text-slate-700 border-slate-200',
};

const requirementCard =
  'rounded-2xl border border-border bg-card p-6 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.01] flex flex-col gap-4';

const renderTextCards = (items: string[], accent: string) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {items.map((item, index) => (
      <div key={`${item}-${index}`} className={`rounded-2xl border ${accent} p-4 shadow-md`}>
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground">{item}</p>
        </div>
      </div>
    ))}
  </div>
);

const renderDetailCards = (title: string, items: string[], accent: string) => (
  <div className="space-y-3">
    <h4 className="text-sm font-semibold text-foreground">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className={`rounded-xl border ${accent} p-3`}>
          <p className="text-sm text-foreground">{item}</p>
        </div>
      ))}
    </div>
  </div>
);

export const Requirementspage = ({
  requirementsData = [],
  generalNotes = [],
  internationalNotes = [],
  isLoading = false,
  errorMessage,
}: RequirementspageProps) => {
  const hasData = requirementsData.length > 0;
  const gridClass = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6';

  const groupedByStudentType = useMemo(() => {
    return {
      Egyptian: requirementsData.filter((item) => item.studentType === 'Egyptian'),
      International: requirementsData.filter((item) => item.studentType === 'International'),
      Both: requirementsData.filter((item) => item.studentType === 'Both'),
    };
  }, [requirementsData]);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Admission Requirements"
        description="Card-based requirements overview with full details per curriculum."
      />
      <RequirementsModuleNav />

      {errorMessage && (
        <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
          <h2 className="text-sm font-semibold text-destructive">Unable to load requirements</h2>
          <p className="text-sm text-muted-foreground mt-1">{errorMessage}</p>
        </div>
      )}

      {generalNotes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">General Eligibility & Notes</h2>
          {renderTextCards(generalNotes, 'border-border bg-muted/40')}
        </section>
      )}

      {internationalNotes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">International Applicants</h2>
          {renderTextCards(internationalNotes, 'border-blue-100 bg-blue-50/60')}
        </section>
      )}

      {!hasData && !isLoading && (
        <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center shadow-md">
          <h3 className="text-lg font-semibold text-foreground">No requirements available</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Requirements will appear here once they are added.
          </p>
        </div>
      )}

      {(['Egyptian', 'International', 'Both'] as AdmissionRequirement['studentType'][]).map((group) => (
        <section key={group} className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">{group} Requirements</h2>
            <Badge className={`border ${studentTypeStyles[group]}`}>
              {group === 'Both' ? 'All Students' : `${group} Students`}
            </Badge>
          </div>
          <div className={gridClass}>
            {groupedByStudentType[group].map((req) => (
              <div key={req.id} className={requirementCard} role="button" tabIndex={0} aria-label={`View details for ${req.curriculum}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{req.curriculum}</h3>
                      <p className="text-xs text-muted-foreground">Curriculum</p>
                    </div>
                  </div>
                  <Badge className={`border ${studentTypeStyles[req.studentType]}`}>
                    {req.studentType === 'Both' ? 'All Students' : req.studentType}
                  </Badge>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">General requirements</p>
                  <p className="text-sm text-foreground">{req.generalRequirements.length} items</p>
                </div>
                {req.minimumScores && (
                  <div className="rounded-xl border border-border bg-emerald-50/70 p-3">
                    <p className="text-xs text-muted-foreground">Minimum scores</p>
                    <p className="text-sm text-foreground">{Object.keys(req.minimumScores).length} items</p>
                  </div>
                )}
                <Button asChild type="button" variant="secondary" aria-label={`View full details for ${req.curriculum}`}>
                  <Link to={`/requirements/details?curriculum=${encodeURIComponent(req.id)}`}>View Details</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export const RequirementsPage = () => (
  <RequirementsErrorBoundary>
    <Requirementspage
      requirementsData={admissionRequirements}
      generalNotes={generalEligibilityNotes}
      internationalNotes={internationalApplicantNotes}
    />
  </RequirementsErrorBoundary>
);
