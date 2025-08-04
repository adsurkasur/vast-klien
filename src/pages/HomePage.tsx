import React from 'react';
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
  return (
    <div className="space-y-8 pb-32">
      {/* Header with Logo */}
      <PageHeader title="Home" subtitle="Welcome back" />

      {/* Quick News Cards - 3 buttons in a row (wireframe layout) */}
      <div className="px-6">
        <div className="grid grid-cols-3 gap-4">
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

      {/* Main Action Cards */}
      <div className="px-6 space-y-4">
        <div
          onClick={() => onNavigate('tips')}
          className="card-elevated p-6 spring-tap cursor-pointer hover:shadow-card transition-all duration-200 bg-gradient-to-r from-pink-50 to-rose-50 border-l-4 border-pink-400"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <Heart className="text-pink-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Healthy Tips</h3>
              <p className="text-sm text-muted-foreground">Wellness advice for your cycle</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigate('calendar')}
          className="card-elevated p-6 spring-tap cursor-pointer hover:shadow-card transition-all duration-200 bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-400"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">My Calendar</h3>
              <p className="text-sm text-muted-foreground">Track your cycle and symptoms</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigate('community')}
          className="card-elevated p-6 spring-tap cursor-pointer hover:shadow-card transition-all duration-200 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">My Community</h3>
              <p className="text-sm text-muted-foreground">Connect with other women</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};