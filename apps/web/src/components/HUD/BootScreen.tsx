import React, { useEffect, useState } from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { ShieldAlert, Cpu, Radio, MapPin, Play } from 'lucide-react';
import { sound } from '../../lib/sound';

export const BootScreen: React.FC = () => {
  const { booted, setBooted, addLog } = useTrackerStore();
  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState('CONNECTING SATELLITE LINK...');

  useEffect(() => {
    if (booted) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 5;
        if (next === 25) setBootStep('INITIALIZING SENSOR ARRAY...');
        if (next === 55) setBootStep('LOADING TAMIL NADU CARTOGRAPHY...');
        if (next === 85) setBootStep('ESTABLISHING PANI PURI NETWORK...');
        if (next === 100) setBootStep('SYSTEM READY.');
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [booted]);

  if (booted) return null;

  const handleLaunch = () => {
    sound.playTargetLock();
    setBooted(true);
    addLog('TACTICAL TRACKING TERMINAL LAUNCHED', 'success');
  };

  return (
    <div
      onClick={handleLaunch}
      className="fixed inset-0 z-50 bg-[#040A14] flex flex-col items-center justify-center p-6 text-[#E8F7FF] cursor-pointer select-none"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#28A9D6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#0B1728] border-2 border-[#28A9D6] p-6 rounded-none shadow-[0_0_30px_rgba(40,169,214,0.3)] relative">
        <div className="flex items-center space-x-3 mb-6 border-b-2 border-[#1C55A0] pb-4">
          <div className="w-10 h-10 bg-[#EF4B45]/20 border border-[#EF4B45] flex items-center justify-center animate-pulse">
            <ShieldAlert className="w-6 h-6 text-[#EF4B45]" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-arcade text-[#8DEBFF] tracking-wider">
              SPIDEY TRACKER
            </h1>
            <p className="text-xs text-[#8BA9B8] uppercase">Tamil Nadu Intelligence Terminal v2.4</p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-mono">
          <div className="bg-[#07111F] p-2 border border-[#1C55A0] flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[#8DEBFF] animate-pulse" />
            <span>SAT LINK: <strong className="text-[#63D47A]">ONLINE</strong></span>
          </div>
          <div className="bg-[#07111F] p-2 border border-[#1C55A0] flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#FF9F43]" />
            <span>SECTOR: <strong className="text-[#8DEBFF]">TN-CHN</strong></span>
          </div>
          <div className="bg-[#07111F] p-2 border border-[#1C55A0] flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-[#28A9D6]" />
            <span>CORE: <strong className="text-[#63D47A]">READY</strong></span>
          </div>
          <div className="bg-[#07111F] p-2 border border-[#1C55A0] flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-[#EF4B45]" />
            <span>TARGET: <strong className="text-[#FF625A]">SPDR-001</strong></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-[#8BA9B8]">{bootStep}</span>
            <span className="text-[#8DEBFF] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-[#07111F] border border-[#28A9D6] p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#28A9D6] via-[#8DEBFF] to-[#63D47A] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Launch Button */}
        <button
          onClick={handleLaunch}
          className="w-full py-3 bg-[#EF4B45] hover:bg-[#FF625A] text-white font-arcade font-bold tracking-widest text-sm uppercase border-2 border-white flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(239,75,69,0.7)] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>{progress >= 100 ? 'ENTER COMMAND CENTER' : 'SKIP BOOT & ENTER'}</span>
        </button>
      </div>
    </div>
  );
};
