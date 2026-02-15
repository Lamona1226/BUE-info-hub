import { cn } from '@/lib/utils';

interface VersionBadgeProps {
  lastUpdated: string;
  version: string;
  className?: string;
}

export const VersionBadge = ({ lastUpdated, version, className }: VersionBadgeProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={cn('version-badge', className)}>
      <span>v{version}</span>
      <span className="text-border">•</span>
      <span>Updated {formatDate(lastUpdated)}</span>
    </div>
  );
};
