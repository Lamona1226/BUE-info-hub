import { useMemo, useState } from 'react';
import { Home, ArrowDownUp } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { FeesModuleNav } from '@/components/FeesModuleNav';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  accommodationOptions,
  accommodationTransportCopy,
  formatEGP,
  formatGBP,
  internationalAccommodationOptions,
  type AccommodationOption,
} from '@/data/fees';

export const AccommodationPage = () => {
  const [sortByPrice, setSortByPrice] = useState(true);

  const insuranceFee = 10000;

  const sortedEgyptianOptions = useMemo(() => {
    if (!sortByPrice) {
      return accommodationOptions;
    }
    return [...accommodationOptions].sort((a, b) => a.feePerYear - b.feePerYear);
  }, [sortByPrice]);

  const sortedInternationalOptions = useMemo(() => {
    if (!sortByPrice) {
      return internationalAccommodationOptions;
    }
    return [...internationalAccommodationOptions].sort((a, b) => a.feePerYear - b.feePerYear);
  }, [sortByPrice]);

  const renderAccommodationSection = (
    title: string,
    currencyLabel: string,
    badgeClassName: string,
    options: AccommodationOption[],
    formatPrice: (value: number) => string
  ) => {
    const lowest = options[0];
    const highest = options[options.length - 1];

    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <Badge className={badgeClassName}>{currencyLabel}</Badge>
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
                <Badge variant="outline">{formatPrice(lowest.feePerYear)}</Badge>
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
                <Badge variant="outline">{formatPrice(highest.feePerYear)}</Badge>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {options.map((option) => (
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
                <Badge className="bg-primary text-primary-foreground">{formatPrice(option.feePerYear)}</Badge>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {option.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Insurance Fee</p>
            <Badge variant="outline">{formatEGP(insuranceFee)}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Applies to both Egyptian and International students.
          </p>
        </div>
      </section>
    );
  };

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

        {renderAccommodationSection(
          'Egyptian Accommodation',
          'EGP',
          'bg-emerald-100 text-emerald-700 border border-emerald-200',
          sortedEgyptianOptions,
          formatEGP
        )}

        {renderAccommodationSection(
          'International Accommodation',
          'GBP',
          'bg-blue-100 text-blue-700 border border-blue-200',
          sortedInternationalOptions,
          formatGBP
        )}
      </section>
    </div>
  );
};
