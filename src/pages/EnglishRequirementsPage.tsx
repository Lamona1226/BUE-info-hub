import { Check, AlertCircle, Users, Palette, Scale, Heart, FileCheck } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { 
  englishRequirements, 
  englishRequirementCategories, 
  admissionInterviews, 
  admissionInterviewIntro 
} from '@/data/english-requirements';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const EnglishRequirementsPage = () => {
  const getInterviewIcon = (faculty: string) => {
    if (faculty.includes('Arts')) return Palette;
    if (faculty.includes('Law')) return Scale;
    return Heart;
  };

  const exemptionRequirementMap: Record<string, string> = {
    'Academic IELTS': 'ielts',
    'Academic TOEFL': 'toefl',
    'IGCSE / GCSE': 'igcse-english',
    'American Diploma': 'american-diploma',
    'French Baccalaureate (BAC)': 'french-bac',
    'International Baccalaureate (IB)': 'ib',
    'Canadian Diploma': 'canadian',
    'German Abitur': 'abitur',
    'Nile International Certificate': 'nile',
  };

  const getRequirementForExemption = (testName: string) => {
    const requirementId = exemptionRequirementMap[testName];
    return englishRequirements.find(req => req.id === requirementId);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="English Language Requirements"
        description="Accepted English proficiency tests and minimum scores for admission"
      />

      {/* English Test Exemption */}
      <section className="mb-8 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">English Test Exemption</h2>
          <p className="text-sm text-muted-foreground">
            Holders of international high school certificates are exempt from the BUE English Test, provided they have achieved the required score/mark in the English subject of their high school.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {englishRequirementCategories[0]?.exemptionCriteria.map((test, index) => {
            const requirement = getRequirementForExemption(test.testName);
            const validity = test.validDate || requirement?.validityPeriod || '—';

            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.01] flex flex-col gap-4 cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{test.testName}</h3>
                        <p className="text-xs text-muted-foreground">Test / Certificate</p>
                      </div>
                      <Badge variant="secondary">Exemption</Badge>
                    </div>
                    <div className="rounded-xl border border-border bg-emerald-50/70 p-3">
                      <p className="text-xs text-muted-foreground">Minimum score required</p>
                      <p className="text-lg font-semibold text-foreground">{test.minimumScore}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/40 p-3">
                      <p className="text-xs text-muted-foreground">Valid date</p>
                      <p className="text-sm text-foreground">{validity}</p>
                    </div>
                    <Button type="button" variant="secondary" aria-label={`View details about ${test.testName}`}>
                      View Details
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl">{test.testName}</DialogTitle>
                    <DialogDescription>English test exemption details</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-xl border border-border bg-muted/40 p-4">
                      <h4 className="text-sm font-semibold text-foreground">Minimum Score Required</h4>
                      <p className="text-xl font-semibold text-foreground mt-1">{test.minimumScore}</p>
                      <p className="text-sm text-muted-foreground mt-2">Valid for: {validity}</p>
                    </div>
                    {requirement?.exemptionCriteria && (
                      <div className="rounded-xl border border-success/20 bg-success/10 p-4">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-success">BUE Test Exemption</p>
                            <p className="text-sm text-foreground mt-1">{requirement.exemptionCriteria}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {requirement?.notes && (
                      <div className="rounded-xl border border-info/20 bg-info/10 p-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-info">Note</p>
                            <p className="text-sm text-foreground mt-1">{requirement.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>

        <div className="rounded-2xl border border-warning/20 bg-warning/10 p-6 shadow-md">
          <h3 className="text-sm font-semibold text-warning">If Exemption Criteria Is Not Met</h3>
          <p className="text-sm text-foreground mt-2">
            Applicants who do not meet any of the exemption criteria must fulfill the BUE English language entry requirement by completing ONE of the following:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {englishRequirementCategories[0]?.ifNotExempt.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-warning/20 bg-white/80 p-4 shadow-md flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium text-foreground">Requirement</span>
                </div>
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thanaweya Amma Requirements */}
      <section className="mb-8 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">English Test — Thanaweya Amma or Equivalent</h2>
          <p className="text-sm text-muted-foreground">
            For holders of Thanaweya Amma or its equivalent (approved Arab, Azharian, and other types of high school certificates):
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.01] flex flex-col gap-4 cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Thanaweya Amma or Equivalent</h3>
                    <p className="text-xs text-muted-foreground">English test requirement</p>
                  </div>
                  <Badge variant="secondary">Summary</Badge>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-3">
                  <p className="text-xs text-muted-foreground">Core requirement</p>
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    Applicants must take the BUE English Test
                  </p>
                </div>
                <div className="rounded-xl border border-success/20 bg-success/10 p-3">
                  <p className="text-xs text-muted-foreground">Possible exemptions</p>
                  <p className="text-sm text-foreground">IELTS Academic or TOEFL Academic</p>
                </div>
                <Button type="button" variant="secondary" aria-label="View details about Thanaweya Amma requirements">
                  View Details
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle className="text-xl">Thanaweya Amma or Equivalent</DialogTitle>
                <DialogDescription>English test requirements and possible exemptions</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    Applicants must take the BUE English Test
                  </p>
                </div>
                <div className="rounded-2xl border border-success/20 bg-success/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-success" />
                    <h3 className="text-sm font-semibold text-success">Possible Exemption</h3>
                  </div>
                  <p className="text-sm text-foreground mb-4">
                    Applicants may be exempted from the BUE English Test by submitting ONE of the following:
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {englishRequirementCategories[1]?.exemptionCriteria.map((test, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-success/20 bg-white/80 p-4 shadow-md flex flex-col gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-success" />
                          <span className="text-sm font-medium text-foreground">{test.testName}</span>
                        </div>
                        <p className="text-sm text-foreground">
                          Valid {test.testName} certificate with a minimum score of {test.minimumScore}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Admission Interviews Section */}
      <section className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Admission Interviews for Specific Faculties</h2>
            <p className="text-sm text-muted-foreground">{admissionInterviewIntro}</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            Interviews
          </Badge>
        </div>
        <h3 className="text-sm font-medium text-foreground">Faculties Requiring Interviews or Assessments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {admissionInterviews.map((interview, index) => {
            const IconComponent = getInterviewIcon(interview.faculty);
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.01] flex flex-col gap-4 cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-foreground">{interview.faculty}</h4>
                          <p className="text-xs text-muted-foreground">Faculty</p>
                        </div>
                      </div>
                      <Badge variant={interview.type === 'Interview' ? 'default' : interview.type === 'Assessment' ? 'secondary' : 'outline'}>
                        {interview.type}
                      </Badge>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/40 p-3">
                      <p className="text-xs text-muted-foreground">Assessment</p>
                      <p className="text-sm font-medium text-foreground">{interview.description}</p>
                    </div>
                    <Button type="button" variant="secondary" aria-label={`View details about ${interview.faculty}`}>
                      View Details
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl">{interview.faculty}</DialogTitle>
                    <DialogDescription>{interview.description}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={interview.type === 'Interview' ? 'default' : interview.type === 'Assessment' ? 'secondary' : 'outline'}>
                        {interview.type}
                      </Badge>
                      <Badge variant="outline">Interview requirement</Badge>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/40 p-4">
                      <h4 className="text-sm font-semibold text-foreground">Purpose</h4>
                      <p className="text-sm text-muted-foreground mt-2">{interview.purpose}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </section>

    </div>
  );
};
