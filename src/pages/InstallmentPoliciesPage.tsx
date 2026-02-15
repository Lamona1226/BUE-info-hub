 import { Calendar, CreditCard, AlertCircle, Clock, FileText } from 'lucide-react';
 import { PageHeader } from '@/components/PageHeader';
 import { DataCard } from '@/components/DataCard';
 import { Badge } from '@/components/ui/badge';
 import { policies } from '@/data/policies';
 import { installmentPlans, latePaymentPolicy } from '@/data/fees';
 
 export const InstallmentPoliciesPage = () => {
   const installmentPolicies = policies.filter(p => p.category === 'Installment');
 
   return (
     <div className="animate-fade-in">
       <PageHeader 
         title="Installment Policies"
         description="Payment schedules, deadlines, and late payment penalties"
       />
 
       {/* Payment Schedule */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <Calendar className="w-5 h-5 text-primary" />
           Installment Payment Schedule
         </h2>
         <DataCard title="Tuition Fee Payment Plan 2025-2026" lastUpdated="2025-02-05" version="1.0">
           <div className="grid sm:grid-cols-3 gap-4 mb-4">
             {installmentPlans.map((plan, index) => (
               <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                 <div className="flex items-center justify-between mb-2">
                   <Badge 
                     variant={index === 0 ? 'default' : 'secondary'}
                     className="text-lg"
                   >
                     {plan.value}
                   </Badge>
                   <span className="text-xs text-muted-foreground">{plan.installment}</span>
                 </div>
                 <p className="text-sm font-medium text-foreground">{plan.deadline}</p>
               </div>
             ))}
           </div>
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="bg-muted/50">
                   <th className="text-left p-3 font-semibold">Installment</th>
                   <th className="text-center p-3 font-semibold">Percentage</th>
                   <th className="text-left p-3 font-semibold">Deadline</th>
                 </tr>
               </thead>
               <tbody>
                 {installmentPlans.map((plan, index) => (
                   <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                     <td className="p-3 font-medium">{plan.installment}</td>
                     <td className="text-center p-3">
                       <Badge variant="outline" className="font-mono">{plan.value}</Badge>
                     </td>
                     <td className="p-3 text-muted-foreground">{plan.deadline}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </DataCard>
       </section>
 
       {/* Late Payment Policy */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <Clock className="w-5 h-5 text-primary" />
           Late Payment Penalty
         </h2>
         <DataCard title="Penalty Policy" lastUpdated="2025-02-05" version="1.0">
           <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
             <div className="flex items-center gap-4">
               <div className="text-center">
                 <p className="text-3xl font-bold text-destructive">{latePaymentPolicy.rate}</p>
                 <p className="text-sm text-muted-foreground">{latePaymentPolicy.period}</p>
               </div>
               <div className="flex-1">
                 <p className="text-muted-foreground">{latePaymentPolicy.description}</p>
               </div>
             </div>
           </div>
         </DataCard>
       </section>
 
       {/* Policy Details */}
       <section className="mb-8">
         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
           <FileText className="w-5 h-5 text-primary" />
           Installment Policy Details
         </h2>
         
         <div className="space-y-4">
           {installmentPolicies.map((policy) => (
             <DataCard
               key={policy.id}
               title={policy.title}
               lastUpdated={policy.lastUpdated}
               version={policy.version}
               headerAction={
                 <Badge className="bg-info text-info-foreground">
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
               {policy.importantDates && policy.importantDates.length > 0 && (
                 <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                   <h4 className="font-medium mb-2 text-foreground flex items-center gap-2">
                     <Calendar className="w-4 h-4 text-primary" />
                     Important Dates
                   </h4>
                   <div className="space-y-2">
                     {policy.importantDates.map((date, idx) => (
                       <div key={idx} className="flex items-center justify-between text-sm">
                         <span className="text-foreground">{date.event}</span>
                         <Badge variant="outline">{date.date}</Badge>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </DataCard>
           ))}
         </div>
       </section>
 
       {/* Important Notice */}
       <section className="mb-8">
         <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
           <div className="flex items-start gap-2">
             <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
             <div>
               <p className="font-medium text-foreground">Important Notice</p>
               <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                 <li>• All payment deadlines are strict and subject to late payment penalties.</li>
                 <li>• Students with outstanding balances may have registration holds placed on their accounts.</li>
                 <li>• Contact the Finance department for payment plan arrangements if experiencing financial hardship.</li>
               </ul>
             </div>
           </div>
         </div>
       </section>
     </div>
   );
 };