import { AlertCircle, Calendar, CreditCard, Home, Bus, Info, FileText } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { DataCard } from '@/components/DataCard';
import { Badge } from '@/components/ui/badge';
import { FeesModuleNav } from '@/components/FeesModuleNav';
import { 
  refundPolicyItems, 
  refundProcess, 
  refundPolicyNote,
  accommodationTransportRefund 
} from '@/data/fees';

export const RefundPolicyPage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Refund Policy"
        description="Tuition fee refund rules and timelines as per CPNU Decree"
      />
      <FeesModuleNav />

      {/* Policy Reference */}
      <section className="mb-6">
        <div className="p-4 rounded-lg bg-info/10 border border-info/20">
          <div className="flex items-start gap-2">
            <FileText className="w-5 h-5 text-info mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Legal Reference</p>
              <p className="text-sm text-muted-foreground mt-1">{refundPolicyNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition Fee Refund Schedule */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Tuition Fee Refund Schedule
        </h2>
        
        <DataCard title="Refund Terms & Conditions" lastUpdated="2025-02-04" version="3.0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold">Date / Item</th>
                  <th className="text-left p-3 font-semibold">Terms & Conditions</th>
                </tr>
              </thead>
              <tbody>
                {refundPolicyItems.map((item, index) => {
                  // Color coding based on refund severity
                  let rowClass = '';
                  if (item.termsAndConditions.includes('Non-refundable') || item.termsAndConditions.includes('No refund')) {
                    rowClass = 'bg-destructive/5';
                  } else if (item.termsAndConditions.includes('100%')) {
                    rowClass = 'bg-warning/5';
                  } else if (item.termsAndConditions.includes('50%')) {
                    rowClass = 'bg-info/5';
                  } else if (item.termsAndConditions.includes('10%')) {
                    rowClass = 'bg-success/5';
                  }

                  return (
                    <tr key={index} className={`border-t border-border hover:bg-muted/30 transition-colors ${rowClass}`}>
                      <td className="p-3">
                        <span className="font-medium text-foreground">{item.dateOrItem}</span>
                      </td>
                      <td className="p-3 text-muted-foreground">{item.termsAndConditions}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DataCard>
      </section>

      {/* Visual Timeline */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Refund Timeline Overview
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-sm text-muted-foreground mb-1">Before Academic Year</p>
            <p className="text-lg font-bold text-success">90% Refund</p>
            <p className="text-xs text-muted-foreground mt-2">10% deduction from downpayment</p>
          </div>
          <div className="p-4 rounded-lg bg-info/10 border border-info/20">
            <p className="text-sm text-muted-foreground mb-1">1st Month</p>
            <p className="text-lg font-bold text-info">50% of 1st Installment</p>
            <p className="text-xs text-muted-foreground mt-2">Deducted from refund</p>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <p className="text-sm text-muted-foreground mb-1">After 1st Month</p>
            <p className="text-lg font-bold text-warning">100% of 1st Installment</p>
            <p className="text-xs text-muted-foreground mt-2">Deducted from refund</p>
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-muted-foreground mb-1">After March 1, 2026</p>
            <p className="text-lg font-bold text-destructive">No Refund</p>
            <p className="text-xs text-muted-foreground mt-2">Total annual fee retained</p>
          </div>
        </div>
      </section>

      {/* Accommodation & Transportation Refund */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-primary" />
          Accommodation & Transportation Refund
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-4">
          <DataCard title="Egyptian Students" lastUpdated="2025-02-04" version="3.0">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Accommodation</span>
                </div>
                <p className="text-sm text-muted-foreground">{accommodationTransportRefund.egyptian.accommodation}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Bus className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Transportation</span>
                </div>
                <p className="text-sm text-muted-foreground">{accommodationTransportRefund.egyptian.transportation}</p>
              </div>
            </div>
          </DataCard>

          <DataCard title="International Students" lastUpdated="2025-02-04" version="3.0">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Accommodation</span>
                </div>
                <p className="text-sm text-muted-foreground">{accommodationTransportRefund.international.accommodation}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Bus className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Transportation</span>
                </div>
                <p className="text-sm text-muted-foreground">{accommodationTransportRefund.international.transportation}</p>
              </div>
            </div>
          </DataCard>
        </div>
      </section>

      {/* Refund Process */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Refund Process
        </h2>
        
        <DataCard title="How to Request a Refund" lastUpdated="2025-02-04" version="3.0">
          <div className="space-y-3">
            {refundProcess.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5 shrink-0">{index + 1}</Badge>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </DataCard>
      </section>

      {/* Important Notices */}
      <section className="mb-8">
        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Important Notices</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Application fees are non-refundable under any circumstances.</li>
                <li>• No refund is allowed for accommodation and transportation after the 2nd teaching week.</li>
                <li>• Bank transfers are only issued in the name of the applicant's legal guardian (father).</li>
                <li>• Refund processing takes 15 working days after providing bank details.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
