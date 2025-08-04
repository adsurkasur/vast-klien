import React from 'react';
import { Home, Heart, Calendar, Users, User, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Page = 'home' | 'tips' | 'calendar' | 'community' | 'profile' | 'contact';

interface BottomNavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navigationItems = [
  { id: 'home' as Page, icon: Home, label: 'Home' },
  { id: 'tips' as Page, icon: Heart, label: 'Tips' },
  { id: 'calendar' as Page, icon: Calendar, label: 'Calendar' },
  { id: 'community' as Page, icon: Users, label: 'Community' },
  { id: 'profile' as Page, icon: User, label: 'Profile' },
  { id: 'contact' as Page, icon: Phone, label: 'Contact' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  onNavigate,
}) => {
  return (
    <div className="fixed bottom-6 left-4 right-4 z-50">
      <nav className="nav-glass rounded-2xl px-4 py-3">
        <div className="flex items-center justify-around">
          {navigationItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-xl spring-tap",
                "transition-all duration-300",
                currentPage === id
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={label}
            >
              <Icon 
                size={20} 
                className={cn(
                  "transition-all duration-300",
                  currentPage === id && "scale-110"
                )}
              />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};