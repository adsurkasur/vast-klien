import * as React from "react";
// ...existing code...

import { Home, ShoppingCart, Phone, User, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export type Page = 'home' | 'contact' | 'trolley' | 'profile' | 'community';

interface BottomNavigationProps {
  currentPage: Page;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPage }) => {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
      <nav className="nav-glass rounded-none px-4 py-2 w-full pointer-events-auto">
        <div className="flex items-center justify-between gap-x-2">
          {/* Home */}
          <button
            onClick={() => router.push('/home')}
            className={cn(
              "w-16 flex flex-col items-center space-y-1 px-3 py-2 rounded-xl spring-tap transition-all duration-300",
              currentPage === 'home'
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Home"
          >
            <div className={cn(
              "w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden",
              currentPage === 'home' && "scale-110"
            )}>
              <Home size={20} className="transition-all duration-300" />
            </div>
            <span className="text-xs font-medium">Beranda</span>
          </button>

          {/* Contact */}
          <button
            onClick={() => router.push('/contact')}
            className={cn(
              "w-16 flex flex-col items-center space-y-1 px-3 py-2 rounded-xl spring-tap transition-all duration-300",
              currentPage === 'contact'
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Contact"
          >
            <div className={cn(
              "w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden",
              currentPage === 'contact' && "scale-110"
            )}>
              <Phone size={20} className="transition-all duration-300" />
            </div>
            <span className="text-xs font-medium">Kontak</span>
          </button>

          {/* Trolley - popping out effect, scale and ring only, equal gap */}
          <div className="relative w-16 flex flex-col items-center" style={{zIndex: 10}}>
            <button
              onClick={() => router.push('/trolley')}
              className={cn(
                "spring-tap w-16 h-16 rounded-full bg-red-500 flex items-center justify-center border-4 border-background absolute -top-6 inset-x-0 mx-auto transition-all duration-300 origin-center",
                currentPage === 'trolley'
                  ? "scale-110"
                  : "hover:scale-105"
              )}
              aria-label="Trolley"
              style={{zIndex: 20}}
            >
              <div className={cn(
                "w-full h-full flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden",
                currentPage === 'trolley' && "scale-110 ring-2 ring-red-400"
              )}>
                <ShoppingCart size={28} className="text-white transition-all duration-300 drop-shadow" />
              </div>
            </button>
            <span className="text-xs font-medium mt-10 text-red-500 drop-shadow">Belanja</span>
          </div>

          {/* Profile */}
          <button
            onClick={() => router.push('/profile')}
            className={cn(
              "w-16 flex flex-col items-center space-y-1 px-3 py-2 rounded-xl spring-tap transition-all duration-300",
              currentPage === 'profile'
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Profile"
          >
            <div className={cn(
              "w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden",
              currentPage === 'profile' && "scale-110"
            )}>
              <User size={20} className="transition-all duration-300" />
            </div>
            <span className="text-xs font-medium">Profil</span>
          </button>

          {/* Community */}
          <button
            onClick={() => router.push('/community')}
            className={cn(
              "w-16 flex flex-col items-center space-y-1 px-3 py-2 rounded-xl spring-tap transition-all duration-300",
              currentPage === 'community'
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Community"
          >
            <div className={cn(
              "w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden",
              currentPage === 'community' && "scale-110"
            )}>
              <Users size={20} className="transition-all duration-300" />
            </div>
            <span className="text-xs font-medium">Komunitas</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
