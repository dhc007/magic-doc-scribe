import { Product, RentalDuration } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Zap } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [duration, setDuration] = useState<RentalDuration>('daily');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, duration);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Card className="overflow-hidden group hover:shadow-[var(--shadow-card)] transition-all duration-300">
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
          {product.category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          {product.name}
        </CardTitle>
        <CardDescription>{product.shortDescription}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {product.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-2">
          <div className="flex gap-2">
            {(['daily', 'weekly', 'monthly'] as RentalDuration[]).map((d) => (
              <Button
                key={d}
                variant={duration === d ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDuration(d)}
                className="flex-1 capitalize"
              >
                {d}
              </Button>
            ))}
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-primary">
              ₹{product.price[duration]}
            </span>
            <span className="text-sm text-muted-foreground">
              {' '}/ {duration === 'daily' ? 'day' : duration === 'weekly' ? 'week' : 'month'}
            </span>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Security Deposit: ₹{product.deposit}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full" 
          variant="accent"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
