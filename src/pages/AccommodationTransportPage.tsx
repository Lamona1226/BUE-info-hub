import { Home, Bus, AlertCircle, Info, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { DataCard } from '@/components/DataCard';
import { Badge } from '@/components/ui/badge';
import { accommodationTransportRefund, accommodationFees, transportationFees, formatEGP } from '@/data/fees';

export const AccommodationTransportPage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Accommodation & Transportation"
        description="Dormitory and bus service fees for Academic Year 2025-2026"
      />

      {/* Accommodation Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-primary" />
          Dormitory Fees
        </h2>
        
        <DataCard title="On-Campus Accommodation" lastUpdated="2025-02-05" version="4.0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold">Room Type</th>
                  <th className="text-right p-3 font-semibold">Annual Fee (EGP)</th>
                </tr>
              </thead>
              <tbody>
                {accommodationFees.map((fee, index) => (
                  <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <span className="font-medium text-foreground">{fee.roomType}</span>
                    </td>
                    <td className="text-right p-3 font-mono text-lg">{formatEGP(fee.feePerYear)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataCard>
      </section>

      {/* Transportation Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Bus className="w-5 h-5 text-primary" />
          Transportation (Bus) Fees
        </h2>
        
        <DataCard title="Campus Bus Service by Area" lastUpdated="2025-02-05" version="4.0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Bus Area / Zone
                    </div>
                  </th>
                  <th className="text-right p-3 font-semibold">Annual Fee (EGP)</th>
                </tr>
              </thead>
              <tbody>
                {transportationFees.map((fee, index) => (
                  <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <span className="font-medium text-foreground">{fee.area}</span>
                    </td>
                    <td className="text-right p-3 font-mono text-lg">{formatEGP(fee.feePerYear)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Transportation fees are payable in Egyptian Pounds (EGP) for both Egyptian and International students.
            </p>
          </div>
        </DataCard>
      </section>

      {/* Refund Policy for Accommodation & Transport */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Refund Policy
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-4">
          <DataCard title="Egyptian Students" lastUpdated="2025-02-05" version="4.0">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Accommodation Refund</span>
                </div>
                <p className="text-sm text-muted-foreground">{accommodationTransportRefund.egyptian.accommodation}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Bus className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Transportation Refund</span>
                </div>
                <p className="text-sm text-muted-foreground">{accommodationTransportRefund.egyptian.transportation}</p>
              </div>
            </div>
          </DataCard>

          <DataCard title="International Students" lastUpdated="2025-02-05" version="4.0">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Accommodation Refund</span>
                </div>
                <p className="text-sm text-muted-foreground">{accommodationTransportRefund.international.accommodation}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Bus className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Transportation Refund</span>
                </div>
                <p className="text-sm text-muted-foreground">{accommodationTransportRefund.international.transportation}</p>
              </div>
            </div>
          </DataCard>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-warning/10 border border-warning/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Important Notice</p>
              <p className="text-sm text-muted-foreground mt-1">
                No refund is allowed after the 2nd teaching week for both accommodation and transportation fees.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
