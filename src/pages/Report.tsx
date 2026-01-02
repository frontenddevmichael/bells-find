import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CATEGORIES, LOCATIONS, ItemType, ItemCategory } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowLeft, Upload, X, Calendar, MapPin, FileText, Tag, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Report() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialType = searchParams.get('type') as ItemType | null;

  const [step, setStep] = useState(1);
  const [type, setType] = useState<ItemType | null>(initialType);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as ItemCategory | '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!type || !formData.title || !formData.description || !formData.category || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Item reported successfully!', {
      description: 'Your item has been posted and is now visible to the campus community.',
    });
    
    navigate('/browse');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return type !== null;
      case 2:
        return formData.title && formData.category;
      case 3:
        return formData.description && formData.location && formData.date;
      default:
        return true;
    }
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-8">
        {/* Header */}
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Report an Item</h1>
          <p className="mt-2 text-text-secondary">
            Help reunite lost items with their owners
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all",
                  s < step
                    ? "bg-success text-success-foreground"
                    : s === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {s < step ? <CheckCircle className="h-4 w-4" /> : s}
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-all duration-base"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-text-tertiary">
            <span>Type</span>
            <span>Basic Info</span>
            <span>Details</span>
            <span>Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Type */}
          {step === 1 && (
            <Card className="animate-fade-up">
              <CardHeader>
                <CardTitle>What would you like to report?</CardTitle>
                <CardDescription>Choose whether you lost or found an item</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setType('lost')}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all",
                    type === 'lost'
                      ? "border-destructive bg-destructive-muted"
                      : "border-border hover:border-destructive/50"
                  )}
                >
                  <span className="text-4xl mb-3">🔍</span>
                  <span className="text-lg font-semibold text-text-primary">Lost Item</span>
                  <span className="text-sm text-text-secondary mt-1">I lost something</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('found')}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all",
                    type === 'found'
                      ? "border-success bg-success-muted"
                      : "border-border hover:border-success/50"
                  )}
                >
                  <span className="text-4xl mb-3">📦</span>
                  <span className="text-lg font-semibold text-text-primary">Found Item</span>
                  <span className="text-sm text-text-secondary mt-1">I found something</span>
                </button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <Card className="animate-fade-up">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Tell us what the item is</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">
                    <FileText className="inline h-4 w-4 mr-1" />
                    Title *
                  </label>
                  <Input
                    placeholder="e.g., Black iPhone 15 Pro"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    maxLength={100}
                  />
                  <p className="text-xs text-text-tertiary mt-1">{formData.title.length}/100 characters</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">
                    <Tag className="inline h-4 w-4 mr-1" />
                    Category *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                        className={cn(
                          "flex flex-col items-center p-3 rounded-lg border text-sm transition-all",
                          formData.category === cat.value
                            ? "border-primary bg-accent text-accent-foreground"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-xl mb-1">{cat.icon}</span>
                        <span className="text-xs">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <Card className="animate-fade-up">
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>Provide more details to help identify the item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">
                    Description *
                  </label>
                  <textarea
                    placeholder="Describe the item in detail. Include any distinguishing features, contents, or identifying marks..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="flex min-h-[120px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-xs transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    maxLength={500}
                  />
                  <p className="text-xs text-text-tertiary mt-1">{formData.description.length}/500 characters</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location *
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-xs transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select location</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">
                    <ImageIcon className="inline h-4 w-4 mr-1" />
                    Photo (optional)
                  </label>
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full aspect-video object-cover rounded-lg border border-border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-text-secondary">Click to upload an image</span>
                      <span className="text-xs text-text-tertiary mt-1">PNG, JPG up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <Card className="animate-fade-up">
              <CardHeader>
                <CardTitle>Review Your Report</CardTitle>
                <CardDescription>Make sure everything looks correct before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Item"
                    className="w-full aspect-video object-cover rounded-lg border border-border"
                  />
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      type === 'lost' ? "bg-destructive-muted text-destructive" : "bg-success-muted text-success"
                    )}>
                      {type === 'lost' ? 'Lost' : 'Found'}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                      {CATEGORIES.find(c => c.value === formData.category)?.label}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-text-primary">{formData.title}</h3>
                  <p className="text-text-secondary">{formData.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-text-tertiary">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {formData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(formData.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-accent/50 p-4">
                  <p className="text-sm text-text-secondary">
                    By submitting this report, you agree to be contacted by other users who may have information about this item. Your contact information will only be shared with verified claimants.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div />
            )}
            
            {step < 4 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}
