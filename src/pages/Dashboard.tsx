import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Languages, 
  CreditCard, 
  Home, 
  Bus, 
  Award,
  FileCheck,
  Search,
  TrendingUp
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { QuickTile } from '@/components/QuickTile';
import { DataCard } from '@/components/DataCard';
import { StatCard } from '@/components/StatCard';
import { faculties } from '@/data/faculties';
import { englishRequirements } from '@/data/english-requirements';
import { egyptianTuitionFees, installmentPlans, formatEGP } from '@/data/fees';
import { policies } from '@/data/policies';

interface DashboardProps {
  onSearchClick: () => void;
}

export const Dashboard = ({ onSearchClick }: DashboardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const recentUpdates = [
    { title: 'Tuition Fees 2025-2026', date: '2025-02-04', type: 'Updated' },
    { title: 'Faculty Programs', date: '2025-02-04', type: 'Updated' },
    { title: 'Scholarship Categories', date: '2025-02-04', type: 'Updated' },
    { title: 'Refund Policy', date: '2025-02-04', type: 'Updated' },
  ];

  // Calculate total programs
  const totalPrograms = faculties.reduce((acc, f) => acc + f.programs.length, 0);
  const statCards = [
    { title: 'Faculties', value: faculties.length, icon: GraduationCap, route: '/faculties' },
    { title: 'Programs', value: totalPrograms, icon: GraduationCap, route: '/faculties' },
    { title: 'English Tests', value: englishRequirements.length, icon: Languages, route: '/english' },
    { title: 'Fee Categories', value: 4, icon: CreditCard, route: '/fees' },
    { title: 'Scholarships', value: 4, icon: Award, route: '/policies/scholarship' },
    { title: 'Policies', value: policies.length, icon: FileCheck, route: '/policies/all' },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Welcome back"
        description={`${currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
      >
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Quick Search</span>
          <kbd className="hidden sm:inline-flex kbd bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">⌘K</kbd>
        </button>
      </PageHeader>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            route={card.route}
          />
        ))}
      </div>

      {/* Quick Access Tiles */}
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Quick Access - Frequently Requested
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <QuickTile
          title="Top Scholarship"
          value="Up to 40%"
          subtitle="Category A* Academic"
          icon={Award}
          href="/fees"
          variant="highlight"
        />
        <QuickTile
          title="IELTS Minimum"
          value="5.0"
          subtitle="Academic IELTS"
          icon={Languages}
          href="/english"
        />
        <QuickTile
          title="Engineering Tuition"
          value={formatEGP(290000)}
          subtitle="Category C - Per Year"
          icon={CreditCard}
          href="/fees"
        />
        <QuickTile
          title="Dentistry Tuition"
          value={formatEGP(330000)}
          subtitle="Category C - Per Year"
          icon={CreditCard}
          href="/fees"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Updates */}
        <DataCard title="Recent Updates" lastUpdated="2025-02-04" version="3.0">
          <div className="space-y-3">
            {recentUpdates.map((update, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-sm text-foreground">{update.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{update.date}</span>
              </div>
            ))}
          </div>
        </DataCard>

        {/* Quick Reference */}
        <DataCard title="Installment Schedule" lastUpdated="2025-02-04" version="3.0">
          <div className="space-y-3">
            {installmentPlans.map((plan, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <span className="text-sm font-medium">{plan.installment} ({plan.value})</span>
                <span className="text-sm text-muted-foreground">{plan.deadline}</span>
              </div>
            ))}
          </div>
        </DataCard>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickTile
          title="Tuition Fees"
          value="View All"
          subtitle="Egyptian & International"
          icon={CreditCard}
          href="/fees"
        />
        <QuickTile
          title="Accommodation"
          value="Dormitory"
          subtitle="On-campus options"
          icon={Home}
          href="/fees/accommodation"
        />
        <QuickTile
          title="Transportation"
          value="Bus Service"
          subtitle="Coverage & fees"
          icon={Bus}
          href="/fees/transportation"
        />
        <QuickTile
          title="Refund Policy"
          value="CPNU Rules"
          subtitle="View Timeline"
          icon={FileCheck}
          href="/policies/refund"
        />
      </div>
    </div>
  );
};
