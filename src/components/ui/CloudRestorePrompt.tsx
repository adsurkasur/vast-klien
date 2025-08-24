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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-2">Sinkronkan data cloud?</h2>
        <p className="mb-4 text-sm text-muted-foreground">Data lokal Anda akan diganti dengan data dari cloud. Pilih "Ya" untuk memulihkan dari cloud, atau "Tidak" untuk mempertahankan data lokal.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onKeepLocal}>Tidak</Button>
          <Button onClick={onRestoreCloud}>Ya</Button>
        </div>
      </div>
    </div>
  );
};

export default CloudRestorePrompt;
