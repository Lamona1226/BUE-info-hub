import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Clock, GraduationCap, Languages, FileCheck, CreditCard, Home, Bus, ScrollText, Phone } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { searchAll, SearchResult, getRecentSearches, addRecentSearch } from '@/lib/search';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Languages,
  FileCheck,
  CreditCard,
  Home,
  Bus,
  ScrollText,
  Phone,
};

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommandSearch = ({ open, onOpenChange }: CommandSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setRecentSearches(getRecentSearches());
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const searchResults = searchAll(query);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = useCallback((result: SearchResult) => {
    addRecentSearch(query);
    onOpenChange(false);
    navigate(result.path);
  }, [query, navigate, onOpenChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  }, [results, selectedIndex, handleSelect]);

  const typeLabels: Record<string, string> = {
    faculty: 'Faculty',
    english: 'English Req.',
    admission: 'Admission',
    tuition: 'Tuition',
    accommodation: 'Housing',
    transportation: 'Transport',
    policy: 'Policy',
    contact: 'Contact',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-2xl overflow-hidden bg-card border-border shadow-2xl animate-command-appear">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search faculties, requirements, fees, policies..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
          <div className="flex items-center gap-1">
            <kbd className="kbd">Esc</kbd>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Recent Searches
              </p>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{search}</span>
                </button>
              ))}
            </div>
          )}

          {query.length > 0 && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No results found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-1">Try searching for faculties, IELTS, tuition, or policies</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2">
              {results.map((result, index) => {
                const IconComponent = iconMap[result.icon] || FileCheck;
                return (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={cn(
                      'w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-colors text-left group',
                      index === selectedIndex ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    )}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      index === selectedIndex ? 'bg-primary-foreground/20' : 'bg-muted'
                    )}>
                      <IconComponent className={cn(
                        'w-5 h-5',
                        index === selectedIndex ? 'text-primary-foreground' : 'text-primary'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'font-medium truncate',
                        index === selectedIndex ? 'text-primary-foreground' : 'text-foreground'
                      )}>
                        {result.title}
                      </p>
                      <p className={cn(
                        'text-sm truncate',
                        index === selectedIndex ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      )}>
                        {result.subtitle}
                      </p>
                    </div>
                    <span className={cn(
                      'text-xs px-2 py-1 rounded-full flex-shrink-0',
                      index === selectedIndex 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {typeLabels[result.type]}
                    </span>
                    <ArrowRight className={cn(
                      'w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity',
                      index === selectedIndex ? 'text-primary-foreground opacity-100' : 'text-muted-foreground'
                    )} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border bg-muted/50 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="kbd">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="kbd">Enter</kbd> Select
            </span>
          </div>
          <span>⌘K to search anytime</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
