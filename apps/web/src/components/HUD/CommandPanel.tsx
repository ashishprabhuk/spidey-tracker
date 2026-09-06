import React from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { Target, Search, Utensils, RotateCcw, ShieldAlert, SlidersHorizontal } from 'lucide-react';

export const CommandPanel: React.FC = () => {
  const {
    trackerState,
    tnMode,
    paniPuriMode,
    startScan,
    toggleTnMode,
    togglePaniPuriMode,
    resetTracker,
    activeFilter,
    setActiveFilter,
  } = useTrackerStore();

  const isScanning = trackerState === 'SCANNING' || trackerState === 'SIGNAL_DETECTED';

  return (
    <div className="bg-[#0D2235] border-2 border-[#28A9D6] p-3 text-[#E8F7FF] cyber-box shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b-2 border-[#1C55A0] pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-[#8DEBFF]" />
          <h2 className="font-arcade text-xs font-bold text-[#8DEBFF] tracking-wider uppercase">
            COMMAND TERMINAL
          </h2>
        </div>
        <span className="text-[10px] text-[#8BA9B8]">SYS_CMD // 01</span>
      </div>

      {/* Main Command Buttons */}
      <div className="space-y-2.5">
        {/* Locate Target Button */}
        <button
          onClick={startScan}
          disabled={isScanning}
          className={`w-full py-2.5 px-3 border-2 font-arcade font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all duration-150 shadow-md ${
            isScanning
              ? 'bg-[#FF9F43]/20 border-[#FF9F43] text-[#FF9F43] cursor-not-allowed animate-pulse'
              : 'bg-[#EF4B45] hover:bg-[#FF625A] text-white border-white hover:border-[#8DEBFF] shadow-[0_0_12px_rgba(239,75,69,0.5)] active:scale-[0.98]'
          }`}
        >
          <span className="flex items-center space-x-2">
            <Target className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'SCANNING SECTOR...' : 'LOCATE SPIDER-MAN'}</span>
          </span>
          <span className="text-[10px] bg-black/40 px-1.5 py-0.5 border border-white/20">
            F1
          </span>
        </button>

        {/* TN Mode Toggle Button */}
        <button
          onClick={toggleTnMode}
          className={`w-full py-2 px-3 border-2 font-arcade font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all ${
            tnMode
              ? 'bg-[#FF9F43] text-black border-white shadow-[0_0_15px_rgba(255,159,67,0.7)]'
              : 'bg-[#0B1728] hover:bg-[#102B40] text-[#8DEBFF] border-[#28A9D6]'
          }`}
        >
          <span className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4" />
            <span>TAMIL NADU MODE</span>
          </span>
          <span className="text-[10px] font-mono">{tnMode ? '[ACTIVE]' : '[OFF]'}</span>
        </button>

        {/* Pani Puri Finder Button */}
        <button
          onClick={togglePaniPuriMode}
          className={`w-full py-2 px-3 border-2 font-arcade font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all ${
            paniPuriMode
              ? 'bg-[#8DEBFF] text-black border-white shadow-[0_0_15px_rgba(141,235,255,0.7)]'
              : 'bg-[#0B1728] hover:bg-[#102B40] text-[#FFD166] border-[#FF9F43]'
          }`}
        >
          <span className="flex items-center space-x-2">
            <Utensils className="w-4 h-4" />
            <span>PANI PURI FINDER</span>
          </span>
          <span className="text-[10px] font-mono">{paniPuriMode ? '[ON]' : '[OFF]'}</span>
        </button>

        {/* Quick Scan Area Button */}
        <button
          onClick={startScan}
          disabled={isScanning}
          className="w-full py-1.5 px-3 bg-[#0B1728] hover:bg-[#102B40] border border-[#1C55A0] hover:border-[#8DEBFF] text-[#8BA9B8] hover:text-[#8DEBFF] font-mono text-xs uppercase flex items-center justify-between transition-all"
        >
          <span className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5" />
            <span>RE-SCAN SECTOR</span>
          </span>
        </button>

        {/* Reset System */}
        <button
          onClick={resetTracker}
          className="w-full py-1.5 px-3 bg-[#07111F] hover:bg-[#9F2929]/30 border border-[#1C55A0] hover:border-[#EF4B45] text-[#8BA9B8] hover:text-[#FF625A] font-mono text-[11px] uppercase flex items-center justify-center space-x-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET TERMINAL</span>
        </button>
      </div>

      {/* Map Layer Filter Selector */}
      <div className="mt-4 pt-3 border-t border-[#1C55A0]">
        <span className="text-[10px] text-[#8BA9B8] font-arcade uppercase block mb-1.5">
          DISPLAY FILTER
        </span>
        <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
          {(['ALL', 'TARGET', 'PANI_PURI', 'ACTIVITY'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`py-1 px-2 border text-center transition-all ${
                activeFilter === filter
                  ? 'bg-[#1C55A0] border-[#8DEBFF] text-[#8DEBFF] font-bold'
                  : 'bg-[#07111F] border-[#1C55A0]/50 text-[#8BA9B8] hover:border-[#28A9D6]'
              }`}
            >
              {filter.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
