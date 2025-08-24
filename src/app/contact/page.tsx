import { PageHeader } from '../../components/layout/PageHeader';
import { Youtube, Leaf } from 'lucide-react';
import { XIcon, FacebookIcon, TikTokIcon, InstagramIcon, VastLogo } from '../../components/icons/SocialIcons';

const ContactPage = () => {
  return (
    <div className="space-y-6 pb-32">
      <PageHeader title="Kontak" subtitle="Hubungi kami" />
      <div className="px-6">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="bg-gradient-to-b from-orange-400 via-orange-500 to-yellow-500 p-8 text-white">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <VastLogo size={40} className="text-orange-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Vast.PKM_K</h1>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Leaf size={16} />
                <p className="text-lg">Lepaskan Kesedihanmu dengan Mudah</p>
              </div>
              <div className="flex justify-center space-x-6 mb-6">
                <a href="https://x.com/vast_id" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 spring-tap">
                  <XIcon size={20} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61578620750547" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 spring-tap">
                  <FacebookIcon size={28} />
                </a>
                <a href="https://www.tiktok.com/@vast_pkmk" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 spring-tap">
                  <TikTokIcon size={28} />
                </a>
                <a href="https://youtube.com/@pkmkvast?si=DAcIERI2AM5_928s" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 spring-tap">
                  <Youtube size={28} />
                </a>
                <a href="https://www.instagram.com/_vast.id" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200 spring-tap">
                  <InstagramIcon size={28} />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <a href="https://x.com/vast_id" target="_blank" rel="noopener noreferrer" className="w-full p-4 border-2 border-white/30 rounded-full text-center font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200 spring-tap">
                <XIcon size={20} />
                X
              </a>
              <a href="https://www.facebook.com/profile.php?id=61578620750547" target="_blank" rel="noopener noreferrer" className="w-full p-4 border-2 border-white/30 rounded-full text-center font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200 spring-tap">
                <FacebookIcon size={28} />
                Facebook
              </a>
              <a href="https://www.tiktok.com/@vast_pkmk" target="_blank" rel="noopener noreferrer" className="w-full p-4 border-2 border-white/30 rounded-full text-center font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200 spring-tap">
                <TikTokIcon size={28} />
                TikTok
              </a>
              <a href="https://youtube.com/@pkmkvast?si=DAcIERI2AM5_928s" target="_blank" rel="noopener noreferrer" className="w-full p-4 border-2 border-white/30 rounded-full text-center font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200 spring-tap">
                <Youtube size={28} />
                YouTube
              </a>
              <a href="https://www.instagram.com/_vast.id" target="_blank" rel="noopener noreferrer" className="w-full p-4 border-2 border-white/30 rounded-full text-center font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200 spring-tap">
                <InstagramIcon size={28} />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
