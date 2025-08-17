import React from 'react';
import { Heart, Droplets, Moon, Activity } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';

const tipCategories = [
  {
    id: 1,
    title: 'Nutrition & Diet',
    icon: '🥗',
    color: 'bg-green-100',
    tips: [
      'Eat iron-rich foods during your period',
      'Stay hydrated with herbal teas',
      'Include omega-3 fatty acids in your diet'
    ]
  },
  {
    id: 2,
    title: 'Exercise & Movement',
    icon: '🧘‍♀️',
    color: 'bg-blue-100',
    tips: [
      'Light yoga can help with cramps',
      'Walking reduces period pain',
      'Gentle stretching improves mood'
    ]
  },
  {
    id: 3,
    title: 'Mental Wellness',
    icon: '🧠',
    color: 'bg-purple-100',
    tips: [
      'Practice mindfulness meditation',
      'Keep a mood journal',
      'Get enough quality sleep'
    ]
  },
  {
    id: 4,
    title: 'Self Care',
    icon: '💆‍♀️',
    color: 'bg-pink-100',
    tips: [
      'Take warm baths to ease tension',
      'Use heat therapy for cramps',
      'Practice deep breathing exercises'
    ]
  }
];

export const HealthyTipsPage = () => {
  return (
    <div className="space-y-6 pb-32">
      {/* Header */}
      <PageHeader title="Healthy Tips" subtitle="Wellness guidance for every day" />

      {/* Featured Tip */}
      <div className="px-6">
        <div className="card-elevated p-6 accent-tips">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="text-primary" size={24} />
            <h2 className="text-lg font-semibold text-foreground">Today's Featured Tip</h2>
          </div>
          <p className="text-foreground mb-4">
            Stay hydrated! Drinking plenty of water can help reduce bloating and ease period symptoms. 
            Aim for 8-10 glasses throughout the day.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Droplets size={16} />
            <span>Hydration • Wellness</span>
          </div>
        </div>
      </div>

      {/* Tip Categories - 2x2 Grid Layout (wireframe) */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          {tipCategories.map((category) => (
            <div key={category.id} className="card-soft p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="text-xl">{category.icon}</div>
                <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
              </div>
              
              <div className="space-y-2">
                {category.tips.slice(0, 2).map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-2 bg-white/50 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions 
      
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="card-soft p-4 text-center spring-tap cursor-pointer hover:shadow-card transition-all duration-200">
            <Moon size={24} className="mx-auto mb-2 text-primary" />
            <h4 className="font-medium text-foreground text-sm">Sleep Tracker</h4>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </div>
          
          <div className="card-soft p-4 text-center spring-tap cursor-pointer hover:shadow-card transition-all duration-200">
            <Activity size={24} className="mx-auto mb-2 text-primary" />
            <h4 className="font-medium text-foreground text-sm">Mood Tracker</h4>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </div>
        </div>
      </div>
      */}

    </div>
  );
};
