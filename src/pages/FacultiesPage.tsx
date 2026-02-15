import { GraduationCap, Clock, Award, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { DataCard } from '@/components/DataCard';
import { faculties, getFacultiesByCategory } from '@/data/faculties';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const FacultiesPage = () => {
  const categories = ['Technology', 'Social Sciences', 'Languages', 'Health'] as const;

  // Calculate total programs
  const totalPrograms = faculties.reduce((acc, f) => acc + f.programs.length, 0);

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Faculties & Programs"
        description={`${faculties.length} faculties offering ${totalPrograms} programs`}
      />

      <Tabs defaultValue="Technology" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6">
              {getFacultiesByCategory(category).map((faculty) => (
                <DataCard
                  key={faculty.id}
                  title={faculty.name}
                  lastUpdated={faculty.lastUpdated}
                  version={faculty.version}
                  headerAction={
                    <Badge variant="outline" className="text-primary border-primary">
                      {category}
                    </Badge>
                  }
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Basic Info */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Degree</p>
                      <p className="text-base font-medium text-foreground mb-4">{faculty.degree}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="w-4 h-4" />
                        <span>Duration: <span className="text-foreground font-medium">{faculty.duration}</span></span>
                      </div>

                      {faculty.dualDegreePartner && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>Dual Degree: <span className="text-foreground font-medium">{faculty.dualDegreePartner}</span></span>
                        </div>
                      )}
                    </div>

                    {/* Programs */}
                    <div className="lg:col-span-2">
                      <p className="text-sm text-muted-foreground mb-3">Programs / Specialisms</p>
                      <div className="flex flex-wrap gap-2">
                        {faculty.programs.map((program, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            <GraduationCap className="w-3 h-3 mr-1" />
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DataCard>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
