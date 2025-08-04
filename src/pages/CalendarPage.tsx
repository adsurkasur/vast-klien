import React, { useState } from 'react';
import { PeriodCalendar } from '@/components/ui/PeriodCalendar';
import { SymptomsModal } from '@/components/ui/SymptomsModal';

export const CalendarPage: React.FC = () => {
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [selectedDateForSymptoms, setSelectedDateForSymptoms] = useState<string>('');

  const handleOpenSymptoms = (date: string) => {
    setSelectedDateForSymptoms(date);
    setIsSymptomModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 py-6 px-6 border-b border-card-border">
        <h1 className="text-2xl font-bold text-foreground text-center">My Calendar</h1>
        <p className="text-muted-foreground text-center mt-1">Track your menstrual cycle</p>
      </div>

      {/* Calendar Component */}
      <div className="px-6">
        <PeriodCalendar onOpenSymptoms={handleOpenSymptoms} />
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