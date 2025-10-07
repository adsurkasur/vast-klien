import { PageHeader } from '../../components/layout/PageHeader';
import { Users, MessageCircle, Heart, /* Share2, */ ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/button';

const communityLinks = [
  {
    name: 'Gabung Grup Telegram Kami',
    description: 'Terhubung dengan wanita dengan pengalaman serupa',
    icon: MessageCircle,
    url: 'https://www.example.com/',
    color: 'bg-blue-100 text-blue-700',
    members: 'Jumlah member menyusul!'
  },
  {
    name: 'Komunitas Facebook',
    description: 'Berbagi cerita dan saling mendukung',
    icon: Users,
    url: 'https://www.example.com/',
    color: 'bg-purple-100 text-purple-700',
    members: 'Jumlah member menyusul!'
  },
  {
    name: 'Komunitas WhatsApp',
    description: 'Diskusi dan dukungan cepat',
    icon: MessageCircle,
    url: 'https://chat.whatsapp.com/JJ8ZNgtRPcP0vDEwlf3mRX',
    color: 'bg-green-100 text-green-700',
    members: 'Jumlah member menyusul!'
  }
];

const CommunityPage = () => {
  return (
    <div className="space-y-6 pb-32">
      <PageHeader title="Komunitas" subtitle="Terhubung dengan orang lain" />
      <div className="px-6">
        <div className="card-soft p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Bergabung dengan Komunitas Kami
          </h1>
          <p className="text-muted-foreground">
            Terhubung dengan ribuan wanita dalam perjalanan kesehatan mereka. Berbagi pengalaman, dapatkan dukungan, dan temukan inspirasi.
          </p>
        </div>
      </div>
      <div className="px-6 space-y-4">
        {communityLinks.map((link) => (
          <div key={link.name} className="card-elevated p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${link.color}`}>
                  <link.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{link.name}</h3>
                  {/* Description and Members */}
                  <p className="text-sm text-muted-foreground mb-2">{link.description}</p>
                  <div className="flex items-center space-x-1">
                    <Users size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{link.members}</span>
                  </div>
                </div>
              </div>
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button 
                className="w-full spring-tap"
                variant="outline"
              >
                <ExternalLink size={16} className="mr-2" />
                Periksa
              </Button>
            </a>
          </div>
        ))}
      </div>
      <div className="px-6">
        <div className="card-soft p-6">
          <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Heart className="text-accent-600" size={20} />
            <span>Panduan Komunitas</span>
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Bersikap hormat dan mendukung semua anggota</p>
            <p>• Berbagi pengalaman dan tips secara terbuka</p>
            <p>• Hormati privasi dan kerahasiaan</p>
            <p>• Laporkan konten yang tidak pantas</p>
            <p>• Konsultasikan dengan profesional kesehatan untuk saran medis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
