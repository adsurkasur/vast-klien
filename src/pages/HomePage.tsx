import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Heart, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Page } from '@/components/layout/BottomNavigation';
import { PageHeader } from '../components/layout/PageHeader';

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
  // ...existing code...

  return (
    <div className="space-y-8 pb-32">
      {/* Header with Logo */}
      <PageHeader title="Home" subtitle="Welcome back" />

      {/* Quick News Cards - 3 buttons in a row (wireframe layout) */}
      <div className="px-6">
        <div className="grid grid-cols-3 gap-4">
          <h1 className="col-span-3 text-lg font-semibold text-foreground">
            News
          </h1>
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="card-soft p-4 spring-tap cursor-pointer hover:shadow-card transition-all duration-200 text-center"
            >
              <div className="text-2xl mb-2">{item.image}</div>
              <h3 className="font-medium text-foreground text-xs mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Action Cards - Updated color and theme */}
      <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Healthy Tips */}
        <div
          onClick={() => onNavigate('tips')}
          className="cursor-pointer rounded-2xl shadow-lg bg-gradient-to-br from-pink-500 via-rose-400 to-pink-100 border-2 border-pink-400 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300"
          tabIndex={0}
          role="button"
          aria-label="Healthy Tips"
        >
          <div className="flex flex-col items-center justify-center py-8 px-6">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 shadow-md">
              <Heart className="text-pink-600" size={32} />
            </div>
            <h3 className="font-bold text-lg text-pink-800 mb-2">Healthy Tips</h3>
            <p className="text-sm text-pink-900/80 text-center">Wellness advice for your cycle</p>
          </div>
        </div>

        {/* My Calendar */}
        <div
          onClick={() => onNavigate('calendar')}
          className="cursor-pointer rounded-2xl shadow-lg bg-gradient-to-br from-indigo-500 via-purple-400 to-indigo-100 border-2 border-indigo-400 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          tabIndex={0}
          role="button"
          aria-label="My Calendar"
        >
          <div className="flex flex-col items-center justify-center py-8 px-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 shadow-md">
              <Calendar className="text-indigo-600" size={32} />
            </div>
            <h3 className="font-bold text-lg text-indigo-800 mb-2">My Calendar</h3>
            <p className="text-sm text-indigo-900/80 text-center">Track your cycle and symptoms</p>
          </div>
        </div>

        {/* My Community */}
        <div
          onClick={() => onNavigate('community')}
          className="cursor-pointer rounded-2xl shadow-lg bg-gradient-to-br from-cyan-500 via-blue-400 to-cyan-100 border-2 border-cyan-400 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          tabIndex={0}
          role="button"
          aria-label="My Community"
        >
          <div className="flex flex-col items-center justify-center py-8 px-6">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4 shadow-md">
              <Users className="text-cyan-600" size={32} />
            </div>
            <h3 className="font-bold text-lg text-cyan-800 mb-2">My Community</h3>
            <p className="text-sm text-cyan-900/80 text-center">Connect with other women</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;