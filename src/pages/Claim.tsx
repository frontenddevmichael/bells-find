import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getItemById } from '@/data/mockData';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Claim() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = getItemById(id || '');
  
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!item) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-text-primary">Item not found</h1>
          <p className="mt-2 text-text-secondary">The item you're looking for doesn't exist.</p>
          <Button className="mt-6" onClick={() => navigate('/browse')}>
            Browse Items
          </Button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Please provide details about your claim');
      return;
    }

    if (message.length < 20) {
      toast.error('Please provide more details (at least 20 characters)');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="container max-w-lg py-16">
          <Card className="text-center">
            <CardContent className="pt-10 pb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-muted mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Claim Submitted</h2>
              <p className="text-text-secondary mb-6">
                Your claim has been sent to the item's reporter. They will review your message and respond soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => navigate('/browse')}>
                  Browse More Items
                </Button>
                <Button onClick={() => navigate(`/item/${item.id}`)}>
                  View Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-2xl py-8">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">
            {item.type === 'lost' ? 'Contact Owner' : 'Claim This Item'}
          </h1>
          <p className="mt-2 text-text-secondary">
            {item.type === 'lost' 
              ? 'Let the owner know you found their item'
              : 'Provide details to verify your ownership'
            }
          </p>
        </div>

        {/* Item Preview */}
        <Card className="mb-6">
          <CardContent className="flex gap-4 p-4">
            <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-muted overflow-hidden">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-2xl">
                  {item.type === 'lost' ? '🔍' : '📦'}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant={item.type === 'lost' ? 'lost' : 'found'} className="mb-1">
                {item.type === 'lost' ? 'Lost' : 'Found'}
              </Badge>
              <h3 className="font-semibold text-text-primary truncate">{item.title}</h3>
              <p className="text-sm text-text-secondary truncate">{item.location}</p>
            </div>
          </CardContent>
        </Card>

        {/* Claim Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {item.type === 'lost' ? 'Your Message' : 'Verify Ownership'}
            </CardTitle>
            <CardDescription>
              {item.type === 'lost'
                ? 'Describe how you found the item and how to contact you'
                : 'Describe the item in detail to prove it belongs to you. Include any unique identifiers or contents.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <textarea
                  placeholder={
                    item.type === 'lost'
                      ? "Hi! I believe I found your item. It was [describe where/how you found it]. You can reach me at..."
                      : "This is my item. I can identify it by [specific details, scratches, contents, etc.]. I lost it on [date] at [location]..."
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex min-h-[160px] w-full rounded-md border border-border bg-card px-3 py-3 text-sm text-foreground shadow-xs transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  maxLength={1000}
                />
                <p className="text-xs text-text-tertiary mt-2">{message.length}/1000 characters</p>
              </div>

              {/* Warning */}
              <div className="flex gap-3 p-4 rounded-lg bg-warning-muted">
                <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-text-primary mb-1">Important</p>
                  <p className="text-text-secondary">
                    {item.type === 'lost'
                      ? 'Only contact the owner if you genuinely found their item. False claims may result in account suspension.'
                      : 'Only submit a claim if this is truly your item. False claims may result in account suspension.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
