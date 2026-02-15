import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DataCard } from '@/components/DataCard';
import { TuitionMasterTable } from '@/components/TuitionMasterTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { facultyGroups, type FacultyGroupMeta, type TuitionRow } from '@/data/fees-module';

interface TuitionModuleProps {
  rows: TuitionRow[];
  formatCurrency: (amount: number) => string;
  defaultOpenGroups?: string[];
}

const defaultOpen = new Set<FacultyGroupMeta['id']>(['Technology']);

export const TuitionModule = ({ rows, formatCurrency, defaultOpenGroups }: TuitionModuleProps) => {
  const openSet = new Set(defaultOpenGroups || Array.from(defaultOpen));

  return (
    <div className="space-y-6">
      {facultyGroups.map((group) => {
        const groupRows = rows.filter((row) => row.group === group.id);
        const Icon = group.icon;

        return (
          <Collapsible key={group.id} defaultOpen={openSet.has(group.id)}>
            <DataCard
              title={group.title}
              headerAction={
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  {group.description}
                </Badge>
              }
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-between mb-4 group">
                  <span className="text-sm font-medium">Toggle {group.title} table</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <TuitionMasterTable rows={groupRows} formatCurrency={formatCurrency} />
              </CollapsibleContent>
            </DataCard>
          </Collapsible>
        );
      })}
    </div>
  );
};
