import React, { useState } from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { CommandPanel } from './CommandPanel';
import { TargetIntelPanel } from './TargetIntelPanel';
import { PaniPuriPanel } from './PaniPuriPanel';
import { EventLog } from './EventLog';
import { SlidersHorizontal, ShieldCheck, Utensils, Terminal, ChevronUp, ChevronDown } from 'lucide-react';
import { sound } from '../../lib/sound';

export const MobileDrawer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'COMMAND' | 'INTEL' | 'LOG'>('COMMAND');
  const [isOpen, setIsOpen] = useState(false);

  const { selectedTarget, selectedPaniPuri } = useTrackerStore();

  const handleTabClick = (tab: 'COMMAND' | 'INTEL' | 'LOG') => {
    sound.playClick();
    if (activeTab === tab) {
      setIsOpen(!isOpen);
    } else {
      setActiveTab(tab);
      setIsOpen(true);
    }
  };

  const hasIntel = Boolean(selectedTarget || selectedPaniPuri);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex flex-col pointer-events-auto">
      {/* Drawer Toggle Header & Tab Selector Bar */}
      <div className="bg-[#0D2235] border-t-2 border-[#28A9D6] px-2 py-1.5 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center space-x-1 w-full justify-around">
          {/* Command Tab */}
          <button
            onClick={() => handleTabClick('COMMAND')}
            className={`flex-1 py-1.5 px-2 border text-[11px] font-arcade font-bold uppercase flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'COMMAND' && isOpen
                ? 'bg-[#1C55A0] text-[#8DEBFF] border-[#8DEBFF] shadow-[0_0_10px_rgba(141,235,255,0.4)]'
                : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]/60'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>COMMAND</span>
          </button>

          {/* Intel Tab */}
          <button
            onClick={() => handleTabClick('INTEL')}
            className={`flex-1 py-1.5 px-2 border text-[11px] font-arcade font-bold uppercase flex items-center justify-center space-x-1.5 transition-all relative ${
              activeTab === 'INTEL' && isOpen
                ? 'bg-[#1C55A0] text-[#FF625A] border-[#EF4B45] shadow-[0_0_10px_rgba(239,75,69,0.4)]'
                : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]/60'
            }`}
          >
            {selectedPaniPuri ? (
              <Utensils className="w-3.5 h-3.5 text-[#FFD166]" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-[#EF4B45]" />
            )}
            <span>INTEL</span>
            {hasIntel && (
              <span className="w-2 h-2 rounded-full bg-[#EF4B45] absolute top-1 right-1 animate-ping" />
            )}
          </button>

          {/* Log Tab */}
          <button
            onClick={() => handleTabClick('LOG')}
            className={`flex-1 py-1.5 px-2 border text-[11px] font-arcade font-bold uppercase flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'LOG' && isOpen
                ? 'bg-[#1C55A0] text-[#63D47A] border-[#63D47A]'
                : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>LOG</span>
          </button>
        </div>

        {/* Expand / Collapse Indicator */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 p-1.5 bg-[#07111F] border border-[#1C55A0] text-[#8DEBFF]"
          title="Toggle Drawer"
        >
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Collapsible Content Area */}
      {isOpen && (
        <div className="bg-[#07111F] border-t border-[#1C55A0] max-h-[60vh] overflow-y-auto p-2 transition-all duration-200">
          {activeTab === 'COMMAND' && <CommandPanel />}
          {activeTab === 'INTEL' && (
            <div className="space-y-2">
              <TargetIntelPanel />
              <PaniPuriPanel />
              {!hasIntel && (
                <div className="p-4 text-center text-xs font-mono text-[#8BA9B8] bg-[#0B1728] border border-[#1C55A0]">
                  NO TARGET OR PANI PURI MARKER SELECTED. TAP MARKERS ON MAP OR USE COMMANDS.
                </div>
              )}
            </div>
          )}
          {activeTab === 'LOG' && <EventLog />}
        </div>
      )}
    </div>
  );
};
