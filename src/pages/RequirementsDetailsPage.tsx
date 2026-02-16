import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { RequirementsModuleNav } from '../components/RequirementsModuleNav';
import {
  admissionRequirements,
  generalEligibilityNotes,
  internationalApplicantNotes,
} from '@/data/admission-requirements';
import {
  RequirementDetailCard,
  renderTextCards,
} from '@/components/requirements/RequirementCards';

export const RequirementsDetailsPage = () => {
  const { certificateType } = useParams<{ certificateType: string }>();

  const selectedRequirement = useMemo(
    () => admissionRequirements.find((item) => item.id === certificateType),
    [certificateType]
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={selectedRequirement ? `${selectedRequirement.curriculum} Requirements` : 'Requirements Details'}
        description="Complete requirement data with certificate-specific breakdowns."
      />
      <RequirementsModuleNav currentCertificate={certificateType} />

      <section className="mb-8 space-y-6">
        {generalEligibilityNotes.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">General Eligibility & Notes</h2>
            {renderTextCards(generalEligibilityNotes, 'border-border bg-muted/40')}
          </div>
        )}
        {internationalApplicantNotes.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">International Applicants</h2>
            {renderTextCards(internationalApplicantNotes, 'border-blue-100 bg-blue-50/60')}
          </div>
        )}
      </section>

      {!selectedRequirement && (
        <section className="rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center shadow-md">
          <h2 className="text-lg font-semibold text-foreground">Certificate type not found</h2>
          <p className="text-sm text-muted-foreground mt-2 mb-6">
            Please choose a certificate type from the requirements dashboard.
          </p>
          <Button asChild>
            <Link to="/requirements">Back to Requirements</Link>
          </Button>
        </section>
      )}

      {selectedRequirement && (
        <section className="mb-10 space-y-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/requirements" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Overview
            </Link>
          </Button>
          <RequirementDetailCard requirement={selectedRequirement} />
        </section>
      )}
    </div>
  );
};
