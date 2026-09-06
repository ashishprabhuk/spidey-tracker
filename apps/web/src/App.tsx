import React from 'react';
import { useTrackerStore } from './stores/useTrackerStore';
import { Header } from './components/HUD/Header';
import { CommandPanel } from './components/HUD/CommandPanel';
import { TargetIntelPanel } from './components/HUD/TargetIntelPanel';
import { PaniPuriPanel } from './components/HUD/PaniPuriPanel';
import { EventLog } from './components/HUD/EventLog';
import { BootScreen } from './components/HUD/BootScreen';
import { TrackerMap } from './components/Map/TrackerMap';

export const App: React.FC = () => {
  const { crtOverlay, selectedTarget, selectedPaniPuri } = useTrackerStore();

  return (
    <div className="w-screen h-screen flex flex-col bg-[#07111F] text-[#E8F7FF] font-mono overflow-hidden relative">
      {/* CRT Scanline Filter Overlay */}
      {crtOverlay && <div className="crt-overlay" />}

      {/* Boot Loading Screen */}
      <BootScreen />

      {/* Header Bar */}
      <Header />

      {/* Core Command Terminal Workspace */}
      <main className="flex-1 relative w-full h-full overflow-hidden">
        {/* Main Tactical Map background (70-80% spatial domination) */}
        <div className="absolute inset-0 z-0">
          <TrackerMap />
        </div>

        {/* Floating Side Panels HUD Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none p-3 flex flex-col md:flex-row justify-between items-start space-y-3 md:space-y-0">
          {/* Left Control Column */}
          <div className="w-full md:w-80 pointer-events-auto">
            <CommandPanel />
          </div>

          {/* Right Intel Column */}
          <div className="w-full md:w-80 pointer-events-auto space-y-3">
            {selectedTarget && <TargetIntelPanel />}
            {selectedPaniPuri && <PaniPuriPanel />}
          </div>
        </div>
      </main>

      {/* Bottom Live Event Stream Ticker */}
      <EventLog />
    </div>
  );
};

export default App;
