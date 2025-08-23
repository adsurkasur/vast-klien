// src/lib/notifications.ts
// Utility for menstruation notifications (mobile & desktop)

export function getExpectedMenstruationDate({ cycleLength, lastPeriodDate }: { cycleLength: number; lastPeriodDate: string | Date }): Date | null {
  // lastPeriodDate: ISO string or Date
  // cycleLength: number (days)
  if (!cycleLength || !lastPeriodDate) return null;
  const lastDate = new Date(lastPeriodDate);
  const expectedDate = new Date(lastDate);
  expectedDate.setDate(lastDate.getDate() + Number(cycleLength));
  return expectedDate;
}

export function shouldNotifyMenstruation(expectedDate: Date | null): boolean {
  if (!expectedDate) return false;
  const now = new Date();
  const diffMs = expectedDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays === 3;
}

export async function triggerMenstruationNotification({ expectedDate, profile }: { expectedDate: Date | null; profile?: { name?: string } }): Promise<void> {
  if (!expectedDate || !shouldNotifyMenstruation(expectedDate)) return;
  if (!('Notification' in window)) return;
  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await Notification.requestPermission();
  }
  if (permission === 'granted') {
    new Notification('Pengingat Menstruasi', {
      body: `Hai ${profile?.name || 'pengguna'}, menstruasi Anda diperkirakan dalam 3 hari.`,
      icon: '/favicon.ico',
    });
  }
}

// For mobile push, fallback to Notification API. For PWA, integrate with service worker if needed.
