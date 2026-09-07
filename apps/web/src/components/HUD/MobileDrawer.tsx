import React, { useState } from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { CommandPanel } from './CommandPanel';
import { SignalDetailPanel } from './SignalDetailPanel';
import { EventLog } from './EventLog';
import { SlidersHorizontal, Radio, Terminal, ChevronUp, ChevronDown, UserCheck } from 'lucide-react';
import { sound } from '../../lib/sound';

export const MobileDrawer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'COMMAND' | 'SIGNAL' | 'MY_REPORTS' | 'LOG'>('COMMAND');
  const [isOpen, setIsOpen] = useState(false);

  const { selectedSignal, signals, setMySignalsOpen, setComposerOpen } = useTrackerStore();

  const handleTabClick = (tab: 'COMMAND' | 'SIGNAL' | 'MY_REPORTS' | 'LOG') => {
    sound.playClick();
    if (tab === 'MY_REPORTS') {
      setMySignalsOpen(true);
      return;
    }
    if (activeTab === tab) {
      setIsOpen(!isOpen);
    } else {
      setActiveTab(tab);
      setIsOpen(true);
    }
  };

  const mySignalsCount = signals.filter((s) => s.isOwner).length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex flex-col pointer-events-auto">
      {/* Drawer Toggle Header & Tab Selector Bar */}
      <div className="bg-[#0D2235] border-t-2 border-[#28A9D6] px-2 py-1.5 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center space-x-1 w-full justify-around">
          {/* Command Tab */}
          <button
            onClick={() => handleTabClick('COMMAND')}
            className={`flex-1 py-1.5 px-1.5 border text-[10px] font-arcade font-bold uppercase flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'COMMAND' && isOpen
                ? 'bg-[#1C55A0] text-[#8DEBFF] border-[#8DEBFF] shadow-[0_0_10px_rgba(141,235,255,0.4)]'
                : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]/60'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>COMMAND</span>
          </button>

          {/* Signal Intel Tab */}
          <button
            onClick={() => handleTabClick('SIGNAL')}
            className={`flex-1 py-1.5 px-1.5 border text-[10px] font-arcade font-bold uppercase flex items-center justify-center space-x-1 transition-all relative ${
              activeTab === 'SIGNAL' && isOpen
                ? 'bg-[#1C55A0] text-[#FF625A] border-[#EF4B45] shadow-[0_0_10px_rgba(239,75,69,0.4)]'
                : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]/60'
            }`}
          >
            <Radio className="w-3 h-3 text-[#EF4B45]" />
            <span>SIGNAL</span>
            {selectedSignal && (
              <span className="w-2 h-2 rounded-full bg-[#EF4B45] absolute top-1 right-1 animate-ping" />
            )}
          </button>

          {/* My Reports Tab */}
          <button
            onClick={() => handleTabClick('MY_REPORTS')}
            className="flex-1 py-1.5 px-1.5 border text-[10px] font-arcade font-bold uppercase flex items-center justify-center space-x-1 transition-all bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]/60"
          >
            <UserCheck className="w-3 h-3 text-[#63D47A]" />
            <span>MY REPORTS ({mySignalsCount})</span>
          </button>

          {/* Log Tab */}
          <button
            onClick={() => handleTabClick('LOG')}
            className={`flex-1 py-1.5 px-1.5 border text-[10px] font-arcade font-bold uppercase flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'LOG' && isOpen
                ? 'bg-[#1C55A0] text-[#63D47A] border-[#63D47A]'
                : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]/60'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>LOG</span>
          </button>
        </div>

        {/* Expand / Collapse Indicator */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-1.5 p-1 bg-[#07111F] border border-[#1C55A0] text-[#8DEBFF]"
          title="Toggle Drawer"
        >
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Content Area */}
      {isOpen && (
        <div className="bg-[#07111F] border-t border-[#1C55A0] max-h-[60vh] overflow-y-auto p-2 transition-all duration-200">
          {activeTab === 'COMMAND' && <CommandPanel />}
          {activeTab === 'SIGNAL' && (
            <div className="space-y-2 flex justify-center">
              {selectedSignal ? (
                <SignalDetailPanel />
              ) : (
                <div className="p-4 text-center text-xs font-mono text-[#8BA9B8] bg-[#0B1728] border border-[#1C55A0]">
                  NO COMMUNITY SIGNAL SELECTED. TAP MARKERS ON THE MAP OR RADAR TO INSPECT.
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
