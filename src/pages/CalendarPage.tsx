import React, { useState } from 'react';
import { PeriodCalendar } from '@/components/ui/PeriodCalendar';
import { SymptomsModal } from '@/components/ui/SymptomsModal';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, BarChart3, Heart, Calendar, Clock } from 'lucide-react';

export const CalendarPage = () => {
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [selectedDateForSymptoms, setSelectedDateForSymptoms] = useState<string>('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [nextPeriodDays, setNextPeriodDays] = useState(7); // Days until next period

  const handleOpenSymptoms = (date: string) => {
    setSelectedDateForSymptoms(date);
    setIsSymptomModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-32">
      {/* Header with Logo and Title */}
      <PageHeader title="My Calendar" subtitle="Track your cycle and symptoms" />

      {/* Custom Calendar for Period Tracking */}
      <div className="px-6">
        <div className="card-soft p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-accent-600" size={20} />
            <h2 className="text-lg font-semibold text-foreground">Period Tracker</h2>
          </div>
          <PeriodCalendar onOpenSymptoms={handleOpenSymptoms} />
        </div>
      </div>

      {/* Upcoming period notice */}
      <div className="px-6">
        <div className="card-elevated p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-accent-500">
          <div className="flex items-center space-x-3">
            <Clock className="text-accent-600" size={20} />
            <div>
              <p className="font-semibold text-foreground">
                {nextPeriodDays <= 3 ? 'Period starting soon!' : 'Next Period'}
              </p>
              <p className="text-sm text-muted-foreground">
                Expected in {nextPeriodDays} day{nextPeriodDays !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Record Period Button */}
      <div className="px-6">
        <Button
          className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white h-12 spring-tap shadow-lg"
          onClick={() => {
            // Handle record period
            console.log('Recording period...');
          }}
        >
          <div className="flex items-center space-x-2">
            <Heart size={20} />
            <span className="font-semibold">Record Period</span>
          </div>
        </Button>
      </div>

      {/* Bottom Action Buttons */}
      <div className="px-6">
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="w-full h-16 spring-tap flex flex-col items-center justify-center space-y-1 hover:bg-accent-50"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            {notificationsEnabled ? (
              <Bell className="text-accent-600" size={20} />
            ) : (
              <BellOff className="text-muted-foreground" size={20} />
            )}
            <span className="text-xs font-medium">
              {notificationsEnabled ? 'Notifications On' : 'Notifications Off'}
            </span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-16 spring-tap flex flex-col items-center justify-center space-y-1 hover:bg-accent-50"
            onClick={() => {
              // Handle report and graph
              console.log('Opening reports...');
            }}
          >
            <BarChart3 className="text-accent-600" size={20} />
            <span className="text-xs font-medium">Reports</span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-16 spring-tap flex flex-col items-center justify-center space-y-1 hover:bg-accent-50"
            onClick={() => setIsSymptomModalOpen(true)}
          >
            <Heart className="text-accent-600" size={20} />
            <span className="text-xs font-medium">Symptoms</span>
          </Button>
        </div>
      </div>

      {/* Symptoms Modal */}
      <SymptomsModal
        isOpen={isSymptomModalOpen}
        onClose={() => setIsSymptomModalOpen(false)}
        selectedDate={selectedDateForSymptoms}
      />
    </div>
  );
};