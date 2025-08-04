import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PeriodDay {
  date: string;
  isPeriod: boolean;
  symptoms: string[];
  flow?: 'light' | 'medium' | 'heavy';
  mood?: string[];
  notes?: string;
}

interface CycleData {
  periodDays: PeriodDay[];
  cycleHistory: {
    startDate: string;
    endDate: string;
    cycleLength: number;
  }[];
  averageCycleLength: number;
  lastPeriodStart?: string;
  nextPeriodPrediction?: string;
}

interface PeriodCalendarProps {
  onOpenSymptoms: (date: string) => void;
  onTogglePeriod?: (date: string) => void;
  selectedDate?: string | null;
  onDataUpdate?: (data: CycleData) => void;
  initialData?: CycleData;
}

export const PeriodCalendar: React.FC<PeriodCalendarProps> = ({ 
  onOpenSymptoms, 
  onTogglePeriod,
  selectedDate: externalSelectedDate,
  onDataUpdate,
  initialData 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(externalSelectedDate || null);
  const [cycleData, setCycleData] = useState<CycleData>({
    periodDays: [],
    cycleHistory: [],
    averageCycleLength: 28
  });

  // Initialize data from initialData prop or localStorage
  useEffect(() => {
    if (initialData) {
      setCycleData(initialData);
    } else {
      const savedData = localStorage.getItem('periodTrackingData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData) as CycleData;
          setCycleData(parsed);
        } catch (error) {
          console.error('Error loading period data:', error);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount - initialData handled by separate effect

  // Sync with external data changes - use ref to avoid infinite loop
  const initialDataRef = useRef<string>('');
  useEffect(() => {
    if (initialData) {
      const newDataString = JSON.stringify(initialData);
      if (newDataString !== initialDataRef.current) {
        initialDataRef.current = newDataString;
        setCycleData(initialData);
      }
    }
  }, [initialData]);

  // Use ref to store the callback to avoid infinite loops
  const onDataUpdateRef = useRef(onDataUpdate);
  onDataUpdateRef.current = onDataUpdate;

  // Save data to localStorage only if no initialData (standalone mode)
  useEffect(() => {
    if (!initialData) {
      localStorage.setItem('periodTrackingData', JSON.stringify(cycleData));
    }
    onDataUpdateRef.current?.(cycleData);
  }, [cycleData, initialData]); // Remove onDataUpdate from deps to avoid infinite loop

  // Calculate next period prediction
  const calculateNextPeriod = () => {
    if (cycleData.periodDays.length === 0) return null;
    
    const periodStarts = cycleData.periodDays
      .filter(day => day.isPeriod)
      .map(day => new Date(day.date))
      .sort((a, b) => b.getTime() - a.getTime());
    
    if (periodStarts.length === 0) return null;
    
    const lastPeriodStart = periodStarts[0];
    const nextPeriod = new Date(lastPeriodStart);
    nextPeriod.setDate(nextPeriod.getDate() + cycleData.averageCycleLength);
    
    return nextPeriod.toISOString().split('T')[0];
  };

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
    
    setCycleData(prev => {
      const existing = prev.periodDays.find(day => day.date === selectedDate);
      let newPeriodDays;
      
      if (existing) {
        newPeriodDays = prev.periodDays.map(day => 
          day.date === selectedDate 
            ? { ...day, isPeriod: !day.isPeriod }
            : day
        );
      } else {
        newPeriodDays = [...prev.periodDays, { 
          date: selectedDate, 
          isPeriod: true, 
          symptoms: [],
          flow: 'medium' as const
        }];
      }

      // Calculate cycle statistics
      const periodStarts = newPeriodDays
        .filter(day => day.isPeriod)
        .map(day => new Date(day.date))
        .sort((a, b) => a.getTime() - b.getTime());

      const cycleHistory = [];
      for (let i = 1; i < periodStarts.length; i++) {
        const cycleLength = Math.floor((periodStarts[i].getTime() - periodStarts[i-1].getTime()) / (1000 * 60 * 60 * 24));
        cycleHistory.push({
          startDate: periodStarts[i-1].toISOString().split('T')[0],
          endDate: periodStarts[i].toISOString().split('T')[0],
          cycleLength
        });
      }

      const averageCycleLength = cycleHistory.length > 0 
        ? Math.round(cycleHistory.reduce((sum, cycle) => sum + cycle.cycleLength, 0) / cycleHistory.length)
        : 28;

      return {
        ...prev,
        periodDays: newPeriodDays,
        cycleHistory,
        averageCycleLength,
        lastPeriodStart: periodStarts.length > 0 ? periodStarts[periodStarts.length - 1].toISOString().split('T')[0] : undefined
      };
    });
  };

  const isPeriodDay = (dateStr: string) => {
    return cycleData.periodDays.find(day => day.date === dateStr)?.isPeriod || false;
  };

  const hasSymptoms = (dateStr: string) => {
    const day = cycleData.periodDays.find(day => day.date === dateStr);
    return day && day.symptoms.length > 0;
  };

  const updateDayData = (date: string, updates: Partial<PeriodDay>) => {
    setCycleData(prev => {
      const existing = prev.periodDays.find(day => day.date === date);
      let newPeriodDays;
      
      if (existing) {
        newPeriodDays = prev.periodDays.map(day => 
          day.date === date ? { ...day, ...updates } : day
        );
      } else {
        newPeriodDays = [...prev.periodDays, { 
          date, 
          isPeriod: false, 
          symptoms: [],
          ...updates 
        }];
      }
      
      return { ...prev, periodDays: newPeriodDays };
    });
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
      const hasSymptom = hasSymptoms(dateStr);
      const dayData = cycleData.periodDays.find(d => d.date === dateStr);
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      
      days.push(
        <button
          key={day}
          onClick={() => {
            setSelectedDate(dateStr);
            // Auto-toggle period when clicking on a date
            if (selectedDate === dateStr) {
              // If clicking the same date twice, toggle period
              setTimeout(() => togglePeriodDay(), 100);
            }
          }}
          className={cn(
            "p-2 text-sm font-medium rounded-xl transition-all duration-200 spring-tap relative min-h-[40px] flex flex-col items-center justify-center",
            "hover:bg-accent-100 border-2 border-transparent",
            // Today styling (gold/yellow theme for better distinction)
            isToday && !isSelected && "border-yellow-400 bg-yellow-50 text-yellow-800 shadow-sm",
            // Selected day styling (blue theme for better distinction) 
            isSelected && !isPeriod && "border-blue-500 bg-blue-100 text-blue-800 shadow-md ring-2 ring-blue-200",
            isSelected && isPeriod && "border-red-500 bg-red-500 text-white shadow-lg ring-2 ring-red-300",
            // Period day styling (not selected)
            isPeriod && !isSelected && "bg-red-100 text-red-800 border-red-300",
            // Symptom day styling (not period, not selected)
            hasSymptom && !isPeriod && !isSelected && "bg-blue-50 border-blue-200 text-blue-800"
          )}
        >
          <span className="text-center leading-none">{day}</span>
          {/* Visual indicators */}
          <div className="flex space-x-1 mt-1">
            {isPeriod && (
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                dayData?.flow === 'light' && "bg-pink-400",
                dayData?.flow === 'medium' && "bg-red-500",
                dayData?.flow === 'heavy' && "bg-red-700",
                !dayData?.flow && "bg-red-500",
                // Make dots white when selected
                isSelected && "bg-white"
              )} />
            )}
            {hasSymptom && !isPeriod && (
              <div className={cn(
                "w-1.5 h-1.5 rounded-full bg-blue-500",
                isSelected && "bg-white"
              )} />
            )}
          </div>
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

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground justify-center pt-4 border-t border-accent-100">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>Period Day</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
          <span>Symptoms</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-50 border border-yellow-400 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};