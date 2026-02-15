import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { VersionBadge } from './VersionBadge';

interface DataCardProps {
  title: string;
  children: ReactNode;
  lastUpdated?: string;
  version?: string;
  className?: string;
  headerAction?: ReactNode;
}

export const DataCard = ({ 
  title, 
  children, 
  lastUpdated, 
  version,
  className,
  headerAction
}: DataCardProps) => {
  return (
    <div className={cn('bg-card rounded-xl border border-border overflow-hidden', className)}>
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-3">
          {lastUpdated && version && (
            <VersionBadge lastUpdated={lastUpdated} version={version} />
          )}
          {headerAction}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
