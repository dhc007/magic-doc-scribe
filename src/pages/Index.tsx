import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { HowItWorks } from '@/components/HowItWorks';
import { CartDrawer } from '@/components/CartDrawer';
import { PartnerBanner } from '@/components/PartnerBanner';
import { products } from '@/data/products';

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState<{ partnerName?: string } | null>(null);

  useEffect(() => {
    // Capture partner parameters from URL
    const params = new URLSearchParams(window.location.search);
    const partnerId = params.get('partner_id');
    const partnerName = params.get('partner_name');
    const sourceType = params.get('source_type');

    if (partnerId && partnerName) {
      const info = { partnerId, partnerName, sourceType: sourceType || undefined };
      setPartnerInfo(info);
      // Store in localStorage for persistence
      localStorage.setItem('partnerInfo', JSON.stringify(info));
    } else {
      // Try to load from localStorage
      const stored = localStorage.getItem('partnerInfo');
      if (stored) {
        setPartnerInfo(JSON.parse(stored));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {partnerInfo?.partnerName && <PartnerBanner partnerName={partnerInfo.partnerName} />}
      
      <Header onCartClick={() => setCartOpen(true)} />
      
      <main>
        <Hero />
        
        <section id="catalog" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Electric Cycles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from our range of premium electric cycles. Perfect for city commutes, leisure rides, or adventures.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />

        <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied riders in Varanasi. Book your electric cycle today and experience sustainable transportation.
            </p>
            <a 
              href="https://wa.me/919999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all duration-300 font-semibold px-8 py-3 rounded-md">
                Contact Us on WhatsApp
              </button>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Blue Bolt Electric. Eco-friendly transportation for a better tomorrow.</p>
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;
