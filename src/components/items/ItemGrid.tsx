import { Item } from '@/types';
import { ItemCard } from './ItemCard';
import { Package } from 'lucide-react';

interface ItemGridProps {
  items: Item[];
  loading?: boolean;
  emptyMessage?: string;
}

export function ItemGrid({ items, loading = false, emptyMessage = 'No items found' }: ItemGridProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] rounded-t-xl bg-muted" />
            <div className="rounded-b-xl border border-t-0 border-border bg-card p-4">
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="mt-2 h-4 w-full rounded bg-muted" />
              <div className="mt-1 h-4 w-2/3 rounded bg-muted" />
              <div className="mt-3 flex gap-3">
                <div className="h-3 w-20 rounded bg-muted" />
                <div className="h-3 w-16 rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-text-primary">No items found</h3>
        <p className="mt-1 text-sm text-text-secondary">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
