import { ScrollText, Calendar, BookOpen, CreditCard, Users } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { DataCard } from '@/components/DataCard';
import { policies, Policy } from '@/data/policies';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FeesModuleNav } from '@/components/FeesModuleNav';

export const PoliciesPage = () => {
  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'Academic': BookOpen,
    'Financial': CreditCard,
    'Administrative': ScrollText,
    'Student Life': Users,
    'Scholarship': ScrollText,
    'Refund': ScrollText,
    'Installment': ScrollText,
  };

  const categoryColors: Record<string, string> = {
    'Academic': 'bg-primary text-primary-foreground',
    'Financial': 'bg-success text-success-foreground',
    'Administrative': 'bg-info text-info-foreground',
    'Student Life': 'bg-secondary text-secondary-foreground',
  };

  // Group policies by category
  const groupedPolicies = policies.reduce((acc, policy) => {
    if (!acc[policy.category]) {
      acc[policy.category] = [];
    }
    acc[policy.category].push(policy);
    return acc;
  }, {} as Record<string, Policy[]>);

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Policies & Procedures"
        description="Official university policies for academic, financial, and administrative matters"
      />
      <FeesModuleNav />

      {Object.entries(groupedPolicies).map(([category, categoryPolicies]) => {
        const CategoryIcon = categoryIcons[category] || ScrollText;
        
        return (
          <section key={category} className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CategoryIcon className="w-5 h-5 text-primary" />
              {category} Policies
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {categoryPolicies.map((policy) => (
                <AccordionItem key={policy.id} value={policy.id} className="border-none">
                  <DataCard
                    title={policy.title}
                    lastUpdated={policy.lastUpdated}
                    version={policy.version}
                    headerAction={
                      <Badge className={categoryColors[policy.category]}>
                        {policy.category}
                      </Badge>
                    }
                  >
                    <p className="text-muted-foreground mb-4">{policy.summary}</p>

                    <AccordionTrigger className="text-sm font-medium bg-muted/40 px-3 py-2 rounded-lg">
                      View Policy Details
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Policy Details</h4>
                          <ul className="space-y-2">
                            {policy.details.map((detail, index) => {
                              const isWarning =
                                detail.toLowerCase().includes('non-refundable') ||
                                detail.toLowerCase().includes('no refund');
                              return (
                                <li
                                  key={index}
                                  className={`flex items-start gap-2 text-sm ${
                                    isWarning ? 'text-destructive' : 'text-muted-foreground'
                                  }`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  {detail}
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {policy.importantDates && policy.importantDates.length > 0 && (
                          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-warning" />
                              Highlighted Deadlines
                            </h4>
                            <div className="space-y-2">
                              {policy.importantDates.map((date, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className="text-foreground">{date.event}</span>
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-warning text-warning-foreground">{date.date}</Badge>
                                    {date.notes && (
                                      <span className="text-xs text-muted-foreground">({date.notes})</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </DataCard>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        );
      })}
    </div>
  );
};
