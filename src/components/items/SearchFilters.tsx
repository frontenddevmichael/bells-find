import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES, LOCATIONS, ItemCategory, ItemType } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: ItemType | 'all') => void;
  onCategoryChange: (category: ItemCategory | 'all') => void;
  onLocationChange: (location: string | 'all') => void;
  activeType: ItemType | 'all';
  activeCategory: ItemCategory | 'all';
  activeLocation: string | 'all';
}

export function SearchFilters({
  onSearch,
  onTypeChange,
  onCategoryChange,
  onLocationChange,
  activeType,
  activeCategory,
  activeLocation,
}: SearchFiltersProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const hasActiveFilters = activeType !== 'all' || activeCategory !== 'all' || activeLocation !== 'all';

  const clearFilters = () => {
    onTypeChange('all');
    onCategoryChange('all');
    onLocationChange('all');
    setQuery('');
    onSearch('');
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for lost or found items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
        <Button
          type="button"
          variant={showFilters ? 'secondary' : 'outline'}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {[activeType !== 'all', activeCategory !== 'all', activeLocation !== 'all'].filter(Boolean).length}
            </span>
          )}
        </Button>
      </form>

      {/* Filter Panel */}
      {showFilters && (
        <div className="rounded-xl border border-border bg-card p-4 shadow-soft animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-text-primary">Filters</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>

          {/* Type Filter */}
          <div className="mb-4">
            <label className="text-xs font-medium text-text-secondary mb-2 block">Type</label>
            <div className="flex flex-wrap gap-2">
              {(['all', 'lost', 'found'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-full border transition-all duration-base",
                    activeType === type
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-text-secondary border-border hover:border-primary/50 hover:text-text-primary"
                  )}
                >
                  {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="text-xs font-medium text-text-secondary mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onCategoryChange('all')}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-full border transition-all duration-base",
                  activeCategory === 'all'
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-text-secondary border-border hover:border-primary/50 hover:text-text-primary"
                )}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => onCategoryChange(cat.value)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-full border transition-all duration-base flex items-center gap-1",
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-text-secondary border-border hover:border-primary/50 hover:text-text-primary"
                  )}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <label className="text-xs font-medium text-text-secondary mb-2 block">Location</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onLocationChange('all')}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-full border transition-all duration-base",
                  activeLocation === 'all'
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-text-secondary border-border hover:border-primary/50 hover:text-text-primary"
                )}
              >
                All Locations
              </button>
              {LOCATIONS.slice(0, 6).map((loc) => (
                <button
                  key={loc}
                  onClick={() => onLocationChange(loc)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-full border transition-all duration-base",
                    activeLocation === loc
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-text-secondary border-border hover:border-primary/50 hover:text-text-primary"
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
