import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-elevated">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">B</span>
            </div>
            <span className="text-sm font-medium text-text-primary">Bells Find</span>
          </div>
          
          <nav className="flex items-center gap-6">
            <Link to="/about" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              About
            </Link>
            <Link to="/help" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Help
            </Link>
            <Link to="/contact" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Contact
            </Link>
          </nav>
          
          <p className="text-sm text-text-tertiary">
            © 2025 Bells University of Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
