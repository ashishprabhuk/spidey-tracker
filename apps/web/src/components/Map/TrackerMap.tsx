import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { Target, PaniPuriLocation, Activity } from '@tn-spider-tracker/shared';
import { Target as TargetIcon, Utensils, AlertTriangle, Shield, MapPin, ZoomIn, ZoomOut, Navigation } from 'lucide-react';
import { TacticalRadar } from './TacticalRadar';

export const TrackerMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const {
    trackerState,
    selectedTarget,
    selectedPaniPuri,
    paniPuriLocations,
    activities,
    tnMode,
    paniPuriMode,
    activeFilter,
    selectTarget,
    selectPaniPuri,
    userLocation,
    addLog,
  } = useTrackerStore();

  // Initialize MapLibre GL
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [userLocation.lng, userLocation.lat],
        zoom: 13,
        pitch: 35,
        attributionControl: false,
      });

      map.current.on('load', () => {
        setMapLoaded(true);
        addLog('TACTICAL MAP CARTOGRAPHY LOADED (SECTOR: TN-CHN)', 'system');
      });

      map.current.on('error', () => {
        console.warn('MapLibre style load failed, utilizing Canvas HUD fallback');
        setMapLoaded(false);
      });
    } catch (e) {
      console.warn('MapLibre init error:', e);
      setMapLoaded(false);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Fly to target when target is locked or selected
  useEffect(() => {
    if (!map.current || !selectedTarget) return;

    map.current.flyTo({
      center: [selectedTarget.longitude, selectedTarget.latitude],
      zoom: 15,
      speed: 1.4,
      curve: 1,
      essential: true,
    });
  }, [selectedTarget]);

  // Fly to Pani Puri location when selected
  useEffect(() => {
    if (!map.current || !selectedPaniPuri) return;

    map.current.flyTo({
      center: [selectedPaniPuri.longitude, selectedPaniPuri.latitude],
      zoom: 16,
      speed: 1.2,
      essential: true,
    });
  }, [selectedPaniPuri]);

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();
  const handleRecenter = () => {
    map.current?.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 13,
      speed: 1.5,
    });
    addLog('MAP CAMERA RE-CENTERED ON USER GPS', 'info');
  };

  const isScanning = trackerState === 'SCANNING' || trackerState === 'SIGNAL_DETECTED';
  const showTarget = (activeFilter === 'ALL' || activeFilter === 'TARGET') && selectedTarget;
  const showPaniPuri = (activeFilter === 'ALL' || activeFilter === 'PANI_PURI') && (paniPuriMode || tnMode);
  const showActivities = (activeFilter === 'ALL' || activeFilter === 'ACTIVITY') && tnMode;

  return (
    <div className="relative w-full h-full bg-[#040A14] overflow-hidden select-none">
      {/* MapLibre Canvas Container */}
      <div ref={mapContainer} className="w-full h-full absolute inset-0 z-0" />

      {/* Canvas / Vector Grid Overlay for Radar Tactical Aesthetic */}
      <div className="absolute inset-0 z-10 pointer-events-none border-2 border-[#1C55A0]/40">
        {/* Tactical Corner Reticles */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-[#8DEBFF]/70 bg-[#07111F]/80 p-1 border border-[#1C55A0]">
          LAT: {userLocation.lat.toFixed(4)}° N | LON: {userLocation.lng.toFixed(4)}° E
        </div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-[#8DEBFF]/70 bg-[#07111F]/80 p-1 border border-[#1C55A0]">
          SECTOR: CHENNAI-07
        </div>
        <div className="absolute bottom-10 left-2 text-[10px] font-mono text-[#8BA9B8]/70 bg-[#07111F]/80 p-1 border border-[#1C55A0]">
          MODE: {tnMode ? 'TAMIL NADU SPECIFIC' : 'STANDARD TRACKING'}
        </div>
      </div>

      {/* Radar Scanning Overlay Beam Animation */}
      {isScanning && (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full border-2 border-[#FF9F43]/50 animate-ping absolute" />
          <div className="w-[300px] h-[300px] rounded-full border border-[#8DEBFF]/60 animate-pulse absolute" />
          {/* Rotating Radar Scanner Line */}
          <div className="w-[450px] h-[450px] rounded-full border border-[#28A9D6]/30 relative flex items-center justify-center">
            <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#8DEBFF] to-[#FF9F43] absolute right-1/2 origin-right radar-sweep-line" />
          </div>
          <div className="bg-[#0B1728]/90 border-2 border-[#FF9F43] px-4 py-2 text-[#FF9F43] font-arcade text-xs font-bold uppercase tracking-widest animate-bounce z-30 shadow-[0_0_20px_rgba(255,159,67,0.8)]">
            Scanning Radar Array...
          </div>
        </div>
      )}

      {/* Fallback & Custom Markers Overlay Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* User Location Marker Pin */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-300"
          style={{ top: '50%', left: '50%' }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#28A9D6]/30 border border-[#8DEBFF] animate-ping absolute" />
            <div className="w-6 h-6 rounded-full bg-[#164B8C] border-2 border-[#8DEBFF] flex items-center justify-center shadow-[0_0_10px_#8DEBFF]">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="absolute top-7 bg-[#07111F] border border-[#28A9D6] text-[#8DEBFF] text-[9px] font-mono font-bold px-1.5 py-0.2 whitespace-nowrap shadow-md">
              YOU (GPS)
            </span>
          </div>
        </div>

        {/* Spider-Man Target Lock Marker */}
        {showTarget && (
          <div
            onClick={() => selectTarget(selectedTarget)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all duration-500"
            style={{ top: '42%', left: '55%' }}
          >
            <div className="relative flex items-center justify-center group">
              <div className="w-16 h-16 rounded-full border-2 border-[#EF4B45] animate-target-pulse absolute shadow-[0_0_20px_rgba(239,75,69,0.8)]" />
              <div className="w-10 h-10 bg-[#EF4B45] border-2 border-white rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                <TargetIcon className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              {/* Target Reticle Card Label */}
              <div className="absolute top-12 bg-[#0D2235] border-2 border-[#EF4B45] text-white px-2 py-1 shadow-[0_0_15px_rgba(239,75,69,0.7)] flex flex-col items-center">
                <span className="font-arcade text-[10px] font-bold text-[#FF625A]">
                  SPDR-TN-001
                </span>
                <span className="text-[9px] font-mono text-[#63D47A]">LOCKED (97%)</span>
              </div>
            </div>
          </div>
        )}

        {/* Pani Puri Vendors Markers */}
        {showPaniPuri &&
          paniPuriLocations.map((loc, idx) => {
            // Position offset math for demonstration layout
            const topPos = 35 + (idx % 3) * 18 + (idx % 2) * 5;
            const leftPos = 25 + (idx % 4) * 18;

            return (
              <div
                key={loc.id}
                onClick={() => selectPaniPuri(loc)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all duration-300"
                style={{ top: `${topPos}%`, left: `${leftPos}%` }}
              >
                <div className="relative flex flex-col items-center group">
                  <div
                    className={`w-7 h-7 rounded-none border-2 flex items-center justify-center shadow-md transform group-hover:scale-125 transition-transform ${
                      selectedPaniPuri?.id === loc.id
                        ? 'bg-[#FF9F43] border-white text-black shadow-[0_0_15px_#FF9F43]'
                        : 'bg-[#0B1728] border-[#FF9F43] text-[#FFD166]'
                    }`}
                  >
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div className="bg-[#07111F]/90 border border-[#FF9F43] text-[#FFD166] text-[9px] font-mono font-bold px-1 py-0.2 mt-1 whitespace-nowrap group-hover:border-white">
                    {loc.name.split(' ')[0]} ({loc.rating}★)
                  </div>
                </div>
              </div>
            );
          })}

        {/* Simulated Activity Markers */}
        {showActivities &&
          activities.map((act, idx) => {
            const topPos = 20 + idx * 14;
            const leftPos = 70 - (idx % 3) * 15;

            return (
              <div
                key={act.id}
                onClick={() => addLog(`ACTIVITY INSPECTED: ${act.title}`, 'alert')}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                style={{ top: `${topPos}%`, left: `${leftPos}%` }}
              >
                <div className="relative flex flex-col items-center group">
                  <div className="w-6 h-6 bg-[#FF9F43]/30 border border-[#FF9F43] flex items-center justify-center text-[#FF9F43] animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-[#07111F]/90 border border-[#FF9F43] text-[#FF9F43] text-[8px] font-mono px-1 py-0.2 mt-0.5 whitespace-nowrap">
                    [SIMULATED] {act.type}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Bottom Right Tactical Radar & Map Controls HUD Overlay */}
      <div className="absolute right-4 bottom-14 md:bottom-6 z-30 flex items-end space-x-2 pointer-events-auto">
        {/* Zoom Controls */}
        <div className="flex flex-col space-y-1.5 mb-1">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-[#0D2235]/90 border border-[#28A9D6] text-[#8DEBFF] hover:bg-[#164B8C] hover:border-[#8DEBFF] active:scale-95 flex items-center justify-center shadow-lg transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-[#0D2235]/90 border border-[#28A9D6] text-[#8DEBFF] hover:bg-[#164B8C] hover:border-[#8DEBFF] active:scale-95 flex items-center justify-center shadow-lg transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Compact Tactical Radar */}
        <TacticalRadar
          onRecenter={(coords, zoom = 14) => {
            map.current?.flyTo({
              center: [coords.lng, coords.lat],
              zoom,
              speed: 1.4,
              essential: true,
            });
          }}
        />
      </div>
    </div>
  );
};
