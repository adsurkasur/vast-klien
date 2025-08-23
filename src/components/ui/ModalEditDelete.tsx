
import { Button } from '@/components/ui/button';

export interface ModalEditDeleteProps {
  open: boolean;
  date: string | null;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  loading?: boolean;
  error?: string | null;
}

export const ModalEditDelete: React.FC<ModalEditDeleteProps> = ({
  open,
  date,
  onEdit,
  onDelete,
  onClose,
  loading = false,
  error = null,
}) => {
  if (!open) return null;
  // Clean up modal state on close or action
  const handleEdit = () => {
    onEdit();
    onClose();
  };
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-label="Tutup popup" />
      <div className="relative card-elevated w-full max-w-xs max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Tanggal sudah dicatat</h3>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex space-x-2">
            <Button
              onClick={handleEdit}
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={!date || loading}
            >
              Sesuaikan
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={!date || loading}
            >
              Hapus
            </Button>
          </div>
          {loading && <div className="text-xs text-muted-foreground">Memproses...</div>}
        </div>
      </div>
    </div>
  );
};
