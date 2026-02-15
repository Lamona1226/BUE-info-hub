 import { Award, GraduationCap, Trophy, FileText, Info } from 'lucide-react';
 import { PageHeader } from '@/components/PageHeader';
 import { DataCard } from '@/components/DataCard';
 import { Badge } from '@/components/ui/badge';
import { policies } from '@/data/policies';
 import { scholarshipMaintenance } from '@/data/fees';
import { FeesModuleNav } from '@/components/FeesModuleNav';
 
 export const ScholarshipPoliciesPage = () => {
   const scholarshipPolicies = policies.filter(p => p.category === 'Scholarship');
 
   return (
     <div className="animate-fade-in">
       <PageHeader 
         title="Scholarship Policies"
         description="Official policies for scholarship eligibility, maintenance, and renewal"
       />
      <FeesModuleNav />
 
       {/* Maintenance Requirements Table */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <GraduationCap className="w-5 h-5 text-primary" />
           Annual Average Required to Maintain Scholarship
         </h2>
         <DataCard title="Maintenance Requirements by Category" lastUpdated="2025-02-05" version="1.0">
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
                         Category {item.category}
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
 
       {/* Policy Details */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <FileText className="w-5 h-5 text-primary" />
           Scholarship Policy Details
         </h2>
         
         <div className="space-y-4">
           {scholarshipPolicies.map((policy) => (
             <DataCard
               key={policy.id}
               title={policy.title}
               lastUpdated={policy.lastUpdated}
               version={policy.version}
               headerAction={
                 <Badge className="bg-primary text-primary-foreground">
                   {policy.category}
                 </Badge>
               }
             >
               <p className="text-muted-foreground mb-4">{policy.summary}</p>
               <div className="space-y-2">
                 {policy.details.map((detail, index) => (
                   <div key={index} className="flex items-start gap-2 text-sm">
                     <span className="text-primary mt-1">•</span>
                     <span className="text-muted-foreground">{detail}</span>
                   </div>
                 ))}
               </div>
             </DataCard>
           ))}
         </div>
       </section>
 
       {/* Important Notes */}
       <section className="mb-8">
         <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
           <div className="flex items-start gap-2">
             <Info className="w-5 h-5 text-warning mt-0.5" />
             <div>
               <p className="font-medium text-foreground">Important Reminders</p>
               <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                 <li>• All scholarships are reassessed at the beginning of every academic year.</li>
                 <li>• Maximum combined partial scholarship: 20% (15% for Dentistry).</li>
                 <li>• Sports and Guardian Deceased scholarships have special exceptions.</li>
                 <li>• Scholarships apply to tuition fees only, not accommodation or other fees.</li>
               </ul>
             </div>
           </div>
         </div>
       </section>
     </div>
   );
 };