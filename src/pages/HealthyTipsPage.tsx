import React from 'react';
import { Heart, Droplets, Moon, Activity } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';

const tipCategories = [
  {
    id: 1,
    title: 'Nutrisi & Diet',
    icon: '🥗',
    color: 'bg-green-100',
    tips: [
      'Konsumsi makanan kaya zat besi saat menstruasi',
      'Tetap terhidrasi dengan teh herbal',
      'Tambahkan asam lemak omega-3 ke dalam diet Anda'
    ]
  },
  {
    id: 2,
    title: 'Olahraga & Gerakan',
    icon: '🧘‍♀️',
    color: 'bg-blue-100',
    tips: [
      'Yoga ringan dapat membantu meredakan kram',
      'Jalan kaki mengurangi nyeri haid',
      'Peregangan ringan meningkatkan suasana hati'
    ]
  },
  {
    id: 3,
    title: 'Kesehatan Mental',
    icon: '🧠',
    color: 'bg-purple-100',
    tips: [
      'Latihan meditasi mindfulness',
      'Catat suasana hati Anda',
      'Dapatkan tidur berkualitas yang cukup'
    ]
  },
  {
    id: 4,
    title: 'Perawatan Diri',
    icon: '💆‍♀️',
    color: 'bg-pink-100',
    tips: [
      'Mandi air hangat untuk meredakan ketegangan',
      'Gunakan terapi panas untuk kram',
      'Latihan pernapasan dalam'
    ]
  }
];

export const HealthyTipsPage = () => {
  return (
    <div className="space-y-6 pb-32">
      {/* Header */}
  <PageHeader title="Tips Sehat" subtitle="Panduan kesehatan setiap hari" />

      {/* Featured Tip */}
      <div className="px-6">
        <div className="card-elevated p-6 accent-tips">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="text-primary" size={24} />
            <h2 className="text-lg font-semibold text-foreground">Tips Unggulan Hari Ini</h2>
          </div>
          <p className="text-foreground mb-4">
            Tetap terhidrasi! Minum banyak air dapat membantu mengurangi kembung dan meredakan gejala menstruasi.
            Usahakan minum 8-10 gelas sepanjang hari.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Droplets size={16} />
            <span>Hidrasi • Kesehatan</span>
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
