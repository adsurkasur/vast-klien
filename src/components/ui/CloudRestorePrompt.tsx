import React from "react";
import { Button } from "./button";

export interface CloudRestorePromptProps {
  open: boolean;
  onKeepLocal: () => void;
  onRestoreCloud: () => void;
}

const CloudRestorePrompt: React.FC<CloudRestorePromptProps> = ({ open, onKeepLocal, onRestoreCloud }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop first, behind modal content */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0"
        onClick={onKeepLocal}
        aria-label="Tutup modal"
      />
      {/* Modal content above backdrop */}
      <div className="relative card-elevated w-full max-w-sm max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 z-10">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-semibold text-foreground">Sinkronkan data cloud?</h2>
        </div>
        <div className="px-6 pb-4">
          <p className="mb-4 text-sm text-muted-foreground">Data lokal Anda akan diganti dengan data dari cloud. Pilih "Ya" untuk memulihkan dari cloud, atau "Tidak" untuk mempertahankan data lokal.</p>
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <Button
            onClick={onKeepLocal}
            variant="outline"
            className="w-full bg-white/50 border-card-border hover:bg-white/70"
            aria-label="Batal"
          >Tidak</Button>
          <Button
            onClick={onRestoreCloud}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            aria-label="Ya, pulihkan dari cloud"
          >Ya</Button>
        </div>
      </div>
    </div>
  );
};

export default CloudRestorePrompt;
