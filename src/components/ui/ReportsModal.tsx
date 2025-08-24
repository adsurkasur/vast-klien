import * as React from 'react';
import { Button } from '@/components/ui/button';

interface CycleHistory {
  startDate: string;
  endDate: string;
  cycleLength: number;
  periodLength?: number;
}

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  averageCycleLength: number | null;
  averagePeriodLength: number | null;
  cycleHistory: CycleHistory[];
  periodDays: Array<{ date: string; isPeriod: boolean; symptoms: string[] }>;
}

export const ReportsModal: React.FC<ReportsModalProps> = ({
  isOpen,
  onClose,
  averageCycleLength,
  averagePeriodLength,
  cycleHistory,
  periodDays
}: ReportsModalProps) => {
  if (!isOpen) return null;

  // Hitung gejala paling sering
  const symptomCounts: Record<string, number> = {};
  periodDays.forEach((day: { date: string; isPeriod: boolean; symptoms: string[] }) => {
    day.symptoms.forEach((symptom: string) => {
      symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
    });
  });
  const sortedSymptoms = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div>
        <div>Rata-rata panjang siklus: {averageCycleLength ?? 'Data tidak tersedia'}</div>
        <div>Rata-rata panjang periode: {averagePeriodLength ?? 'Data tidak tersedia'}</div>
      </div>
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-label="Tutup modal" />
      <div className="relative card-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="text-lg font-semibold text-foreground">Laporan Siklus & Gejala</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 hover:bg-primary-muted" aria-label="Tutup">✕</Button>
        </div>
        <div className="px-6 pb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="card-elevated p-4 text-center">
              <div className="text-2xl font-bold text-accent-600">{averageCycleLength != null ? averageCycleLength : '-'}</div>
              <div className="text-sm text-muted-foreground">Rata-rata Panjang Siklus</div>
            </div>
            <div className="card-elevated p-4 text-center">
              <div className="text-2xl font-bold text-accent-600">{averagePeriodLength != null ? averagePeriodLength : '-'}</div>
              <div className="text-sm text-muted-foreground">Rata-rata Panjang Menstruasi</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Semua Siklus</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-accent-200 rounded-lg">
                <thead>
                  <tr className="bg-accent-50">
                    <th className="text-left border border-accent-200 px-2 py-1">Tanggal Mulai</th>
                    <th className="text-left border border-accent-200 px-2 py-1">Tanggal Selesai</th>
                    <th className="text-left border border-accent-200 px-2 py-1">Panjang Siklus</th>
                    <th className="text-left border border-accent-200 px-2 py-1">Panjang Menstruasi</th>
                  </tr>
                </thead>
                <tbody>
                  {cycleHistory.length === 0 ? (
                    <tr>
                      <td className="border border-accent-200 px-2 py-1 text-center">-</td>
                      <td className="border border-accent-200 px-2 py-1 text-center">-</td>
                      <td className="border border-accent-200 px-2 py-1 text-center">-</td>
                      <td className="border border-accent-200 px-2 py-1 text-center">-</td>
                    </tr>
                  ) : (
                    cycleHistory.map((cycle: CycleHistory, idx: number) => (
                      <tr key={idx}>
                        <td className="border border-accent-200 px-2 py-1">{new Date(cycle.startDate).toLocaleDateString()}</td>
                        <td className="border border-accent-200 px-2 py-1">{new Date(cycle.endDate).toLocaleDateString()}</td>
                        <td className="border border-accent-200 px-2 py-1">{cycle.cycleLength}</td>
                        <td className="border border-accent-200 px-2 py-1">{cycle.periodLength ?? '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Gejala Paling Sering</h4>
            {sortedSymptoms.length === 0 ? (
              <div className="text-muted-foreground">Belum ada gejala yang dicatat.</div>
            ) : (
              <ul className="list-disc pl-6">
                {sortedSymptoms.map(([symptom, count]) => (
                  <li key={symptom}>{symptom} <span className="text-xs text-muted-foreground">({count}x)</span></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="px-6 pb-6">
          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3" aria-label="Tutup">Tutup</Button>
        </div>
      </div>
    </div>
  );
};
