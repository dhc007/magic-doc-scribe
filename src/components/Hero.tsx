import { Button } from '@/components/ui/button';
import { Zap, Leaf, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-cycle.jpg';

export const Hero = () => {
  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              <span>Eco-Friendly Transportation</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Ride the{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Future
              </span>
              {' '}Today
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Rent premium electric cycles in Varanasi. Affordable plans, instant booking via WhatsApp, and zero emissions. Start your eco-friendly journey now.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-secondary" />
                <span className="font-medium">50-70 km Range</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-secondary" />
                <span className="font-medium">Zero Emissions</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                <span className="font-medium">Quick Delivery</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                variant="hero"
                onClick={scrollToCatalog}
              >
                Browse Cycles
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.open('https://wa.me/919999999999', '_blank')}
              >
                Contact on WhatsApp
              </Button>
            </div>
          </div>

          <div className="relative lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl" />
              <img
                src={heroImage}
                alt="Electric Cycle"
                className="relative z-10 w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
