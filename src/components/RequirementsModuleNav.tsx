import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface RequirementsModuleNavProps {
  currentCertificate?: string;
}

export const RequirementsModuleNav = ({ currentCertificate }: RequirementsModuleNavProps) => {
  const location = useLocation();

  const requirementNavTabs = [
    { label: 'Requirements', path: '/requirements' },
    { label: 'Minimum Admission', path: '/requirements/minimum-admission' },
    {
      label: 'View Details',
      path: currentCertificate ? `/requirements/${encodeURIComponent(currentCertificate)}` : '/requirements',
      disabled: !currentCertificate,
    },
  ];

  return (
    <div className="w-full overflow-x-auto mb-6">
      <div className="flex gap-2 whitespace-nowrap pb-2">
        {requirementNavTabs.map((tab) => {
          const isDetailsPath = tab.label === 'View Details';
          const isActive = isDetailsPath
            ? location.pathname.startsWith('/requirements/') && location.pathname !== '/requirements'
            : location.pathname === tab.path;

          if (tab.disabled) {
            return (
              <span
                key={tab.label}
                className="px-4 py-2 rounded-full text-sm font-medium border bg-muted text-muted-foreground border-border cursor-not-allowed"
              >
                {tab.label}
              </span>
            );
          }

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:bg-muted'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
