
import { ExternalLink, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { PageHeader } from '../../components/layout/PageHeader';
import Image from 'next/image';

const shopLinks = [
  {
    name: 'Tokopedia',
    svgIcon: true,
    svgPath: '/svg/tokopedia.svg',
    url: 'https://tokopedia.com',
    color: ' bg-green-100 text-green-700',
  },
  {
    name: 'Shopee',
    svgIcon: true,
    svgPath: '/svg/shopee.svg',
    url: 'https://shopee.co.id',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    name: 'Cari Toko Terdekat',
    icon: MapPin,
    url: 'https://maps.google.com',
    color: 'bg-blue-100 text-blue-700',
  }
];

const productFeatures = [
  'Membantu mengurangi nyeri haid secara alami',
  'Terbuat dari bahan herbal premium',
  'Format bubuk yang mudah dikonsumsi',
  'Teruji secara klinis dan aman',
  'Cocok untuk konsumsi harian'
];

const TrolleyPage = () => {
  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader title="Belanja Vast" subtitle="Dapatkan suplemen herbal Anda" />
      <div className="p-6 space-y-8">
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
                      <Image src={shop.svgPath} alt={shop.name} width={24} height={24} />
                    ) : (
                      shop.icon && <shop.icon size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{shop.name}</h3>
                  </div>
                </div>
                <ExternalLink size={20} className="text-muted-foreground" />
              </div>
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

export default TrolleyPage;
