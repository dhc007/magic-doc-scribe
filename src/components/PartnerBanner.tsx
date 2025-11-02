import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PartnerBannerProps {
  partnerName: string;
}

export const PartnerBanner = ({ partnerName }: PartnerBannerProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
      <div className="container py-3 flex items-center justify-between">
        <p className="text-sm font-medium">
          🎉 Welcome from <span className="font-bold">{partnerName}</span>!
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
          onClick={() => setVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
