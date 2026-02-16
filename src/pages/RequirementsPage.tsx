import { useMemo } from 'react';
import { Layers, ScrollText, Users } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { RequirementsErrorBoundary } from '../components/RequirementsErrorBoundary';
import {
  admissionRequirements,
  generalEligibilityNotes,
  internationalApplicantNotes,
  type AdmissionRequirement,
} from '@/data/admission-requirements';
import { RequirementsModuleNav } from '../components/RequirementsModuleNav';
import {
  RequirementOverviewCard,
  renderTextCards,
  studentTypeStyles,
} from '@/components/requirements/RequirementCards';

interface RequirementspageProps {
  requirementsData?: AdmissionRequirement[];
  generalNotes?: string[];
  internationalNotes?: string[];
  isLoading?: boolean;
  errorMessage?: string;
}

export const Requirementspage = ({
  requirementsData = [],
  generalNotes = [],
  internationalNotes = [],
  isLoading = false,
  errorMessage,
}: RequirementspageProps) => {
  const hasData = requirementsData.length > 0;

  const groupedByStudentType = useMemo(() => {
    return {
      Egyptian: requirementsData.filter((item) => item.studentType === 'Egyptian'),
      International: requirementsData.filter((item) => item.studentType === 'International'),
      Both: requirementsData.filter((item) => item.studentType === 'Both'),
    };
  }, [requirementsData]);

  const dashboardStats = useMemo(
    () => [
      {
        label: 'Certificate Types',
        value: requirementsData.length,
        icon: Layers,
        helper: 'Available requirement cards',
      },
      {
        label: 'General Notes',
        value: generalNotes.length,
        icon: ScrollText,
        helper: 'Shared admission guidance',
      },
      {
        label: 'International Notes',
        value: internationalNotes.length,
        icon: Users,
        helper: 'International student guidance',
      },
    ],
    [generalNotes.length, internationalNotes.length, requirementsData.length]
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Admission Requirements"
        description="Overview dashboard with certificate cards and dedicated details pages."
      />
      <RequirementsModuleNav />

      {errorMessage && (
        <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
          <h2 className="text-sm font-semibold text-destructive">Unable to load requirements</h2>
          <p className="text-sm text-muted-foreground mt-1">{errorMessage}</p>
        </div>
      )}

      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {dashboardStats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-semibold text-foreground">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.helper}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

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

      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {(['Egyptian', 'International', 'Both'] as AdmissionRequirement['studentType'][]).map((group) => (
            <span key={group} className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${studentTypeStyles[group]}`}>
              {group === 'Both' ? `All Students (${groupedByStudentType[group].length})` : `${group} Students (${groupedByStudentType[group].length})`}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {requirementsData.map((req) => (
            <RequirementOverviewCard key={req.id} requirement={req} />
          ))}
        </div>
      </section>
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
