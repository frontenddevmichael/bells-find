import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getItemById, mockItems } from '@/data/mockData';
import { ItemCard } from '@/components/items/ItemCard';
import { ArrowLeft, MapPin, Calendar, User, Clock, MessageCircle, Flag, Share2 } from 'lucide-react';
import { CATEGORIES } from '@/types';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = getItemById(id || '');

  if (!item) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-text-primary">Item not found</h1>
          <p className="mt-2 text-text-secondary">The item you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-6" onClick={() => navigate('/browse')}>
            Browse Items
          </Button>
        </div>
      </Layout>
    );
  }

  const category = CATEGORIES.find(c => c.value === item.category);
  const similarItems = mockItems
    .filter(i => i.id !== item.id && (i.category === item.category || i.location === item.location))
    .slice(0, 3);

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted border border-border">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl">
                  {item.type === 'lost' ? '🔍' : '📦'}
                </div>
              )}
              <Badge
                variant={item.type === 'lost' ? 'lost' : 'found'}
                className="absolute left-4 top-4 text-sm"
              >
                {item.type === 'lost' ? 'Lost' : 'Found'}
              </Badge>
            </div>

            {/* Details Card */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant={item.status as any}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                      {category && (
                        <Badge variant="outline">
                          {category.icon} {category.label}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium text-text-secondary mb-2">Description</h3>
                  <p className="text-text-primary leading-relaxed">{item.description}</p>
                </div>

                {/* Meta Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-text-tertiary">Location</div>
                      <div className="text-sm font-medium text-text-primary">{item.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-text-tertiary">Date</div>
                      <div className="text-sm font-medium text-text-primary">{formatDate(item.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-text-tertiary">Posted</div>
                      <div className="text-sm font-medium text-text-primary">
                        {formatDate(item.createdAt)} at {formatTime(item.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-text-tertiary">Reported by</div>
                      <div className="text-sm font-medium text-text-primary">@{item.user?.username}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Claim Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {item.type === 'lost' ? 'Found this item?' : 'Is this yours?'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-text-secondary">
                  {item.type === 'lost'
                    ? 'If you found this item, contact the owner to help return it.'
                    : 'If you believe this is your item, submit a claim with proof of ownership.'}
                </p>
                <Button className="w-full" asChild>
                  <Link to={`/claim/${item.id}`}>
                    <MessageCircle className="h-4 w-4" />
                    {item.type === 'lost' ? 'Contact Owner' : 'Claim This Item'}
                  </Link>
                </Button>
                <p className="text-xs text-text-tertiary text-center">
                  You'll need to verify ownership before claiming
                </p>
              </CardContent>
            </Card>

            {/* Similar Items */}
            {similarItems.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Similar Items</h3>
                <div className="space-y-4">
                  {similarItems.map((similarItem) => (
                    <ItemCard key={similarItem.id} item={similarItem} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
