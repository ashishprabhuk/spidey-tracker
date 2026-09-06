import React from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { Utensils, Star, Flame, MapPin, X, Navigation } from 'lucide-react';

export const PaniPuriPanel: React.FC = () => {
  const { selectedPaniPuri, selectPaniPuri, addLog } = useTrackerStore();

  if (!selectedPaniPuri) return null;

  return (
    <div className="bg-[#0D2235] border-2 border-[#FF9F43] p-3 text-[#E8F7FF] cyber-box shadow-[0_0_20px_rgba(255,159,67,0.4)] animate-in fade-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-[#FF9F43]/40 pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <Utensils className="w-4 h-4 text-[#FFD166]" />
          <h3 className="font-arcade text-xs font-bold text-[#FFD166] tracking-wider uppercase">
            PANI PURI VENDOR INTEL
          </h3>
        </div>
        <button
          onClick={() => selectPaniPuri(null)}
          className="p-1 hover:bg-[#FF9F43]/30 text-[#8BA9B8] hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Details */}
      <div className="space-y-2.5 text-xs font-mono">
        <div className="bg-[#07111F] p-2 border border-[#1C55A0]">
          <div className="flex justify-between items-start">
            <span className="font-arcade text-sm font-bold text-[#8DEBFF]">
              {selectedPaniPuri.name}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 border font-bold uppercase ${
                selectedPaniPuri.isOpen
                  ? 'bg-[#63D47A]/20 text-[#63D47A] border-[#63D47A]'
                  : 'bg-red-900/30 text-red-400 border-red-500'
              }`}
            >
              {selectedPaniPuri.isOpen ? 'OPEN NOW' : 'CLOSED'}
            </span>
          </div>
          <p className="text-[11px] text-[#8BA9B8] mt-1">{selectedPaniPuri.description}</p>
        </div>

        {/* Ratings & Distance */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#07111F] p-2 border border-[#1C55A0]">
            <div className="text-[10px] text-[#8BA9B8]">RATING</div>
            <div className="font-bold text-[#FFD166] flex items-center space-x-1 text-sm">
              <Star className="w-3.5 h-3.5 fill-current text-[#FFD166]" />
              <span>{selectedPaniPuri.rating} / 5.0</span>
            </div>
          </div>
          <div className="bg-[#07111F] p-2 border border-[#1C55A0]">
            <div className="text-[10px] text-[#8BA9B8]">DISTANCE</div>
            <div className="font-bold text-[#8DEBFF] flex items-center space-x-1 text-sm">
              <MapPin className="w-3.5 h-3.5 text-[#FF9F43]" />
              <span>{selectedPaniPuri.distanceMeters ?? 320} M</span>
            </div>
          </div>
        </div>

        {/* Spicy Level & Specialty */}
        {selectedPaniPuri.specialty && (
          <div className="bg-[#07111F] p-2 border border-[#1C55A0]">
            <div className="flex items-center space-x-1 text-[#FF9F43] mb-0.5">
              <Flame className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase">CHEF SPECIALTY</span>
            </div>
            <div className="text-xs text-white font-bold">{selectedPaniPuri.specialty}</div>
            {selectedPaniPuri.spicyLevel && (
              <div className="text-[10px] text-[#8BA9B8] mt-0.5">
                SPICE INTENSITY: <strong className="text-[#FF625A]">{selectedPaniPuri.spicyLevel}</strong>
              </div>
            )}
          </div>
        )}

        {/* Navigation Action */}
        <button
          onClick={() => addLog(`PLOTTING ROUTE TO PANI PURI STALL // ${selectedPaniPuri.name}`, 'success')}
          className="w-full py-1.5 px-3 bg-[#FF9F43] hover:bg-[#FFD166] text-black font-arcade text-xs uppercase font-bold flex items-center justify-center space-x-2 transition-all shadow-[0_0_10px_rgba(255,159,67,0.5)]"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>NAVIGATE TO STALL</span>
        </button>
      </div>
    </div>
  );
};
