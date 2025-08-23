import React from 'react';
import { ExternalLink, MapPin, ShoppingBag, Star, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';

export const TrolleyPage: React.FC = () => {
  const shopLinks = [
      {
        name: 'Tokopedia',
        icon: null, // will use SVG
        svgIcon: true,
        svgPath: '/svg/tokopedia.svg',
        url: 'https://tokopedia.com',
        color: ' bg-green-100 text-green-700',
        rating: null, //4.8,
        deliveryTime: null, //'1-2 hari',
        features: null //['Gratis Ongkir', 'Bayar di Tempat', 'Toko Resmi']
      },
    {
      name: 'Shopee',
      icon: null, // will use SVG
      svgIcon: true,
      svgPath: '/svg/shopee.svg',
      url: 'https://shopee.co.id',
      color: 'bg-orange-100 text-orange-700',
      rating: null, //4.7,
      deliveryTime: null, //'2-3 hari',
      features: null //'Gratis Ongkir', 'Garansi Shopee', 'Flash Sale']
    },
    {
      name: 'Cari Toko Terdekat',
      icon: MapPin,
      url: 'https://maps.google.com',
      color: 'bg-blue-100 text-blue-700',
      rating: null,
      deliveryTime: null, //'Hari yang sama',
      features: null //['Ambil di toko', 'Konsultasi pribadi', 'Tersedia langsung']
    }
  ];

  const productFeatures = [
    'Membantu mengurangi nyeri haid secara alami',
    'Terbuat dari bahan herbal premium',
    'Format bubuk yang mudah dikonsumsi',
    'Teruji secara klinis dan aman',
    'Cocok untuk konsumsi harian'
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
  <PageHeader title="Belanja Vast" subtitle="Dapatkan suplemen herbal Anda" />
      
      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <div className="card-soft p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <ShoppingBag className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Produk Vast
          </h1>
          <p className="text-muted-foreground">
            Dapatkan suplemen herbal Vast untuk meredakan nyeri haid dari toko online terpercaya
          </p>
        </div>

        {/* Product Benefits */}
        <div className="card-soft p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Kenapa Pilih Vast?
          </h2>
            <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
              {productFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
        </div>

        {/* Shopping Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Tempat Pembelian
          </h2>
          
          {shopLinks.map((shop) => (
            <div key={shop.name} className="card-elevated p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${shop.color}`}>
                    {shop.svgIcon ? (
                      <img src={shop.svgPath} alt={shop.name} style={{ width: 24, height: 24 }} />
                    ) : (
                      shop.icon && <shop.icon size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{shop.name}</h3>
                  {/*  Disable shop rating
                  
                  {shop.rating && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="text-yellow-500 fill-current" size={16} />
                        <span className="text-sm text-muted-foreground">{shop.rating}/5</span>
                      </div>
                    )} 
                     
                     */}
                  </div>
                </div>
                <ExternalLink size={20} className="text-muted-foreground" />
              </div>

              {/* Disable shop delivery time

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Truck size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{shop.deliveryTime}</span>
                </div>
              </div>

              */}

              {/* Disable shop features

              <div className="flex flex-wrap gap-2 mb-4">
                {shop.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div> 
              
              */}

              <a
                href={shop.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                  <Button 
                    className="w-full spring-tap"
                    variant="default"
                  >
                    Beli di {shop.name}
                  </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="card-soft p-6">
          <h3 className="font-semibold text-foreground mb-3">
            Butuh Bantuan?
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Jika Anda membutuhkan bantuan dengan pesanan atau memiliki pertanyaan tentang produk kami,
            silakan hubungi tim dukungan pelanggan kami.
          </p>
          <Button variant="outline" className="w-full">
            Hubungi Dukungan
          </Button>
        </div>
      </div>
    </div>
  );
};
