import { Link, useLocation } from 'react-router-dom';
import { feesModuleNavTabs } from '@/data/fees-module';
import { cn } from '@/lib/utils';

export const FeesModuleNav = () => {
  const location = useLocation();

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 whitespace-nowrap pb-2">
        {feesModuleNavTabs.map((tab) => {
          const isActive = location.pathname === tab.path;

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
