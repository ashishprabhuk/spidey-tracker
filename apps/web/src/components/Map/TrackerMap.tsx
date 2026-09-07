import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { Signal } from '@tn-spider-tracker/shared';
import { ZoomIn, ZoomOut, Navigation, Radio } from 'lucide-react';
import { TacticalRadar } from './TacticalRadar';

export const TrackerMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const {
    trackerState,
    signals,
    selectedSignal,
    categoryFilter,
    searchQuery,
    tnMode,
    selectSignal,
    userLocation,
    addLog,
    checkExpirations,
  } = useTrackerStore();

  // Initialize MapLibre GL map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [userLocation.lng, userLocation.lat],
        zoom: 13,
        pitch: 30,
        attributionControl: false,
      });

      map.current.on('load', () => {
        setMapLoaded(true);
        addLog('SPIDEY SIGNAL MAP CARTOGRAPHY LOADED (SECTOR: TN-CHN)', 'system');
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

  // Periodic expiration tick
  useEffect(() => {
    const interval = setInterval(() => {
      checkExpirations();
    }, 10000);
    return () => clearInterval(interval);
  }, [checkExpirations]);

  // Fly camera to selected signal
  useEffect(() => {
    if (!map.current || !selectedSignal) return;

    map.current.flyTo({
      center: [selectedSignal.longitude, selectedSignal.latitude],
      zoom: 15,
      speed: 1.4,
      curve: 1,
      essential: true,
    });
  }, [selectedSignal]);

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();

  // Filter signals based on active category & search query
  const activeSignals = signals.filter((sig) => {
    if (sig.status !== 'ACTIVE') return false;

    // Category filter
    if (categoryFilter !== 'ALL' && sig.category !== categoryFilter) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = sig.title.toLowerCase().includes(q);
      const matchDesc = sig.description?.toLowerCase().includes(q) || false;
      const matchCategory = sig.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCategory) return false;
    }

    return true;
  });

  const isScanning = trackerState === 'SCANNING' || trackerState === 'SIGNAL_DETECTED';

  return (
    <div className="relative w-full h-full bg-[#040A14] overflow-hidden select-none">
      {/* MapLibre Canvas Container */}
      <div ref={mapContainer} className="w-full h-full absolute inset-0 z-0" />

      {/* Canvas / Vector Grid Overlay for Tactical Aesthetic */}
      <div className="absolute inset-0 z-10 pointer-events-none border-2 border-[#1C55A0]/40">
        {/* Tactical Corner Reticles */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-[#8DEBFF]/70 bg-[#07111F]/80 p-1 border border-[#1C55A0]">
          LAT: {userLocation.lat.toFixed(4)}° N | LON: {userLocation.lng.toFixed(4)}° E
        </div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-[#8DEBFF]/70 bg-[#07111F]/80 p-1 border border-[#1C55A0]">
          SECTOR: CHENNAI-07
        </div>
        <div className="absolute bottom-10 left-2 text-[10px] font-mono text-[#8BA9B8]/70 bg-[#07111F]/80 p-1 border border-[#1C55A0]">
          MODE: {tnMode ? 'TAMIL NADU SPECIFIC' : 'STANDARD NETWORK'}
        </div>
      </div>

      {/* Radar Scanning Overlay Beam Animation */}
      {isScanning && (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full border-2 border-[#FF9F43]/50 animate-ping absolute" />
          <div className="w-[300px] h-[300px] rounded-full border border-[#8DEBFF]/60 animate-pulse absolute" />
          <div className="w-[450px] h-[450px] rounded-full border border-[#28A9D6]/30 relative flex items-center justify-center">
            <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#8DEBFF] to-[#FF9F43] absolute right-1/2 origin-right radar-sweep-line" />
          </div>
          <div className="bg-[#0B1728]/90 border-2 border-[#FF9F43] px-4 py-2 text-[#FF9F43] font-arcade text-xs font-bold uppercase tracking-widest animate-bounce z-30 shadow-[0_0_20px_rgba(255,159,67,0.8)] flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[#FF9F43] animate-pulse" />
            <span>SCANNING COMMUNITY SIGNAL NETWORK...</span>
          </div>
        </div>
      )}

      {/* Custom Community Signal Markers Overlay Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* User Location GPS Pin */}
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

        {/* Active Community Signal Markers */}
        {activeSignals.map((sig, idx) => {
          // Calculate layout position offset based on lat/lng delta relative to center
          const latDiff = (sig.latitude - userLocation.lat) * 1000;
          const lngDiff = (sig.longitude - userLocation.lng) * 1000;

          // Standard placement layout bounding
          const topPos = Math.max(15, Math.min(80, 50 - latDiff * 4 + (idx % 3) * 6));
          const leftPos = Math.max(15, Math.min(85, 50 + lngDiff * 4 + (idx % 2) * 8));

          const isSelected = selectedSignal?.id === sig.id;
          const isHigh = sig.priority === 'HIGH';
          const isMedium = sig.priority === 'MEDIUM';

          return (
            <div
              key={sig.id}
              onClick={() => selectSignal(sig)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all duration-300"
              style={{ top: `${topPos}%`, left: `${leftPos}%` }}
            >
              <div className="relative flex flex-col items-center group">
                {/* Priority Pulsing Ring */}
                {isHigh && (
                  <div className="w-12 h-12 rounded-full border-2 border-[#EF4B45] animate-target-pulse absolute shadow-[0_0_15px_rgba(239,75,69,0.8)]" />
                )}

                {/* Marker Body */}
                <div
                  className={`w-9 h-9 border-2 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform ${
                    isSelected
                      ? 'bg-[#EF4B45] border-white text-white shadow-[0_0_20px_#EF4B45] scale-110'
                      : isHigh
                      ? 'bg-[#0B1728] border-[#EF4B45] text-white shadow-[0_0_12px_rgba(239,75,69,0.6)]'
                      : isMedium
                      ? 'bg-[#0B1728] border-[#FF9F43] text-white shadow-[0_0_10px_rgba(255,159,67,0.5)]'
                      : 'bg-[#0B1728] border-[#28A9D6] text-white shadow-[0_0_8px_rgba(40,169,214,0.4)]'
                  }`}
                >
                  <span className="text-base">{sig.icon}</span>
                </div>

                {/* Label Tag */}
                <div
                  className={`mt-1 text-[9px] font-mono font-bold px-1.5 py-0.5 border whitespace-nowrap shadow-md transition-all ${
                    isSelected
                      ? 'bg-[#EF4B45] text-white border-white'
                      : 'bg-[#07111F]/90 text-[#8DEBFF] border-[#1C55A0] group-hover:border-[#8DEBFF]'
                  }`}
                >
                  {sig.title.length > 18 ? `${sig.title.substring(0, 18)}...` : sig.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Right Tactical Radar & Map Controls Overlay */}
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

        {/* Tactical Radar Component */}
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
