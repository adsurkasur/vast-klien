import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PeriodDay {
  date: string;
  isPeriod: boolean;
  symptoms: string[];
}

interface PeriodCalendarProps {
  onOpenSymptoms: (date: string) => void;
  onTogglePeriod?: (date: string) => void;
  selectedDate?: string | null;
}

export const PeriodCalendar: React.FC<PeriodCalendarProps> = ({ 
  onOpenSymptoms, 
  onTogglePeriod,
  selectedDate: externalSelectedDate 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(externalSelectedDate || null);
  const [periodDays, setPeriodDays] = useState<PeriodDay[]>([]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const togglePeriodDay = () => {
    if (!selectedDate) return;
    
    setPeriodDays(prev => {
      const existing = prev.find(day => day.date === selectedDate);
      if (existing) {
        return prev.map(day => 
          day.date === selectedDate 
            ? { ...day, isPeriod: !day.isPeriod }
            : day
        );
      } else {
        return [...prev, { date: selectedDate, isPeriod: true, symptoms: [] }];
      }
    });
  };

  const isPeriodDay = (dateStr: string) => {
    return periodDays.find(day => day.date === dateStr)?.isPeriod || false;
  };

  const formatDateString = (day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-3"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateString(day);
      const isSelected = selectedDate === dateStr;
      const isPeriod = isPeriodDay(dateStr);
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={cn(
            "p-3 text-sm font-medium rounded-xl transition-all duration-200 spring-tap",
            "hover:bg-primary-muted",
            isSelected && "bg-primary text-primary-foreground shadow-soft",
            isPeriod && !isSelected && "period-day-light",
            isPeriod && isSelected && "period-day"
          )}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="h-8 w-8 p-0 hover:bg-primary-muted"
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="h-8 w-8 p-0 hover:bg-primary-muted"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(day => (
          <div key={day} className="p-3 text-xs font-medium text-muted-foreground text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
    </div>
  );
};