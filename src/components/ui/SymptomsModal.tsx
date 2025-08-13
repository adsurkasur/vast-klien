import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SymptomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
}

const symptomCategories = {
  physical: [
    'Cramps',
    'Headache',
    'Fatigue',
    'Bloating',
    'Breast tenderness',
    'Back pain',
    'Nausea'
  ],
  emotional: [
    'Mood swings',
    'Irritability',
    'Anxiety',
    'Depression',
    'Crying spells',
    'Food cravings'
  ],
  flow: [
    'Light flow',
    'Medium flow',
    'Heavy flow',
    'Spotting',
    'Clots'
  ]
};

export const SymptomsModal: React.FC<SymptomsModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedDate 
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);


  // Focus trap for accessibility
  const modalRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const saveSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom.');
      return;
    }
    // Here you would save to your state management system
    console.log('Saving symptoms for', selectedDate, selectedSymptoms);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="symptoms-modal-title" ref={modalRef} tabIndex={-1}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      
      {/* Modal */}
      <div className="relative card-elevated w-full max-w-md max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="text-lg font-semibold text-foreground" id="symptoms-modal-title">
            Daily Symptoms
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-primary-muted"
            aria-label="Close"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Date */}
        <div className="px-6 pb-4">
          <p className="text-sm text-muted-foreground">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Symptoms Categories */}
        <div className="px-6 pb-6 space-y-6">
          {Object.entries(symptomCategories).map(([category, symptoms]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-foreground mb-3 capitalize">
                {category} Symptoms
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {symptoms.map(symptom => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`
                      flex items-center justify-between p-3 rounded-xl text-sm transition-all duration-200 spring-tap
                      ${selectedSymptoms.includes(symptom)
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'bg-white/50 text-foreground hover:bg-white/70 border border-card-border'
                      }
                    `}
                    aria-pressed={selectedSymptoms.includes(symptom)}
                    aria-label={symptom}
                  >
                    <span className="text-xs">{symptom}</span>
                    {selectedSymptoms.includes(symptom) && (
                      <Check size={14} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 space-y-3">
          <Button
            onClick={saveSymptoms}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3"
            aria-label="Save symptoms"
            disabled={selectedSymptoms.length === 0}
          >
            Save Symptoms ({selectedSymptoms.length})
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full bg-white/50 border-card-border hover:bg-white/70"
            aria-label="Cancel"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};