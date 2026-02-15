import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface QuickTileProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  href: string;
  variant?: 'default' | 'highlight';
}

export const QuickTile = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  href,
  variant = 'default'
}: QuickTileProps) => {
  return (
    <Link 
      to={href}
      className={cn(
        'quick-tile block group transition-all duration-300 ease-out cursor-pointer hover:bg-none hover:bg-primary hover:border-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:bg-none focus-visible:bg-primary focus-visible:border-primary focus-visible:text-primary-foreground',
        variant === 'highlight' && 'border-secondary/50 bg-gradient-to-br from-card to-secondary/5 hover:from-primary hover:to-primary focus-visible:from-primary focus-visible:to-primary'
      )}
    >
      <div className="quick-tile-icon transition-colors duration-300 ease-out group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground group-focus-visible:bg-primary-foreground/20 group-focus-visible:text-primary-foreground">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-muted-foreground mb-1 transition-colors duration-300 ease-out group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
        {title}
      </p>
      <p className="text-2xl font-bold text-foreground transition-colors duration-300 ease-out group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1 transition-colors duration-300 ease-out group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
          {subtitle}
        </p>
      )}
    </Link>
  );
};
