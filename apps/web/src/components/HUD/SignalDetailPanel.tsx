import React, { useEffect, useState } from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { Clock, MapPin, X, Navigation, ShieldCheck, AlertTriangle, Trash2, User } from 'lucide-react';
import { sound } from '../../lib/sound';

export const SignalDetailPanel: React.FC = () => {
  const { selectedSignal, selectSignal, endSignal, userLocation } = useTrackerStore();
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');
  const [stabilityPercent, setStabilityPercent] = useState<number>(100);

  useEffect(() => {
    if (!selectedSignal) return;

    const updateTimer = () => {
      const now = Date.now();
      const expiresAt = new Date(selectedSignal.expiresAt).getTime();
      const createdAt = new Date(selectedSignal.createdAt).getTime();

      const totalDuration = Math.max(expiresAt - createdAt, 1);
      const remainingMs = expiresAt - now;

      if (remainingMs <= 0) {
        setTimeLeftStr('EXPIRED');
        setStabilityPercent(0);
        return;
      }

      // Calculate remaining percentage for stability bar
      const pct = Math.max(0, Math.min(100, Math.round((remainingMs / totalDuration) * 100)));
      setStabilityPercent(pct);

      const minsLeft = Math.floor(remainingMs / (1000 * 60));
      const hoursLeft = Math.floor(minsLeft / 60);
      const remMins = minsLeft % 60;

      if (hoursLeft > 0) {
        setTimeLeftStr(`Expires in ${hoursLeft}h ${remMins}m`);
      } else if (minsLeft > 0) {
        setTimeLeftStr(`Expires in ${minsLeft}m`);
      } else {
        setTimeLeftStr('EXPIRES SOON');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 5000);
    return () => clearInterval(interval);
  }, [selectedSignal]);

  if (!selectedSignal) return null;

  const handleClose = () => {
    sound.playClick();
    selectSignal(null);
  };

  const handleEndSignal = () => {
    if (confirm('END THIS SIGNAL?\n\nIt will immediately disappear from the community map.')) {
      endSignal(selectedSignal.id);
    }
  };

  // Distance math
  const dLat = (selectedSignal.latitude - userLocation.lat) * 111;
  const dLng = (selectedSignal.longitude - userLocation.lng) * 111 * Math.cos(userLocation.lat * (Math.PI / 180));
  const distKm = Math.round(Math.sqrt(dLat * dLat + dLng * dLng) * 10) / 10;
  const distMeters = Math.round(distKm * 1000);

  const getPriorityStyle = () => {
    switch (selectedSignal.priority) {
      case 'HIGH':
        return 'bg-[#EF4B45] text-white border-white';
      case 'MEDIUM':
        return 'bg-[#FF9F43] text-black border-white';
      default:
        return 'bg-[#1C55A0] text-[#8DEBFF] border-[#28A9D6]';
    }
  };

  const isExpired = selectedSignal.status === 'EXPIRED';
  const isEnded = selectedSignal.status === 'ENDED';
  const isInactive = isExpired || isEnded;

  return (
    <div className="w-80 bg-[#0B1728]/95 backdrop-blur-md border-2 border-[#28A9D6] p-4 text-[#E8F7FF] shadow-[0_0_30px_rgba(40,169,214,0.4)] relative font-mono select-none pointer-events-auto">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-[#1C55A0] pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{selectedSignal.icon}</span>
          <div>
            <span className="text-[10px] font-arcade text-[#8DEBFF] uppercase tracking-wider block">
              COMMUNITY SIGNAL
            </span>
            <span className="text-[9px] text-[#8BA9B8]">ID: {selectedSignal.id}</span>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="p-1 text-[#8BA9B8] hover:text-white border border-transparent hover:border-[#1C55A0]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Signal Title */}
      <h3 className="text-sm font-bold font-arcade text-[#8DEBFF] mb-2 leading-snug">
        {selectedSignal.title}
      </h3>

      {/* Badges Bar */}
      <div className="flex items-center space-x-2 mb-3">
        <span className={`text-[9px] font-arcade font-bold px-2 py-0.5 border ${getPriorityStyle()}`}>
          {selectedSignal.priority} PRIORITY
        </span>
        <span className="text-[9px] font-arcade bg-[#07111F] text-[#8DEBFF] px-2 py-0.5 border border-[#1C55A0]">
          {selectedSignal.category}
        </span>
        <span className="text-[9px] font-mono text-[#63D47A] flex items-center space-x-1">
          <MapPin className="w-3 h-3 text-[#FF9F43]" />
          <span>{distMeters < 1000 ? `${distMeters}m` : `${distKm}km`}</span>
        </span>
      </div>

      {/* Description & Motto */}
      {selectedSignal.description && (
        <p className="text-xs text-[#E8F7FF] bg-[#07111F] p-2 border border-[#1C55A0]/60 mb-2 leading-relaxed">
          {selectedSignal.description}
        </p>
      )}

      {selectedSignal.motto && (
        <div className="text-[11px] text-[#FFD166] italic bg-[#07111F]/80 p-1.5 border-l-2 border-[#FF9F43] mb-3">
          "{selectedSignal.motto}"
        </div>
      )}

      {/* Expiration Countdown & Stability Bar */}
      <div className="bg-[#07111F] p-2 border border-[#1C55A0] mb-3 space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="flex items-center space-x-1 text-[#8BA9B8]">
            <Clock className="w-3.5 h-3.5 text-[#8DEBFF]" />
            <span>LIFETIME:</span>
          </span>
          <span
            className={`font-arcade font-bold text-xs ${
              isInactive ? 'text-red-400' : 'text-[#63D47A]'
            }`}
          >
            {isEnded ? 'ENDED BY OWNER' : isExpired ? 'EXPIRED' : timeLeftStr}
          </span>
        </div>

        {/* Visual Stability Progress Bar */}
        {!isInactive && (
          <div className="space-y-1">
            <div className="w-full h-2 bg-[#0B1728] border border-[#28A9D6]/60 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#EF4B45] via-[#FF9F43] to-[#63D47A] transition-all duration-500"
                style={{ width: `${stabilityPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[8px] text-[#8BA9B8] font-mono">
              <span>STABILITY</span>
              <span>{stabilityPercent}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Anonymous Identity Badge */}
      <div className="flex items-center justify-between text-[10px] text-[#8BA9B8] border-t border-[#1C55A0] pt-2 mb-2">
        <span className="flex items-center space-x-1">
          <User className="w-3 h-3 text-[#8DEBFF]" />
          <span>Anonymous Reporter</span>
        </span>
        {selectedSignal.isOwner && (
          <span className="text-[9px] bg-[#63D47A]/20 text-[#63D47A] border border-[#63D47A] px-1 font-bold">
            YOU REPORTED THIS
          </span>
        )}
      </div>

      {/* Verification Disclaimer */}
      <div className="text-[9px] text-[#FF9F43] bg-[#07111F] p-1.5 border border-[#FF9F43]/40 flex items-center space-x-1.5 mb-3">
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
        <span>Community reported — verify independently.</span>
      </div>

      {/* Owner Actions */}
      {selectedSignal.isOwner && !isInactive && (
        <button
          onClick={handleEndSignal}
          className="w-full py-2 bg-[#EF4B45]/20 hover:bg-[#EF4B45] text-[#FF625A] hover:text-white border border-[#EF4B45] font-arcade font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-[0_0_10px_rgba(239,75,69,0.4)]"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>END THIS SIGNAL</span>
        </button>
      )}
    </div>
  );
};
