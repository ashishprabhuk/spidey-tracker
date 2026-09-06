import React from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { ShieldCheck, MapPin, Radio, Clock, X, Navigation } from 'lucide-react';

export const TargetIntelPanel: React.FC = () => {
  const { selectedTarget, trackerState, selectTarget, addLog } = useTrackerStore();

  if (!selectedTarget) return null;

  return (
    <div className="bg-[#0D2235] border-2 border-[#EF4B45] p-3 text-[#E8F7FF] cyber-box shadow-[0_0_20px_rgba(239,75,69,0.4)] animate-in fade-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#9F2929] pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#EF4B45] animate-pulse" />
          <h3 className="font-arcade text-xs font-bold text-[#FF625A] tracking-wider uppercase">
            TARGET INTELLIGENCE
          </h3>
        </div>
        <button
          onClick={() => selectTarget(null)}
          className="p-1 hover:bg-[#9F2929]/50 text-[#8BA9B8] hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Target Details */}
      <div className="space-y-2.5 text-xs font-mono">
        {/* Code & Name */}
        <div className="bg-[#07111F] p-2 border border-[#1C55A0]">
          <div className="text-[10px] text-[#8BA9B8] uppercase">TARGET DESIGNATION</div>
          <div className="font-arcade text-sm font-bold text-[#8DEBFF]">{selectedTarget.targetCode}</div>
          <div className="text-xs text-white/90">{selectedTarget.name}</div>
        </div>

        {/* Lock Status & Confidence */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#07111F] p-2 border border-[#1C55A0]">
            <div className="text-[10px] text-[#8BA9B8]">STATUS</div>
            <div className="font-bold text-[#EF4B45] uppercase flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-[#EF4B45] animate-ping" />
              <span>{trackerState === 'TARGET_LOCKED' ? 'LOCKED' : selectedTarget.status}</span>
            </div>
          </div>
          <div className="bg-[#07111F] p-2 border border-[#1C55A0]">
            <div className="text-[10px] text-[#8BA9B8]">CONFIDENCE</div>
            <div className="font-bold text-[#63D47A]">{(selectedTarget.confidence * 100).toFixed(0)}%</div>
          </div>
        </div>

        {/* Confidence Meter Bar */}
        <div>
          <div className="flex justify-between text-[10px] text-[#8BA9B8] mb-1">
            <span>SIGNAL STRENGTH</span>
            <span>HIGH ACCURACY</span>
          </div>
          <div className="w-full h-2 bg-[#07111F] border border-[#28A9D6]">
            <div
              className="h-full bg-gradient-to-r from-[#FF9F43] to-[#EF4B45]"
              style={{ width: `${selectedTarget.confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Coordinates */}
        <div className="bg-[#07111F] p-2 border border-[#1C55A0] space-y-1">
          <div className="flex items-center space-x-1 text-[#8DEBFF]">
            <MapPin className="w-3.5 h-3.5 text-[#EF4B45]" />
            <span className="font-bold">COORDINATES</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            <div>LAT: <span className="text-[#8DEBFF]">{selectedTarget.latitude.toFixed(4)}° N</span></div>
            <div>LON: <span className="text-[#8DEBFF]">{selectedTarget.longitude.toFixed(4)}° E</span></div>
          </div>
        </div>

        {/* Last Signal */}
        <div className="flex items-center justify-between text-[10px] text-[#8BA9B8] px-1">
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-[#FF9F43]" />
            <span>LAST SIGNAL:</span>
          </span>
          <span className="text-[#8DEBFF]">JUST NOW</span>
        </div>

        {/* Focus Camera Button */}
        <button
          onClick={() => addLog(`RE-CENTERING CAMERA ON TARGET ${selectedTarget.targetCode}`, 'info')}
          className="w-full py-1.5 px-3 bg-[#164B8C] hover:bg-[#1C55A0] border border-[#28A9D6] text-[#8DEBFF] font-arcade text-xs uppercase flex items-center justify-center space-x-2 transition-all"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>CENTER TARGET</span>
        </button>
      </div>
    </div>
  );
};
