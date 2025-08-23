"use client";

import React, { useState, useEffect } from 'react';
import { SymptomsModal } from '@/components/ui/SymptomsModal';
import { ReportsModal } from '@/components/ui/ReportsModal';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, BarChart3, Heart, Calendar, Clock, TrendingUp, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CycleData {
  periodDays: Array<{
    date: string;
    isPeriod: boolean;
    symptoms: string[];
    flow?: 'light' | 'medium' | 'heavy';
    mood?: string[];
    notes?: string;
  }>;
  cycleHistory: Array<{
    startDate: string;
    endDate: string;
    cycleLength: number;
    periodLength?: number;
  }>;
  averageCycleLength: number;
  averagePeriodLength: number;
  lastPeriodStart?: string;
  nextPeriodPrediction?: string;
}

const CalendarPage = () => {
  // Unified function: track period and open symptoms modal
  const trackPeriodAndOpenSymptoms = (dateStr: string) => {
    // Determine previous tracking state
    const prevDay = cycleData.periodDays.find(d => d.date === dateStr);
    const wasTracked = !!prevDay?.isPeriod;
    setSelectedCalendarDate(dateStr);
    updatePeriodData(dateStr, true);
    // Only open modal if the date was not tracked before (i.e., now being tracked)
    if (!wasTracked) {
      const updatedDay = cycleData.periodDays.find(d => d.date === dateStr);
      setSelectedDateForSymptoms(dateStr);
      setSymptomsModalInitial(updatedDay?.symptoms ?? []);
      setIsSymptomModalOpen(true);
    }
  };
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [selectedDateForSymptoms, setSelectedDateForSymptoms] = useState<string>('');
  const [symptomsModalInitial, setSymptomsModalInitial] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);
  const [cycleData, setCycleData] = useState<CycleData>({
    periodDays: [],
    cycleHistory: [],
    averageCycleLength: 28,
    averagePeriodLength: 5
  });
  const [showReports, setShowReports] = useState(false);
  const [reportsModalOpen, setReportsModalOpen] = useState(false);

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calendar constants
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  // Load cycle data from localStorage on startup
  useEffect(() => {
    const savedCycleData = localStorage.getItem('cycleData');
    if (savedCycleData) {
      try {
        const parsedData = JSON.parse(savedCycleData);
        setCycleData(parsedData);
      } catch (error) {
        console.error('Error loading cycle data:', error);
      }
    }
  }, []);

  // Load notifications setting from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notificationsEnabled');
    if (savedNotifications !== null) {
      setNotificationsEnabled(JSON.parse(savedNotifications));
    }
  }, []);

  // Save notifications setting to localStorage
  useEffect(() => {
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  const handleOpenSymptoms = (date: string) => {
    setSelectedDateForSymptoms(date);
    const day = cycleData.periodDays.find(d => d.date === date);
    setSymptomsModalInitial(day?.symptoms ?? []);
    setIsSymptomModalOpen(true);
  };

  const calculateNextPeriodDays = () => {
    if (!cycleData.lastPeriodStart) return null;
    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleData.averageCycleLength);
    const today = new Date();
    const diffTime = nextPeriod.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const updatePeriodData = (dateStr: string, isPeriodToggle: boolean = true) => {
    setCycleData(prev => {
      const existing = prev.periodDays.find(day => day.date === dateStr);
      let newPeriodDays;
      if (existing) {
        newPeriodDays = prev.periodDays.map(day => {
          if (day.date === dateStr) {
            // If toggling from tracked to untracked, clear symptoms
            if (isPeriodToggle && day.isPeriod) {
              return { ...day, isPeriod: false, symptoms: [] };
            }
            // If toggling from untracked to tracked, preserve symptoms
            return { ...day, isPeriod: isPeriodToggle ? !day.isPeriod : true };
          }
          return day;
        });
      } else {
        newPeriodDays = [...prev.periodDays, {
          date: dateStr,
          isPeriod: true,
          symptoms: [],
          flow: 'medium' as const
        }];
      }
      newPeriodDays = newPeriodDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const cycles = [];
      let currentCycle = null;
      for (let i = 0; i < newPeriodDays.length; i++) {
        const day = newPeriodDays[i];
        if (day.isPeriod) {
          if (!currentCycle) {
            currentCycle = {
              startDate: day.date,
              endDate: day.date,
              periodLength: 1
            };
          } else {
            const prevDay = newPeriodDays[i - 1];
            const prevDate = new Date(prevDay.date);
            const currDate = new Date(day.date);
            if ((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24) === 1 && prevDay.isPeriod) {
              currentCycle.endDate = day.date;
              currentCycle.periodLength += 1;
            } else {
              cycles.push(currentCycle);
              currentCycle = {
                startDate: day.date,
                endDate: day.date,
                periodLength: 1
              };
            }
          }
        } else if (currentCycle) {
          cycles.push(currentCycle);
          currentCycle = null;
        }
      }
      if (currentCycle) cycles.push(currentCycle);
      const cycleHistory = [];
      for (let i = 1; i < cycles.length; i++) {
        const cycleLength = Math.floor((new Date(cycles[i].startDate).getTime() - new Date(cycles[i - 1].startDate).getTime()) / (1000 * 60 * 60 * 24));
        cycleHistory.push({
          startDate: cycles[i - 1].startDate,
          endDate: cycles[i].startDate,
          cycleLength,
          periodLength: cycles[i - 1].periodLength
        });
      }
      const averageCycleLength = cycleHistory.length > 0
        ? Math.round(cycleHistory.reduce((sum, cycle) => sum + cycle.cycleLength, 0) / cycleHistory.length)
        : 28;
      const averagePeriodLength = cycles.length > 0
        ? Math.round(cycles.reduce((sum, cycle) => sum + cycle.periodLength, 0) / cycles.length)
        : 5;
      const updatedData = {
        ...prev,
        periodDays: newPeriodDays,
        cycleHistory,
        averageCycleLength,
        averagePeriodLength,
        lastPeriodStart: cycles.length > 0 ? cycles[cycles.length - 1].startDate : undefined
      };
      localStorage.setItem('cycleData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleQuickRecordToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedCalendarDate(today);
    updatePeriodData(today, true);
  };

  const togglePeriodDay = (dateStr: string) => {
    updatePeriodData(dateStr, true);
  };

  const handleLogSymptomsToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedCalendarDate(today);
    handleOpenSymptoms(today);
  };

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

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const formatDateString = (day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isPeriodDay = (dateStr: string) => {
    return cycleData.periodDays.find(day => day.date === dateStr)?.isPeriod || false;
  };

  const hasSymptoms = (dateStr: string) => {
    const day = cycleData.periodDays.find(day => day.date === dateStr);
    return day && day.symptoms.length > 0;
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-3"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateString(day);
      const isSelected = selectedCalendarDate === dateStr;
      const isPeriod = isPeriodDay(dateStr);
      const hasSymptom = hasSymptoms(dateStr);
      const dayData = cycleData.periodDays.find(d => d.date === dateStr);
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      days.push(
        <button
          key={day}
          onClick={() => {
            if (selectedCalendarDate === dateStr) {
              // Second click: track period and open modal
              trackPeriodAndOpenSymptoms(dateStr);
            } else {
              // First click: select date only
              setSelectedCalendarDate(dateStr);
            }
          }}
          className={cn(
            "p-2 text-sm font-medium rounded-xl transition-all duration-200 spring-tap relative min-h-[40px] flex flex-col items-center justify-center",
            "hover:bg-accent-100 border-2 border-transparent",
            isToday && !isSelected && "border-yellow-400 bg-yellow-50 text-yellow-800 shadow-sm",
            isSelected && !isPeriod && "border-blue-500 bg-blue-100 text-blue-800 shadow-md ring-2 ring-blue-200",
            isSelected && isPeriod && "border-red-500 bg-red-500 text-white shadow-lg ring-2 ring-red-300",
            isPeriod && !isSelected && "bg-red-100 text-red-800 border-red-300",
            hasSymptom && !isPeriod && !isSelected && "bg-blue-50 border-blue-200 text-blue-800"
          )}
        >
          <span className="text-center leading-none">{day}</span>
          <div className="flex space-x-1 mt-1">
            {isPeriod && (
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                dayData?.flow === 'light' && "bg-pink-400",
                dayData?.flow === 'medium' && "bg-red-500",
                dayData?.flow === 'heavy' && "bg-red-700",
                !dayData?.flow && "bg-red-500",
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

  const nextPeriodDays = calculateNextPeriodDays();

  const handleSaveSymptoms = (date: string, symptoms: string[]) => {
    setCycleData(prev => {
      const newPeriodDays = prev.periodDays.map(day =>
        day.date === date ? { ...day, symptoms } : day
      );
      const updatedData = { ...prev, periodDays: newPeriodDays };
      localStorage.setItem('cycleData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <div className="space-y-6 pb-32">
      <PageHeader title="Kalender Saya" subtitle="Lacak siklus dan gejala Anda" />
      <div className="px-6">
        <div className="card-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-accent-600" size={20} />
              <h2 className="text-lg font-semibold text-foreground">Pelacak Menstruasi</h2>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              <p>Klik tanggal untuk melacak menstruasi</p>
              <p>Klik dua kali untuk mengubah status</p>
            </div>
          </div>
          <div className="space-y-6">
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
            <div className="grid grid-cols-7 gap-1">
              {dayNames.map(day => (
                <div key={day} className="p-3 text-xs font-medium text-muted-foreground text-center">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground justify-center pt-4 border-t border-accent-100">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span>Hari Menstruasi</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-50 border-blue-200 rounded"></div>
                <span>Gejala</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-50 border-yellow-400 rounded"></div>
                <span>Hari Ini</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded"></div>
                <span>Terpilih</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6">
        <div className="card-elevated p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-accent-500">
          <div className="flex items-center space-x-3">
            <Clock className="text-accent-600" size={20} />
            <div>
              <p className="font-semibold text-foreground">
                {nextPeriodDays === null 
                  ? 'Mulai lacak untuk melihat prediksi'
                  : nextPeriodDays <= 3 
                    ? 'Menstruasi segera dimulai!'
                    : 'Menstruasi berikutnya'
                }
              </p>
              <p className="text-sm text-muted-foreground">
                {nextPeriodDays === null 
                  ? 'Tandai hari menstruasi untuk mendapatkan prediksi siklus'
                  : nextPeriodDays <= 0
                    ? 'Diperkirakan sekarang atau terlambat'
                    : `Diperkirakan dalam ${nextPeriodDays} hari`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6">
        <Button
          className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white h-12 spring-tap shadow-lg"
          onClick={handleQuickRecordToday}
        >
          <div className="flex items-center space-x-2">
            <Heart size={20} />
            <span className="font-semibold">Catat Hari Ini</span>
          </div>
        </Button>
      </div>
      <ReportsModal
        isOpen={reportsModalOpen}
        onClose={() => setReportsModalOpen(false)}
        averageCycleLength={cycleData.averageCycleLength}
        averagePeriodLength={cycleData.averagePeriodLength}
        cycleHistory={cycleData.cycleHistory}
        periodDays={cycleData.periodDays}
      />
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
              {notificationsEnabled ? 'Notifikasi Aktif' : 'Notifikasi Nonaktif'}
            </span>
          </Button>
          <Button
            variant="outline"
            className="w-full h-16 spring-tap flex flex-col items-center justify-center space-y-1 hover:bg-accent-50"
            onClick={() => setReportsModalOpen(true)}
          >
            <BarChart3 className="text-accent-600" size={20} />
            <span className="text-xs font-medium">Lihat Laporan</span>
          </Button>
          <Button
            variant="outline"
            className="w-full h-16 spring-tap flex flex-col items-center justify-center space-y-1 hover:bg-accent-50"
            onClick={() => trackPeriodAndOpenSymptoms(new Date().toISOString().split('T')[0])}
          >
            <Heart className="text-accent-600" size={20} />
            <span className="text-xs font-medium">Catat Gejala</span>
          </Button>
        </div>
      </div>
      <SymptomsModal
        isOpen={isSymptomModalOpen}
        onClose={() => setIsSymptomModalOpen(false)}
        selectedDate={selectedDateForSymptoms}
        initialSymptoms={symptomsModalInitial}
        onSaveSymptoms={handleSaveSymptoms}
      />
    </div>
  );
};

export default CalendarPage;
