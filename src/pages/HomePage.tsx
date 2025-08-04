import React from 'react';
import { Heart, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Page } from '@/components/layout/BottomNavigation';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const newsItems = [
  {
    id: 1,
    title: 'Understanding Your Cycle',
    category: 'Education',
    image: '🌸'
  },
  {
    id: 2,
    title: 'Nutrition Tips for PMS',
    category: 'Health',
    image: '🥗'
  },
  {
    id: 3,
    title: 'Exercise During Periods',
    category: 'Fitness',
    image: '🧘‍♀️'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 pb-32">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Vast</h1>
        <p className="text-muted-foreground">Your wellness companion</p>
      </div>

      {/* Quick News Cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 px-6">Latest Updates</h2>
        <div className="flex overflow-x-auto space-x-4 px-6 pb-2">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 card-soft p-4 spring-tap cursor-pointer hover:shadow-card transition-all duration-200"
            >
              <div className="text-2xl mb-2">{item.image}</div>
              <h3 className="font-medium text-foreground text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="px-6 space-y-4">
        <Button
          onClick={() => onNavigate('tips')}
          className="w-full accent-tips text-foreground border-0 h-auto py-6 spring-tap"
        >
          <div className="flex items-center space-x-4">
            <Heart size={24} />
            <div className="text-left">
              <div className="font-semibold">Healthy Tips</div>
              <div className="text-sm opacity-80">Wellness advice for you</div>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onNavigate('calendar')}
          className="w-full accent-calendar text-foreground border-0 h-auto py-6 spring-tap"
        >
          <div className="flex items-center space-x-4">
            <Calendar size={24} />
            <div className="text-left">
              <div className="font-semibold">My Calendar</div>
              <div className="text-sm opacity-80">Track your cycle</div>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onNavigate('community')}
          className="w-full accent-community text-foreground border-0 h-auto py-6 spring-tap"
        >
          <div className="flex items-center space-x-4">
            <Users size={24} />
            <div className="text-left">
              <div className="font-semibold">My Community</div>
              <div className="text-sm opacity-80">Connect with others</div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};