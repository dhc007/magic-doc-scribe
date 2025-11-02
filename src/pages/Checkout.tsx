import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, totalDeposit } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    // Generate booking ID
    const bookingId = 'BB' + Date.now().toString().slice(-8);
    
    // Generate WhatsApp message
    const message = `Hi! I want to complete my booking\nBooking ID: ${bookingId}\nName: ${formData.name}`;
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    
    toast.success('Booking created successfully!');
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => navigate('/'), 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
            <CardDescription>Add some products before checking out</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>
              Browse Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full ${
                  step >= s ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>We'll use this to send you booking updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="+91 9999999999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Rental Details</CardTitle>
                    <CardDescription>When do you need the cycle?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time *</Label>
                        <Input
                          id="startTime"
                          type="time"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Input
                        id="address"
                        required
                        placeholder="Enter your delivery address"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review & Confirm</CardTitle>
                    <CardDescription>Please review your booking details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Contact Details</h4>
                      <p className="text-sm text-muted-foreground">
                        Name: {formData.name}<br />
                        Mobile: {formData.mobile}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Selected Items</h4>
                      {items.map((item) => (
                        <p key={item.product.id} className="text-sm text-muted-foreground">
                          {item.product.name} × {item.quantity} ({item.duration})
                        </p>
                      ))}
                    </div>
                    <div className="flex items-start gap-2 p-4 bg-muted rounded-lg">
                      <Check className="h-5 w-5 text-secondary mt-0.5" />
                      <p className="text-sm">
                        I agree to the terms and conditions and understand that the security deposit is refundable upon return.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button type="submit" size="lg" variant="accent" className="w-full">
                {step < 3 ? 'Continue' : 'Confirm & Open WhatsApp'}
              </Button>
            </form>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Rental Cost</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Security Deposit</span>
                    <span>₹{totalDeposit}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice + totalDeposit}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  You'll receive a payment link on WhatsApp to complete your booking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
