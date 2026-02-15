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
        'quick-tile block group',
        variant === 'highlight' && 'border-secondary/50 bg-gradient-to-br from-card to-secondary/5'
      )}
    >
      <div className="quick-tile-icon">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
    </Link>
  );
};
