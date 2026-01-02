import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ItemCard } from '@/components/items/ItemCard';
import { mockItems } from '@/data/mockData';
import { Search, Plus, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react';

const recentItems = mockItems.slice(0, 4);

const stats = [
  { label: 'Items Reported', value: '1,247' },
  { label: 'Items Returned', value: '892' },
  { label: 'Active Users', value: '3.2k' },
  { label: 'Success Rate', value: '72%' },
];

const features = [
  {
    icon: Search,
    title: 'Easy Discovery',
    description: 'Search and filter through lost and found items with powerful search tools.',
  },
  {
    icon: Shield,
    title: 'Secure Claims',
    description: 'Verify ownership through our secure claim process before items are returned.',
  },
  {
    icon: Users,
    title: 'Campus Community',
    description: 'Connect with fellow students and staff to reunite lost items with owners.',
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background-elevated border-b border-border">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-text-secondary mb-6 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              Trusted by 3,200+ Bells University students
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl animate-fade-up">
              Lost something on campus?
              <span className="block text-primary mt-2">We'll help you find it.</span>
            </h1>
            
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
              Bells Find connects our campus community to report lost items, discover found belongings, and reunite possessions with their rightful owners.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <Button size="xl" asChild>
                <Link to="/report">
                  <Plus className="h-5 w-5" />
                  Report an Item
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/browse">
                  <Search className="h-5 w-5" />
                  Browse Items
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-border bg-card/50">
          <div className="container py-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center animate-fade-up" style={{ animationDelay: `${(i + 3) * 100}ms` }}>
                  <div className="text-2xl font-bold text-text-primary md:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Recent Items</h2>
              <p className="mt-1 text-text-secondary">Latest lost and found reports from campus</p>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/browse">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentItems.map((item, i) => (
              <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-background-elevated border-y border-border">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl">How Bells Find Works</h2>
            <p className="mt-3 text-text-secondary">
              Simple, secure, and designed for our campus community
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <Card key={feature.title} className="p-6 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <feature.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container">
          <Card className="relative overflow-hidden bg-primary p-8 md:p-12">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
                Found or lost something?
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                Report it now and help connect our campus community. Every item reported increases the chance of reunion.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/report?type=lost">
                    Report Lost Item
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/report?type=found">
                    Report Found Item
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
