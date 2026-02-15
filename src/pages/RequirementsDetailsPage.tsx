import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GraduationCap, Info } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RequirementsModuleNav } from '../components/RequirementsModuleNav';
import {
  admissionRequirements,
  generalEligibilityNotes,
  internationalApplicantNotes,
  type AdmissionRequirement,
} from '@/data/admission-requirements';

const studentTypeStyles: Record<AdmissionRequirement['studentType'], string> = {
  Egyptian: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  International: 'bg-blue-100 text-blue-700 border-blue-200',
  Both: 'bg-slate-100 text-slate-700 border-slate-200',
};

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

const RequirementDetailCard = ({ requirement }: { requirement: AdmissionRequirement }) => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">{requirement.curriculum}</h3>
          <p className="text-xs text-muted-foreground">Curriculum</p>
        </div>
      </div>
      <Badge className={`border ${studentTypeStyles[requirement.studentType]}`}>
        {requirement.studentType === 'Both' ? 'All Students' : requirement.studentType}
      </Badge>
    </div>

    <div className="space-y-6">
      {renderDetailCards('General Requirements', requirement.generalRequirements, 'border-border bg-card')}

      {requirement.minimumScores && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Minimum Scores</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(requirement.minimumScores).map(([label, value]) => (
              <div key={label} className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">Faculty-Specific Requirements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requirement.facultyRequirements.map((faculty, index) => (
            <div key={`${requirement.id}-faculty-${index}`} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h5 className="text-sm font-semibold text-foreground">{faculty.facultyGroup}</h5>
                <Badge variant="outline" className="text-xs">
                  {faculty.section}
                </Badge>
              </div>
              <div className="grid grid-cols-1 gap-2 mb-3">
                {faculty.faculties.map((name, idx) => (
                  <div key={`${name}-${idx}`} className="rounded-lg border border-border bg-muted/40 p-2">
                    <p className="text-xs text-foreground">{name}</p>
                  </div>
                ))}
              </div>
              {renderDetailCards('Required Subjects / Criteria', faculty.requirements, 'border-border bg-white/80')}
              {faculty.notes && (
                <div className="mt-3 rounded-xl border border-info/20 bg-info/10 p-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-info mt-0.5" />
                    <p className="text-sm text-foreground">{faculty.notes}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {requirement.approvedSubjects && requirement.approvedSubjects.length > 0 && (
        renderDetailCards('Approved Subjects', requirement.approvedSubjects, 'border-border bg-muted/40')
      )}

      {requirement.requiredDocuments.length > 0 && (
        renderDetailCards('Required Documents', requirement.requiredDocuments, 'border-border bg-card')
      )}

      {requirement.importantNotes.length > 0 && (
        renderDetailCards('Important Notes', requirement.importantNotes, 'border-warning/20 bg-warning/10')
      )}
    </div>
  </div>
);

export const RequirementsDetailsPage = () => {
  const [params] = useSearchParams();
  const selectedId = params.get('curriculum');

  const certificateTypes = useMemo(
    () =>
      admissionRequirements.map((item) => ({
        id: item.id,
        label: item.curriculum,
        type: item.studentType,
      })),
    []
  );

  const selectedRequirement = selectedId
    ? admissionRequirements.find((item) => item.id === selectedId)
    : null;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Requirements Details"
        description="Complete requirement data with certificate-specific breakdowns."
      />
      <RequirementsModuleNav />

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

      {selectedRequirement && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">Selected Curriculum</h2>
          <RequirementDetailCard requirement={selectedRequirement} />
        </section>
      )}

      <Tabs defaultValue="egyptian" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="egyptian">Egyptian Requirements</TabsTrigger>
          <TabsTrigger value="international">International Requirements</TabsTrigger>
          <TabsTrigger value="certificates">Certificate Types</TabsTrigger>
        </TabsList>

        <TabsContent value="egyptian" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {admissionRequirements
              .filter((item) => item.studentType === 'Egyptian')
              .map((item) => (
                <RequirementDetailCard key={item.id} requirement={item} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="international" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {admissionRequirements
              .filter((item) => item.studentType === 'International')
              .map((item) => (
                <RequirementDetailCard key={item.id} requirement={item} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6 space-y-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {certificateTypes.map((type) => (
              <Badge key={type.id} className={`border ${studentTypeStyles[type.type]}`}>
                {type.label}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {admissionRequirements.map((item) => (
              <RequirementDetailCard key={item.id} requirement={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
