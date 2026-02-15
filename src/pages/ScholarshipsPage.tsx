 import { Award, Percent, Trophy, GraduationCap, Info, AlertCircle } from 'lucide-react';
 import { PageHeader } from '@/components/PageHeader';
 import { DataCard } from '@/components/DataCard';
 import { Badge } from '@/components/ui/badge';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { 
   scholarshipThresholds, 
   scholarshipMaintenance,
   partialScholarships,
   scholarshipNotes
 } from '@/data/fees';
 
 export const ScholarshipsPage = () => {
   const certificateTypes = ['igcse', 'american', 'arab', 'thanwya'] as const;
   const certificateLabels: Record<string, string> = {
     igcse: 'IGCSE / GCSE / IB / French BAC / German Abitur / Canadian',
     american: 'American Diploma',
     arab: 'Arab Certificates',
     thanwya: 'Egyptian Thanwya Amma / Al-Azhar / STEM',
   };
 
   return (
     <div className="animate-fade-in">
       <PageHeader 
         title="Discounts & Scholarships"
         description="Academic scholarship categories and partial discount programs for 2025/2026"
       />
 
       {/* Category Overview */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <Percent className="w-5 h-5 text-primary" />
           Scholarship Category Discounts
         </h2>
         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
           <div className="p-4 rounded-lg bg-muted/50 border border-border">
             <Badge variant="outline" className="mb-2">Category C</Badge>
             <p className="text-2xl font-bold text-foreground">0%</p>
             <p className="text-sm text-muted-foreground">Base tuition (no scholarship)</p>
           </div>
           <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30">
             <Badge variant="secondary" className="mb-2">Category B</Badge>
             <p className="text-2xl font-bold text-secondary-foreground">15%</p>
             <p className="text-sm text-muted-foreground">10% Dentistry, 30% English</p>
           </div>
           <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
             <Badge variant="default" className="mb-2">Category A</Badge>
             <p className="text-2xl font-bold text-primary">30%</p>
             <p className="text-sm text-muted-foreground">15% Dentistry, 40% English</p>
           </div>
           <div className="p-4 rounded-lg bg-success/10 border border-success/30">
             <Badge className="mb-2 bg-success text-success-foreground">Category A*</Badge>
             <p className="text-2xl font-bold text-success">40%</p>
             <p className="text-sm text-muted-foreground">20% Dentistry, 50% English</p>
           </div>
         </div>
       </section>
 
       {/* Score Thresholds by Certificate */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <GraduationCap className="w-5 h-5 text-primary" />
           Academic Scholarship Thresholds by Certificate
         </h2>
         
         <Tabs defaultValue="igcse" className="w-full">
           <TabsList className="grid w-full grid-cols-4 mb-4">
             <TabsTrigger value="igcse">IGCSE & Int'l</TabsTrigger>
             <TabsTrigger value="american">American</TabsTrigger>
             <TabsTrigger value="arab">Arab</TabsTrigger>
             <TabsTrigger value="thanwya">Thanwya</TabsTrigger>
           </TabsList>
 
           {certificateTypes.map((certType) => (
             <TabsContent key={certType} value={certType}>
               <DataCard title={certificateLabels[certType]} lastUpdated="2025-02-05" version="1.0">
                 <div className="overflow-x-auto">
                   <table className="w-full">
                     <thead>
                       <tr className="bg-muted/50">
                         <th className="text-left p-3 font-semibold">Faculty Group</th>
                         <th className="text-center p-3 font-semibold">Cat. B Score</th>
                         <th className="text-center p-3 font-semibold">Cat. A Score</th>
                         <th className="text-center p-3 font-semibold">Cat. A* Score</th>
                         <th className="text-center p-3 font-semibold">B Discount</th>
                         <th className="text-center p-3 font-semibold">A Discount</th>
                         <th className="text-center p-3 font-semibold">A* Discount</th>
                       </tr>
                     </thead>
                     <tbody>
                       {scholarshipThresholds.map((threshold, index) => (
                         <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                           <td className="p-3">
                             <div className="font-medium text-foreground">{threshold.facultyGroup}</div>
                             <div className="text-xs text-muted-foreground mt-1">
                               {threshold.faculties.slice(0, 3).join(', ')}
                               {threshold.faculties.length > 3 && '...'}
                             </div>
                           </td>
                           <td className="text-center p-3 font-mono">{threshold.certificates[certType].B}</td>
                           <td className="text-center p-3 font-mono">{threshold.certificates[certType].A}</td>
                           <td className="text-center p-3 font-mono text-success font-semibold">{threshold.certificates[certType].AStar}</td>
                           <td className="text-center p-3">
                             <Badge variant="secondary">{threshold.discountB}</Badge>
                           </td>
                           <td className="text-center p-3">
                             <Badge variant="default">{threshold.discountA}</Badge>
                           </td>
                           <td className="text-center p-3">
                             <Badge className="bg-success text-success-foreground">{threshold.discountAStar}</Badge>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </DataCard>
             </TabsContent>
           ))}
         </Tabs>
       </section>
 
       {/* Maintenance Requirements */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <Award className="w-5 h-5 text-primary" />
           Scholarship Maintenance Requirements
         </h2>
         <DataCard title="Annual Average Required to Maintain Category" lastUpdated="2025-02-05" version="1.0">
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="bg-muted/50">
                   <th className="text-left p-3 font-semibold">Category</th>
                   <th className="text-left p-3 font-semibold">Faculty</th>
                   <th className="text-center p-3 font-semibold">Egyptian Scale</th>
                   <th className="text-center p-3 font-semibold">British Scale</th>
                 </tr>
               </thead>
               <tbody>
                 {scholarshipMaintenance.map((item, index) => (
                   <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                     <td className="p-3">
                       <Badge 
                         className={
                           item.category === 'A*' ? 'bg-success text-success-foreground' :
                           item.category === 'A' ? 'bg-primary text-primary-foreground' :
                           'bg-secondary text-secondary-foreground'
                         }
                       >
                         {item.category}
                       </Badge>
                     </td>
                     <td className="p-3 font-medium">{item.faculty}</td>
                     <td className="text-center p-3 font-mono">{item.egyptianScale}</td>
                     <td className="text-center p-3 font-mono">{item.britishScale}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </DataCard>
       </section>
 
       {/* Partial Scholarships */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <Trophy className="w-5 h-5 text-primary" />
           Other Partial Scholarships
         </h2>
         <DataCard title="Additional Discounts (in addition to academic categories)" lastUpdated="2025-02-05" version="1.0">
           <div className="p-3 rounded-lg bg-info/10 border border-info/20 mb-4">
             <div className="flex items-start gap-2">
               <Info className="w-5 h-5 text-info mt-0.5" />
               <p className="text-sm text-muted-foreground">
                 Maximum combined partial scholarship: <strong>20%</strong> for all faculties (except Dentistry: <strong>15%</strong>).
                 Sports and Guardian Deceased exceptions apply.
               </p>
             </div>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="bg-muted/50">
                   <th className="text-left p-3 font-semibold">Scholarship Type</th>
                   <th className="text-center p-3 font-semibold">Discount</th>
                   <th className="text-left p-3 font-semibold">Validity / Conditions</th>
                 </tr>
               </thead>
               <tbody>
                 {partialScholarships.map((scholarship, index) => (
                   <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                     <td className="p-3 font-medium">{scholarship.name}</td>
                     <td className="text-center p-3">
                       <Badge variant="outline" className="font-mono">{scholarship.discount}</Badge>
                     </td>
                     <td className="p-3 text-muted-foreground text-sm">{scholarship.validity}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </DataCard>
       </section>
 
       {/* Certificate Classification Notes */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <AlertCircle className="w-5 h-5 text-primary" />
           Certificate Classification Notes
         </h2>
         <DataCard title="How Certificates Are Classified" lastUpdated="2025-02-05" version="1.0">
           <div className="space-y-3">
             {scholarshipNotes.certificateClassifications.map((note, index) => (
               <div key={index} className="flex items-start gap-2 text-sm">
                 <span className="text-primary mt-1">•</span>
                 <span className="text-muted-foreground">{note}</span>
               </div>
             ))}
           </div>
         </DataCard>
       </section>
     </div>
   );
 };