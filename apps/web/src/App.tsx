import React from 'react';
import { useTrackerStore } from './stores/useTrackerStore';
import { Header } from './components/HUD/Header';
import { SearchBar } from './components/HUD/SearchBar';
import { ReportSignalButton } from './components/HUD/ReportSignalButton';
import { SignalComposer } from './components/HUD/SignalComposer';
import { SignalDetailPanel } from './components/HUD/SignalDetailPanel';
import { MySignalsPanel } from './components/HUD/MySignalsPanel';
import { PwaInstallBanner } from './components/HUD/PwaInstallBanner';
import { CommandPanel } from './components/HUD/CommandPanel';
import { EventLog } from './components/HUD/EventLog';
import { MobileDrawer } from './components/HUD/MobileDrawer';
import { BootScreen } from './components/HUD/BootScreen';
import { TrackerMap } from './components/Map/TrackerMap';

export const App: React.FC = () => {
  const { crtOverlay, selectedSignal } = useTrackerStore();

  return (
    <div className="w-screen h-screen flex flex-col bg-[#07111F] text-[#E8F7FF] font-mono overflow-hidden relative select-none">
      {/* CRT Scanline Filter Overlay */}
      {crtOverlay && <div className="crt-overlay" />}

      {/* Boot Loading Screen */}
      <BootScreen />

      {/* Header Bar */}
      <Header />

      {/* PWA App Install Banner */}
      <PwaInstallBanner />

      {/* Core Command Terminal Workspace */}
      <main className="flex-1 relative w-full h-full overflow-hidden">
        {/* Main Tactical Map background */}
        <div className="absolute inset-0 z-0">
          <TrackerMap />
        </div>

        {/* Top Floating Search Bar Overlay */}
        <div className="absolute top-3 inset-x-3 z-20 pointer-events-none flex justify-center">
          <SearchBar />
        </div>

        {/* Floating "+ REPORT SIGNAL" Primary CTA Button */}
        <div className="absolute bottom-16 md:bottom-6 left-4 z-30 pointer-events-auto">
          <ReportSignalButton />
        </div>

        {/* Desktop Floating Side Panels Overlay (hidden on mobile) */}
        <div className="hidden md:flex absolute inset-0 z-20 pointer-events-none p-3 top-16 justify-between items-start space-x-3">
          {/* Left Control Column */}
          <div className="w-80 pointer-events-auto">
            <CommandPanel />
          </div>

          {/* Right Intel Column */}
          <div className="w-80 pointer-events-auto space-y-3">
            {selectedSignal && <SignalDetailPanel />}
          </div>
        </div>

        {/* Mobile Responsive Bottom Drawer HUD */}
        <MobileDrawer />
      </main>

      {/* Signal Composer Field Terminal Modal */}
      <SignalComposer />

      {/* My Signals Modal Drawer */}
      <MySignalsPanel />

      {/* Desktop Live Event Stream Ticker */}
      <div className="hidden md:block">
        <EventLog />
      </div>
    </div>
  );
};

export default App;
