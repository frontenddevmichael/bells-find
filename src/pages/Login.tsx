import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'register';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (mode === 'register') {
      if (!formData.username) {
        toast.error('Username is required');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (formData.password.length < 8) {
        toast.error('Password must be at least 8 characters');
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (mode === 'login') {
      toast.success('Welcome back!');
    } else {
      toast.success('Account created successfully!');
    }
    
    navigate('/');
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
              <span className="text-xl font-bold text-primary-foreground">B</span>
            </div>
            <span className="text-xl font-semibold text-text-primary">Bells Find</span>
          </Link>

          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl">
                {mode === 'login' ? 'Welcome back' : 'Create an account'}
              </CardTitle>
              <CardDescription>
                {mode === 'login' 
                  ? 'Sign in to your account to continue'
                  : 'Join the Bells Find community'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              {/* Mode Tabs */}
              <div className="flex rounded-lg bg-muted p-1 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                    mode === 'login'
                      ? "bg-card text-text-primary shadow-soft"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                    mode === 'register'
                      ? "bg-card text-text-primary shadow-soft"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="text-sm font-medium text-text-primary mb-2 block">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="you@bellstech.edu"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-text-primary">
                      Password
                    </label>
                    {mode === 'login' && (
                      <Link to="/forgot-password" className="text-xs text-text-link hover:underline">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-text-primary"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="text-sm font-medium text-text-primary mb-2 block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    'Please wait...'
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-text-secondary">
                {mode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="font-medium text-text-link hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-medium text-text-link hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent to-muted">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <div className="max-w-md text-center">
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Campus Lost & Found Made Easy
              </h2>
              <p className="text-text-secondary">
                Join thousands of Bells University students and staff in reuniting lost items with their rightful owners.
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-12 left-12 right-12 grid grid-cols-3 gap-4">
              {[
                { emoji: '📱', label: 'Electronics' },
                { emoji: '📚', label: 'Books' },
                { emoji: '🎒', label: 'Bags' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center p-4 rounded-xl bg-card/80 backdrop-blur shadow-soft">
                  <span className="text-2xl mb-1">{item.emoji}</span>
                  <span className="text-xs text-text-secondary">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
