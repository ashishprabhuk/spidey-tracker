import React from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { Volume2, VolumeX, Monitor, Shield, Radio, Flame } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    trackerState,
    tnMode,
    paniPuriMode,
    soundEnabled,
    crtOverlay,
    toggleTnMode,
    toggleSound,
    toggleCrt,
  } = useTrackerStore();

  const getStatusColor = () => {
    switch (trackerState) {
      case 'TARGET_LOCKED':
        return 'bg-[#EF4B45] text-white border-[#FF625A] shadow-[0_0_12px_rgba(239,75,69,0.7)]';
      case 'SCANNING':
      case 'SIGNAL_DETECTED':
        return 'bg-[#FF9F43] text-black border-[#FFD166] animate-pulse';
      case 'ERROR':
        return 'bg-[#9F2929] text-white border-red-500';
      default:
        return 'bg-[#1C55A0] text-[#8DEBFF] border-[#28A9D6]';
    }
  };

  return (
    <header className="w-full bg-[#0D2235] border-b-2 border-[#28A9D6] px-4 py-2 flex flex-wrap items-center justify-between z-40 relative shadow-[0_4px_15px_rgba(7,17,31,0.8)]">
      {/* Brand Title */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#EF4B45]/20 border-2 border-[#EF4B45] flex items-center justify-center">
          <Shield className="w-5 h-5 text-[#EF4B45]" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-arcade text-lg font-bold text-[#8DEBFF] tracking-wider">
              SPIDEY TRACKER
            </h1>
            <span className="text-[10px] bg-[#164B8C] text-[#8DEBFF] px-1.5 py-0.5 border border-[#28A9D6]">
              TN-01
            </span>
          </div>
          <p className="text-[10px] text-[#8BA9B8] hidden sm:block uppercase">
            Ned’s Tamil Nadu Tactical Command Terminal
          </p>
        </div>
      </div>

      {/* Tracker Status Indicator */}
      <div className="flex items-center space-x-2 my-1 sm:my-0">
        <div
          className={`px-3 py-1 text-xs font-arcade font-bold tracking-widest border border-current flex items-center space-x-2 uppercase ${getStatusColor()}`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-ping" />
          <span>{trackerState.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Control Switches & Indicators */}
      <div className="flex items-center space-x-2 text-xs">
        {/* TN Mode Badge Button */}
        <button
          onClick={toggleTnMode}
          className={`px-2.5 py-1 border text-xs font-bold uppercase flex items-center space-x-1.5 transition-all ${
            tnMode
              ? 'bg-[#FF9F43] text-black border-white shadow-[0_0_10px_rgba(255,159,67,0.8)]'
              : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0] hover:border-[#28A9D6]'
          }`}
          title="Toggle Tamil Nadu Sector Mode"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>TN MODE: {tnMode ? 'ON' : 'OFF'}</span>
        </button>

        {/* Status Indicators */}
        <div className="hidden md:flex items-center space-x-3 bg-[#07111F] px-3 py-1 border border-[#1C55A0] text-[11px]">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#63D47A] animate-pulse" />
            <span className="text-[#8BA9B8]">SAT 04</span>
          </span>
          <span className="text-[#1C55A0]">|</span>
          <span className="flex items-center space-x-1">
            <Radio className="w-3 h-3 text-[#8DEBFF]" />
            <span className="text-[#8DEBFF]">GPS: ACTIVE</span>
          </span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          className="p-1.5 bg-[#07111F] border border-[#1C55A0] hover:border-[#8DEBFF] text-[#8DEBFF] transition-all"
          title="Toggle Sound Effects"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
        </button>

        {/* CRT Toggle */}
        <button
          onClick={toggleCrt}
          className={`p-1.5 border transition-all ${
            crtOverlay
              ? 'bg-[#1C55A0] text-[#8DEBFF] border-[#28A9D6]'
              : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]'
          }`}
          title="Toggle CRT Scanline Overlay"
        >
          <Monitor className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
