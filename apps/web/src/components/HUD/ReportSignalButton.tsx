import React from 'react';
import { Plus, RadioReceiver } from 'lucide-react';
import { useTrackerStore } from '../../stores/useTrackerStore';

export const ReportSignalButton: React.FC = () => {
  const { setComposerOpen } = useTrackerStore();

  return (
    <button
      onClick={() => setComposerOpen(true)}
      className="group relative pointer-events-auto bg-[#EF4B45] hover:bg-[#FF625A] text-white font-arcade font-bold tracking-widest text-xs uppercase px-4 py-3 border-2 border-white shadow-[0_0_20px_rgba(239,75,69,0.8)] transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
    >
      <RadioReceiver className="w-4 h-4 text-white animate-pulse" />
      <span>+ REPORT SIGNAL</span>
      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping" />
    </button>
  );
};
