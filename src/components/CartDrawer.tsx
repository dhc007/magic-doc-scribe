import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { RentalDuration } from '@/types/product';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeFromCart, updateDuration, totalItems, totalPrice, totalDeposit } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (totalItems === 0) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button className="mt-4" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 p-4 rounded-lg border bg-card">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">{item.product.name}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <div className="text-sm">
                  <span className="font-semibold text-primary">
                    ₹{item.product.price[item.duration] * item.quantity}
                  </span>
                  <span className="text-muted-foreground">
                    {' '}/ {item.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Security Deposit</span>
              <span className="font-medium">₹{totalDeposit}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">₹{totalPrice + totalDeposit}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              *Deposit is refundable upon return
            </p>
          </div>

          <Button 
            className="w-full" 
            size="lg" 
            variant="accent"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onClose}
          >
            Continue Shopping
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
