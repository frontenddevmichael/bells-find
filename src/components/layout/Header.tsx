import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Plus, Bell, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Browse', href: '/browse' },
  { name: 'Lost Items', href: '/browse?type=lost' },
  { name: 'Found Items', href: '/browse?type=found' },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background-elevated/80 backdrop-blur-xl">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-soft">
              <span className="text-lg font-bold text-primary-foreground">B</span>
            </div>
            <span className="text-lg font-semibold text-text-primary">Bells Find</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors duration-base",
                  location.pathname === item.href || 
                  (item.href.includes('?') && location.pathname + location.search === item.href)
                    ? "text-text-primary bg-secondary"
                    : "text-text-secondary hover:text-text-primary hover:bg-secondary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/browse">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button asChild>
              <Link to="/report">
                <Plus className="h-4 w-4" />
                Report Item
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "text-text-primary bg-secondary"
                      : "text-text-secondary hover:text-text-primary hover:bg-secondary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              <Link
                to="/report"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-primary"
              >
                <Plus className="h-4 w-4" />
                Report Item
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-text-secondary"
              >
                <User className="h-4 w-4" />
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
