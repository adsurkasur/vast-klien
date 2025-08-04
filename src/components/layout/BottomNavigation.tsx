import React from 'react';
import { Home, ShoppingCart, Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Page = 'home' | 'tips' | 'calendar' | 'community' | 'profile' | 'contact' | 'trolley';

interface BottomNavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  onNavigate,
}) => {
  return (
    <div className="fixed bottom-6 left-4 right-4 z-50">
        <nav className="nav-glass rounded-2xl px-4 py-3">
          <div className="flex items-center justify-around">
            {/* Home */}
            <button
              onClick={() => onNavigate('home')}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-xl spring-tap",
                "transition-all duration-300",
                currentPage === 'home'
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Home"
            >
              <Home 
                size={20} 
                className={cn(
                  "transition-all duration-300",
                  currentPage === 'home' && "scale-110"
                )}
              />
              <span className="text-xs font-medium">Home</span>
            </button>

            {/* Trolley */}
            <button
              onClick={() => onNavigate('trolley')}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-xl spring-tap",
                "transition-all duration-300",
                currentPage === 'trolley'
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Trolley"
            >
              <ShoppingCart 
                size={20} 
                className={cn(
                  "transition-all duration-300",
                  currentPage === 'trolley' && "scale-110"
                )}
              />
              <span className="text-xs font-medium">Shop</span>
            </button>

            {/* Contact */}
            <button
              onClick={() => onNavigate('contact')}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-xl spring-tap",
                "transition-all duration-300",
                currentPage === 'contact'
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Contact"
            >
              <Phone 
                size={20} 
                className={cn(
                  "transition-all duration-300",
                  currentPage === 'contact' && "scale-110"
                )}
              />
              <span className="text-xs font-medium">Contact</span>
            </button>

            {/* Profile */}
            <button
              onClick={() => onNavigate('profile')}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-xl spring-tap",
                "transition-all duration-300",
                currentPage === 'profile'
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Profile"
            >
              {/* Profile Picture */}
              <div className={cn(
                "w-6 h-6 rounded-full bg-primary flex items-center justify-center transition-all duration-300 overflow-hidden",
                currentPage === 'profile' && "scale-110 ring-2 ring-primary/50"
              )}>
                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SJ</span>
                </div>
              </div>
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </nav>
    </div>
  );
};
