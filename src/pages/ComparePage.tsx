import { useState } from 'react';
import { GitCompare, Check, X } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ComparisonTable } from '@/components/ComparisonTable';
import { DataCard } from '@/components/DataCard';
import { faculties } from '@/data/faculties';
import { egyptianTuitionFees, internationalTuitionFees, formatEGP, formatGBP } from '@/data/fees';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ComparePage = () => {
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>(['engineering', 'business', 'informatics-cs']);

  const selectedFacultyData = faculties.filter(f => selectedFaculties.includes(f.id));

  const getEgyptianTuition = (facultyName: string) => {
    const fee = egyptianTuitionFees.find(t => 
      t.faculty.toLowerCase().includes(facultyName.toLowerCase()) ||
      facultyName.toLowerCase().includes(t.faculty.toLowerCase())
    );
    return fee ? formatEGP(fee.categoryC) : '-';
  };

  const getInternationalTuition = (facultyName: string) => {
    const fee = internationalTuitionFees.find(t => 
      t.faculty.toLowerCase().includes(facultyName.toLowerCase()) ||
      facultyName.toLowerCase().includes(t.faculty.toLowerCase())
    );
    return fee ? formatGBP(fee.categoryC) : '-';
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Compare Programs"
        description="Side-by-side comparison of faculties, requirements, and fees"
      />

      <Tabs defaultValue="faculties" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faculties">Faculty Comparison</TabsTrigger>
          <TabsTrigger value="egyptian-vs-international">Egyptian vs International</TabsTrigger>
          <TabsTrigger value="tuition">Tuition Categories</TabsTrigger>
        </TabsList>

        {/* Faculty Comparison */}
        <TabsContent value="faculties">
          <DataCard title="Faculty Comparison" lastUpdated="2025-02-04" version="3.0">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Select faculties to compare:</p>
              <div className="flex flex-wrap gap-2">
                {faculties.map((faculty) => (
                  <button
                    key={faculty.id}
                    onClick={() => {
                      if (selectedFaculties.includes(faculty.id)) {
                        setSelectedFaculties(selectedFaculties.filter(f => f !== faculty.id));
                      } else if (selectedFaculties.length < 4) {
                        setSelectedFaculties([...selectedFaculties, faculty.id]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedFaculties.includes(faculty.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {faculty.name.replace('Faculty of ', '')}
                  </button>
                ))}
              </div>
            </div>

            {selectedFacultyData.length >= 2 && (
              <ComparisonTable
                headers={selectedFacultyData.map(f => f.name.replace('Faculty of ', ''))}
                rows={[
                  {
                    label: 'Duration',
                    values: selectedFacultyData.map(f => f.duration),
                  },
                  {
                    label: 'Category',
                    values: selectedFacultyData.map(f => (
                      <Badge variant="outline">{f.category}</Badge>
                    )),
                  },
                  {
                    label: 'Egyptian Tuition (Cat. C)',
                    values: selectedFacultyData.map(f => getEgyptianTuition(f.name)),
                    highlight: true,
                  },
                  {
                    label: 'International Tuition (Cat. C)',
                    values: selectedFacultyData.map(f => getInternationalTuition(f.name)),
                  },
                  {
                    label: 'Dual Degree',
                    values: selectedFacultyData.map(f => 
                      f.dualDegreePartner ? (
                        <span className="flex items-center gap-1 text-success">
                          <Check className="w-4 h-4" />
                          {f.dualDegreePartner}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <X className="w-4 h-4" />
                          No
                        </span>
                      )
                    ),
                  },
                  {
                    label: 'Programs Offered',
                    values: selectedFacultyData.map(f => `${f.programs.length} programs`),
                  },
                ]}
              />
            )}
          </DataCard>
        </TabsContent>

        {/* Egyptian vs International */}
        <TabsContent value="egyptian-vs-international">
          <DataCard title="Egyptian vs International Students" lastUpdated="2025-02-04" version="3.0">
            <ComparisonTable
              headers={['Egyptian Students', 'International Students']}
              rows={[
                {
                  label: 'Tuition Currency',
                  values: ['Egyptian Pounds (EGP)', 'British Pounds (GBP) or USD equivalent'],
                  highlight: true,
                },
                {
                  label: 'Scholarship Categories',
                  values: ['A*, A, B, C (15%-40% discounts)', 'A*, A, B, C (15%-40% discounts)'],
                },
                {
                  label: 'Accommodation Refund',
                  values: ['EGP 10,000 deduction till 2nd week', 'GBP 400 deduction till 2nd week'],
                },
                {
                  label: 'Transportation Refund',
                  values: ['EGP 5,000 deduction till 2nd week', 'EGP 5,000 deduction till 2nd week'],
                },
                {
                  label: 'Lab Insurance',
                  values: ['Paid in EGP', 'Paid in EGP'],
                },
                {
                  label: 'Late Payment Penalty',
                  values: ['2% per month', '2% per month'],
                },
                {
                  label: 'Documentation',
                  values: ['National ID, Certificates', 'Passport, Certificates, Study in Egypt Platform'],
                },
              ]}
            />
          </DataCard>
        </TabsContent>

        {/* Tuition Categories */}
        <TabsContent value="tuition">
          <DataCard title="Scholarship Category Explanation" lastUpdated="2025-02-04" version="3.0">
            <ComparisonTable
              headers={['Category C', 'Category B', 'Category A', 'Category A*']}
              rows={[
                {
                  label: 'Scholarship Level',
                  values: ['No scholarship', '15% scholarship', '30% scholarship', '40% scholarship'],
                  highlight: true,
                },
                {
                  label: 'Dentistry Exception',
                  values: ['No scholarship', '10% scholarship', '15% scholarship', '20% scholarship'],
                },
                {
                  label: 'English Exception',
                  values: ['No scholarship', '30% scholarship', '40% scholarship', '50% scholarship'],
                },
                {
                  label: 'Applies To',
                  values: ['Tuition only', 'Tuition only', 'Tuition only', 'Tuition only'],
                },
                {
                  label: 'Reassessment',
                  values: ['Annual', 'Annual', 'Annual', 'Annual'],
                },
              ]}
            />
          </DataCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
