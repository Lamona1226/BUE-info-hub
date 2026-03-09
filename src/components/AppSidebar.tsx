import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileCheck, 
  Languages,
  CreditCard, 
  ScrollText,
  GitCompare,
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPinned
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AppSidebarProps {
  onSearchClick: () => void;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/faculties', label: 'Faculties', icon: GraduationCap },
  { path: '/requirements', label: 'Requirements', icon: FileCheck },
  { path: '/english', label: 'English Tests', icon: Languages },
  { path: '/fees', label: 'Fees', icon: CreditCard, children: [
    { path: '/fees', label: 'Fees' },
    { path: '/fees/down-payment', label: 'Down Payment' },
    { path: '/fees/accommodation', label: 'Accommodation' },
    { path: '/fees/transportation', label: 'Transportation' },
  ]},
  { path: '/policies', label: 'Policies', icon: ScrollText, children: [
    { path: '/policies/all', label: 'Policies' },
    { path: '/policies/refund', label: 'Refund Policy' },
    { path: '/policies/scholarship', label: 'Scholarship Policy' },
  ]},
  { path: '/contacts', label: 'Contacts', icon: Phone },
  { path: '/map', label: 'Map', icon: MapPinned },
  { path: '/compare', label: 'Compare', icon: GitCompare },
];

export const AppSidebar = ({ onSearchClick }: AppSidebarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground z-50 flex flex-col transition-transform duration-300',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Admissions Hub</h1>
              <p className="text-xs text-sidebar-foreground/60 mt-0.5">Staff Information Portal</p>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-sidebar-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Button */}
        <div className="p-4">
          <button
            onClick={() => {
              onSearchClick();
              setMobileOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Search...</span>
            <kbd className="ml-auto kbd text-xs bg-sidebar-accent border-sidebar-border">⌘K</kbd>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (item.children) {
              return (
                <Collapsible key={item.path} defaultOpen={isActive(item.path)}>
                  <CollapsibleTrigger className="w-full">
                    <div className={cn(
                      'nav-link justify-between',
                      isActive(item.path) && 'nav-link-active'
                    )}>
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'block px-3 py-2 rounded-lg text-sm transition-colors',
                            isActive(child.path) 
                              ? 'bg-sidebar-accent text-sidebar-foreground' 
                              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            }
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'nav-link',
                  isActive(item.path) && 'nav-link-active'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/50">
            <p>Last system update</p>
            <p className="font-medium text-sidebar-foreground/70">February 4, 2025</p>
          </div>
        </div>
      </aside>
    </>
  );
};
