import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  route: string;
}

export const StatCard = ({ title, value, icon: Icon, route }: StatCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(route)}
      className="stat-card group w-full text-left cursor-pointer shadow-sm transition-all duration-300 ease-out hover:from-primary hover:to-primary hover:border-primary hover:text-primary-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:from-primary focus-visible:to-primary focus-visible:border-primary focus-visible:text-primary-foreground focus-visible:shadow-md"
      aria-label={`Go to ${title}`}
    >
      <div className="mb-2 flex items-center gap-2 text-primary transition-colors duration-300 ease-out group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium">{title}</span>
      </div>
      <p className="text-2xl font-bold text-foreground transition-colors duration-300 ease-out group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
        {value}
      </p>
    </button>
  );
};
