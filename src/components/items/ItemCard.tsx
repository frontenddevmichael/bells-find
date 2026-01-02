import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/types';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ItemCardProps {
  item: Item;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link to={`/item/${item.id}`}>
      <Card interactive className="overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">
              {item.type === 'lost' ? '🔍' : '📦'}
            </div>
          )}
          
          {/* Type Badge */}
          <Badge
            variant={item.type === 'lost' ? 'lost' : 'found'}
            className="absolute left-3 top-3"
          >
            {item.type === 'lost' ? 'Lost' : 'Found'}
          </Badge>
          
          {/* Status Badge (if not open) */}
          {item.status !== 'open' && (
            <Badge
              variant={item.status as any}
              className="absolute right-3 top-3"
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          
          <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">
            {item.description}
          </p>
          
          {/* Meta */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-text-tertiary">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {item.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(item.date)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
