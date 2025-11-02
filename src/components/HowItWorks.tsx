import { ShoppingBag, MessageSquare, Zap } from 'lucide-react';

const steps = [
  {
    icon: ShoppingBag,
    title: 'Browse & Book',
    description: 'Choose your perfect electric cycle, select rental duration, and add to cart'
  },
  {
    icon: Zap,
    title: 'Quick Checkout',
    description: 'Complete your booking details and identity verification in minutes'
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Support',
    description: 'Get payment link and all updates directly on WhatsApp'
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rent an electric cycle in three simple steps. Fast, easy, and hassle-free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30" />
                  <div className="relative bg-background border-2 border-primary rounded-full p-6">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-secondary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
