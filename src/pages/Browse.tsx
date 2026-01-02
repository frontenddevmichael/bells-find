import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SearchFilters } from '@/components/items/SearchFilters';
import { ItemGrid } from '@/components/items/ItemGrid';
import { mockItems } from '@/data/mockData';
import { ItemType, ItemCategory } from '@/types';

export default function Browse() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') as ItemType | null;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<ItemType | 'all'>(initialType || 'all');
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'all'>('all');
  const [activeLocation, setActiveLocation] = useState<string | 'all'>('all');

  const filteredItems = useMemo(() => {
    return mockItems.filter((item) => {
      // Type filter
      if (activeType !== 'all' && item.type !== activeType) return false;
      
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      
      // Location filter
      if (activeLocation !== 'all' && item.location !== activeLocation) return false;
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
        );
      }
      
      return true;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [searchQuery, activeType, activeCategory, activeLocation]);

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Browse Items</h1>
          <p className="mt-2 text-text-secondary">
            Search through {mockItems.length} lost and found items on campus
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <SearchFilters
            onSearch={setSearchQuery}
            onTypeChange={setActiveType}
            onCategoryChange={setActiveCategory}
            onLocationChange={setActiveLocation}
            activeType={activeType}
            activeCategory={activeCategory}
            activeLocation={activeLocation}
          />
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-text-secondary">
          Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          {activeType !== 'all' && ` · ${activeType}`}
          {activeCategory !== 'all' && ` · ${activeCategory}`}
          {activeLocation !== 'all' && ` · ${activeLocation}`}
        </div>

        {/* Items Grid */}
        <ItemGrid 
          items={filteredItems} 
          emptyMessage="Try adjusting your filters or search query"
        />
      </div>
    </Layout>
  );
}
