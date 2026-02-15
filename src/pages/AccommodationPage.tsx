import { useMemo, useState } from 'react';
import { Home, ArrowDownUp } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { FeesModuleNav } from '@/components/FeesModuleNav';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { accommodationOptions, accommodationTransportCopy, formatEGP } from '@/data/fees';

export const AccommodationPage = () => {
  const [sortByPrice, setSortByPrice] = useState(true);

  const sortedOptions = useMemo(() => {
    if (!sortByPrice) {
      return accommodationOptions;
    }
    return [...accommodationOptions].sort((a, b) => a.feePerYear - b.feePerYear);
  }, [sortByPrice]);

  const lowest = sortedOptions[0];
  const highest = sortedOptions[sortedOptions.length - 1];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Accommodation"
        description="Dormitory options with quick compare pricing."
      />
      <FeesModuleNav />

      <section className="mt-6 space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowDownUp className="h-4 w-4" />
            <span>{accommodationTransportCopy.sortByPriceLabel}</span>
          </div>
          <Switch checked={sortByPrice} onCheckedChange={setSortByPrice} />
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <p className="text-sm font-medium text-foreground mb-3">
            {accommodationTransportCopy.compareTitle}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {lowest && (
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {accommodationTransportCopy.compareLabels.lowest}
                  </p>
                  <p className="font-medium text-foreground">{lowest.name}</p>
                </div>
                <Badge variant="outline">{formatEGP(lowest.feePerYear)}</Badge>
              </div>
            )}
            {highest && (
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {accommodationTransportCopy.compareLabels.highest}
                  </p>
                  <p className="font-medium text-foreground">{highest.name}</p>
                </div>
                <Badge variant="outline">{formatEGP(highest.feePerYear)}</Badge>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sortedOptions.map((option) => (
            <div key={option.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground">{option.name}</h3>
                </div>
                <Badge variant="secondary">{option.compareTag}</Badge>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Annual fee</span>
                <Badge className="bg-primary text-primary-foreground">{formatEGP(option.feePerYear)}</Badge>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {option.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
