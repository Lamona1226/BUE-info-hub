import { FileText, Wallet } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { FeesModuleNav } from '@/components/FeesModuleNav';
import { DataCard } from '@/components/DataCard';
import { applicationFees, downPaymentFees, formatEGP, formatGBP } from '@/data/fees';

export const DownPaymentPage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Down Payment & Application Fees"
        description="Down payment schedule by faculty with application fee reference."
      />
      <FeesModuleNav />

      <section className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <DataCard title="Down Payment">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-semibold">Faculty</th>
                  <th className="text-left p-3 font-semibold">Egyptian</th>
                  <th className="text-left p-3 font-semibold">International</th>
                </tr>
              </thead>
              <tbody>
                {downPaymentFees.map((row) => (
                  <tr key={row.faculty} className="border-t border-border">
                    <td className="p-3 font-medium text-foreground">{row.faculty}</td>
                    <td className="p-3 text-muted-foreground">{formatEGP(row.egyptian)}</td>
                    <td className="p-3 text-muted-foreground">{formatGBP(row.international)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataCard>

        <div className="space-y-6">
          <DataCard title="Application Fees">
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Egyptian</p>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {formatEGP(applicationFees.egyptian)}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">International</p>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {formatGBP(applicationFees.international)}
                </p>
              </div>
            </div>
          </DataCard>
        </div>
      </section>
    </div>
  );
};
