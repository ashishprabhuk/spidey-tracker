import React, { useState } from 'react';
import { Globe, Target as TargetIcon, Navigation } from 'lucide-react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { sound } from '../../lib/sound';

export type ScopeMode = 'LOCAL' | 'REGIONAL' | 'GLOBAL';

interface TacticalRadarProps {
  onRecenter?: (coords: { lat: number; lng: number }, zoom?: number) => void;
}

export const TacticalRadar: React.FC<TacticalRadarProps> = ({ onRecenter }) => {
  const [scope, setScope] = useState<ScopeMode>('LOCAL');
  const [hoveredItem, setHoveredItem] = useState<{ id: string; name: string; type: string; distanceKm: number } | null>(null);

  const {
    userLocation,
    signals,
    selectedSignal,
    categoryFilter,
    searchQuery,
    selectSignal,
    addLog,
  } = useTrackerStore();

  const sweepGradientId = 'radar-sweep-gradient';

  // Scope configuration (radius in degrees lat/lng approximation)
  const scopeConfig: Record<ScopeMode, { radiusDeg: number; label: string; rangeText: string }> = {
    LOCAL: { radiusDeg: 0.045, label: 'LOC', rangeText: '5 KM' },
    REGIONAL: { radiusDeg: 0.45, label: 'REG', rangeText: '50 KM' },
    GLOBAL: { radiusDeg: 4.5, label: 'GLO', rangeText: '500 KM' },
  };

  const currentScope = scopeConfig[scope];

  const handleToggleScope = () => {
    sound.playClick();
    const modes: ScopeMode[] = ['LOCAL', 'REGIONAL', 'GLOBAL'];
    const nextScope = modes[(modes.indexOf(scope) + 1) % modes.length];
    setScope(nextScope);
    addLog(`RADAR SCOPE SWITCHED // MODE: ${scopeConfig[nextScope].rangeText}`, 'system');
  };

  const handleRecenterTargetOrUser = () => {
    if (selectedSignal) {
      sound.playTargetLock();
      onRecenter?.({ lat: selectedSignal.latitude, lng: selectedSignal.longitude }, 15);
      addLog(`RADAR RE-CENTERED ON SIGNAL // ${selectedSignal.title}`, 'info');
    } else {
      sound.playClick();
      onRecenter?.({ lat: userLocation.lat, lng: userLocation.lng }, 13);
      addLog('RADAR RE-CENTERED ON USER GPS', 'info');
    }
  };

  // Convert GPS coordinate delta to SVG canvas coordinates
  const cx = 80;
  const cy = 80;
  const maxRadiusPx = 68;

  const projectCoords = (lat: number, lng: number) => {
    const centerLat = userLocation.lat;
    const centerLng = userLocation.lng;

    const dLat = lat - centerLat;
    const dLng = (lng - centerLng) * Math.cos(centerLat * (Math.PI / 180));

    const rawDistDeg = Math.sqrt(dLat * dLat + dLng * dLng);
    const distRatio = Math.min(rawDistDeg / currentScope.radiusDeg, 0.95);

    const angle = Math.atan2(dLng, dLat); // angle from North (clockwise)

    const px = cx + distRatio * maxRadiusPx * Math.sin(angle);
    const py = cy - distRatio * maxRadiusPx * Math.cos(angle);

    const distanceKm = Math.round(rawDistDeg * 111 * 10) / 10;

    return { x: px, y: py, distRatio, distanceKm, isOut: rawDistDeg > currentScope.radiusDeg };
  };

  // Build octagonal spider-web ring paths
  const getOctagonPoints = (radius: number) => {
    const points: string[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const x = cx + radius * Math.sin(angle);
      const y = cy - radius * Math.cos(angle);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  // Filter active community signals for radar rendering
  const activeSignals = signals.filter((sig) => {
    if (sig.status !== 'ACTIVE') return false;
    if (categoryFilter !== 'ALL' && sig.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!sig.title.toLowerCase().includes(q) && !sig.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const signalProjs = activeSignals.map((sig) => ({
    sig,
    proj: projectCoords(sig.latitude, sig.longitude),
  }));

  const userProj = projectCoords(userLocation.lat, userLocation.lng);

  return (
    <div className="relative group/radar select-none pointer-events-auto flex items-center space-x-2">
      {/* Radar Main HUD Frame */}
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 bg-[#07111F]/85 backdrop-blur-md border border-[#28A9D6]/60 rounded-full shadow-[0_0_20px_rgba(40,169,214,0.25)] flex items-center justify-center overflow-hidden">
        {/* Pixel HUD Corner Ticks */}
        <div className="absolute top-1.5 left-3 text-[8px] font-mono text-[#8DEBFF]/70 font-bold tracking-tighter">
          [RAD-01]
        </div>
        <div className="absolute top-1.5 right-3 text-[8px] font-mono text-[#FF9F43] font-bold">
          {currentScope.rangeText}
        </div>
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[7px] font-mono text-[#8BA9B8] uppercase tracking-widest bg-[#07111F]/90 px-1 border border-[#1C55A0]/50 rounded-none">
          SCOPE: {currentScope.label}
        </div>

        {/* SVG Radar Visual Canvas */}
        <svg viewBox="0 0 160 160" className="w-full h-full p-1">
          <defs>
            <radialGradient id={sweepGradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8DEBFF" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#28A9D6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#28A9D6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Outer Octagon Ring */}
          <polygon
            points={getOctagonPoints(maxRadiusPx)}
            className="fill-[#040A14]/70 stroke-[#28A9D6]/40"
            strokeWidth="1"
            strokeDasharray="3 2"
          />

          {/* Inner Spider-Web Rings */}
          <polygon
            points={getOctagonPoints(maxRadiusPx * 0.66)}
            className="fill-none stroke-[#28A9D6]/30"
            strokeWidth="0.8"
          />
          <polygon
            points={getOctagonPoints(maxRadiusPx * 0.33)}
            className="fill-none stroke-[#28A9D6]/20"
            strokeWidth="0.8"
          />

          {/* Spider-Web Radial Lines (8 Spokes) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x2 = cx + maxRadiusPx * Math.sin(rad);
            const y2 = cy - maxRadiusPx * Math.cos(rad);
            return (
              <line
                key={deg}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                className="stroke-[#28A9D6]/25"
                strokeWidth="0.75"
              />
            );
          })}

          {/* Reticle Axis Crosshair */}
          <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} className="stroke-[#8DEBFF]/60" strokeWidth="1" />
          <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} className="stroke-[#8DEBFF]/60" strokeWidth="1" />

          {/* Clockwise Animated Cyan Radar Sweep */}
          <g className="animate-radar-sweep origin-center">
            <path
              d={`M ${cx} ${cy} L ${cx} ${cy - maxRadiusPx} A ${maxRadiusPx} ${maxRadiusPx} 0 0 1 ${cx + maxRadiusPx * Math.sin(Math.PI / 4)} ${cy - maxRadiusPx * Math.cos(Math.PI / 4)} Z`}
              fill={`url(#${sweepGradientId})`}
            />
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - maxRadiusPx}
              className="stroke-[#8DEBFF]"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Community Signal Dots Layer */}
          {signalProjs.map(({ sig, proj }) => {
            const isHigh = sig.priority === 'HIGH';
            const isMedium = sig.priority === 'MEDIUM';
            const dotColor = isHigh ? '#EF4B45' : isMedium ? '#FF9F43' : '#8DEBFF';
            const isSelected = selectedSignal?.id === sig.id;

            return (
              <g
                key={sig.id}
                onClick={() => selectSignal(sig)}
                onMouseEnter={() =>
                  setHoveredItem({
                    id: sig.id,
                    name: sig.title,
                    type: `Signal: ${sig.category}`,
                    distanceKm: proj.distanceKm,
                  })
                }
                onMouseLeave={() => setHoveredItem(null)}
                className="cursor-pointer group/dot"
              >
                {/* Outer Reticle Ring for High Priority / Selected */}
                {(isHigh || isSelected) && (
                  <circle
                    cx={proj.x}
                    cy={proj.y}
                    r={isSelected ? '7' : '5.5'}
                    className="fill-none stroke-[#EF4B45] animate-target-pulse"
                    strokeWidth="1"
                    strokeDasharray="2 1"
                  />
                )}
                <circle
                  cx={proj.x}
                  cy={proj.y}
                  r="3.5"
                  fill={dotColor}
                  className="stroke-[#07111F] transition-all group-hover/dot:r-5"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* User GPS Location Dot (Neon Green Center) */}
          <g
            onMouseEnter={() =>
              setHoveredItem({
                id: 'user-gps',
                name: 'YOUR POSITION',
                type: 'GPS LINK ACTIVE',
                distanceKm: 0,
              })
            }
            onMouseLeave={() => setHoveredItem(null)}
            className="cursor-pointer"
          >
            <circle cx={userProj.x} cy={userProj.y} r="7" className="fill-none stroke-[#63D47A]/60 animate-ping" />
            <circle cx={userProj.x} cy={userProj.y} r="3.5" className="fill-[#63D47A] stroke-[#07111F]" strokeWidth="1" />
          </g>
        </svg>

        {/* Hover Tooltip Overlay on Radar */}
        {hoveredItem && (
          <div className="absolute inset-x-2 bottom-6 bg-[#0B1728]/95 border border-[#8DEBFF] p-1 text-[8px] font-mono text-[#8DEBFF] z-20 pointer-events-none shadow-lg text-center truncate">
            <div className="font-bold text-[#FF625A] truncate">{hoveredItem.name}</div>
            <div className="text-[7px] text-[#8BA9B8]">
              {hoveredItem.type} • {hoveredItem.distanceKm} km
            </div>
          </div>
        )}
      </div>

      {/* Attached HUD Control Buttons (Right side of Radar) */}
      <div className="flex flex-col space-y-2">
        {/* Globe Scope Switcher Button */}
        <button
          onClick={handleToggleScope}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0D2235]/90 border border-[#28A9D6] text-[#8DEBFF] hover:bg-[#1C55A0] hover:border-[#8DEBFF] active:scale-95 transition-all flex items-center justify-center relative shadow-[0_0_10px_rgba(40,169,214,0.4)] group"
          title={`Scope: ${currentScope.label} (${currentScope.rangeText})`}
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-45 transition-transform" />
          <span className="absolute -top-1 -right-1 bg-[#EF4B45] text-white text-[7px] font-arcade px-1 rounded-full font-bold">
            {currentScope.label}
          </span>
        </button>

        {/* Target / Recenter Button */}
        <button
          onClick={handleRecenterTargetOrUser}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border active:scale-95 transition-all flex items-center justify-center shadow-lg ${
            selectedSignal
              ? 'bg-[#EF4B45]/20 border-[#EF4B45] text-[#FF625A] hover:bg-[#EF4B45] hover:text-white shadow-[0_0_10px_rgba(239,75,69,0.5)] animate-pulse'
              : 'bg-[#0D2235]/90 border-[#28A9D6] text-[#8DEBFF] hover:bg-[#1C55A0] hover:border-[#8DEBFF]'
          }`}
          title={selectedSignal ? `Recenter on Signal ${selectedSignal.title}` : 'Recenter on User GPS'}
        >
          {selectedSignal ? <TargetIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
      </div>
    </div>
  );
};
