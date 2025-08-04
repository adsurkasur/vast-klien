import React from 'react';
import { ExternalLink, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrolleyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrolleyPopup: React.FC<TrolleyPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shopLinks = [
    {
      name: 'Tokopedia',
      icon: ShoppingBag,
      url: 'https://tokopedia.com',
      color: 'bg-green-500'
    },
    {
      name: 'Shopee',
      icon: ShoppingBag,
      url: 'https://shopee.co.id',
      color: 'bg-orange-500'
    },
    {
      name: 'Store Location',
      icon: MapPin,
      url: 'https://maps.google.com',
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative card-elevated p-6 m-4 w-full max-w-sm animate-in zoom-in-95 duration-200">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Shop Menstrual Products
        </h3>
        
        <div className="space-y-3">
          {shopLinks.map((shop) => (
            <a
              key={shop.name}
              href={shop.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors duration-200 spring-tap"
            >
              <div className={`p-2 rounded-lg ${shop.color}`}>
                <shop.icon size={20} className="text-white" />
              </div>
              <span className="font-medium text-foreground flex-1">{shop.name}</span>
              <ExternalLink size={16} className="text-muted-foreground" />
            </a>
          ))}
        </div>
        
        <Button
          onClick={onClose}
          variant="outline"
          className="w-full mt-4 bg-white/50 border-card-border hover:bg-white/70"
        >
          Close
        </Button>
      </div>
    </div>
  );
};