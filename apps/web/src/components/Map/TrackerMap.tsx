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
  const [mapCenterCoords, setMapCenterCoords] = useState<{ lat: number; lng: number }>({ lat: 13.0827, lng: 80.2707 });

  const signalMarkersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);

  const {
    trackerState,
    signals,
    selectedSignal,
    categoryFilter,
    searchQuery,
    tnMode,
    selectSignal,
    userLocation,
    locationState,
    requestUserLocation,
    addLog,
    checkExpirations,
    navTargetCoords,
    loadSignals,
  } = useTrackerStore();

  // Fly camera to navTargetCoords when search or location trigger occurs
  useEffect(() => {
    if (!map.current || !navTargetCoords) return;

    map.current.flyTo({
      center: [navTargetCoords.lng, navTargetCoords.lat],
      zoom: 13,
      speed: 1.4,
      essential: true,
    });
  }, [navTargetCoords]);

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
        // Initial browser geolocation request
        requestUserLocation();
        loadSignals();
      });

      map.current.on('moveend', () => {
        if (map.current) {
          const center = map.current.getCenter();
          setMapCenterCoords({ lat: center.lat, lng: center.lng });
          loadSignals();
        }
      });

      map.current.on('error', () => {
        console.warn('MapLibre style load failed');
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

  // Filter active community signals
  const activeSignals = signals.filter((sig) => {
    if (sig.status !== 'ACTIVE') return false;
    if (categoryFilter !== 'ALL' && sig.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = sig.title.toLowerCase().includes(q);
      const matchDesc = sig.description?.toLowerCase().includes(q) || false;
      const matchCategory = sig.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCategory) return false;
    }
    return true;
  });

  // Manage Native User Location MapLibre Marker
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (!userMarkerRef.current) {
      const userEl = document.createElement('div');
      userEl.className = 'custom-user-gps-marker cursor-pointer';
      userEl.innerHTML = `
        <div class="relative flex items-center justify-center pointer-events-auto">
          <div class="w-8 h-8 rounded-full bg-[#28A9D6]/30 border border-[#8DEBFF] animate-ping absolute"></div>
          <div class="w-6 h-6 rounded-full bg-[#164B8C] border-2 border-[#8DEBFF] flex items-center justify-center shadow-[0_0_10px_#8DEBFF]">
            <div class="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <span class="absolute top-7 bg-[#07111F] border border-[#28A9D6] text-[#8DEBFF] text-[9px] font-mono font-bold px-1.5 py-0.2 whitespace-nowrap shadow-md">
            YOU (GPS)
          </span>
        </div>
      `;

      userMarkerRef.current = new maplibregl.Marker({
        element: userEl,
        anchor: 'center',
      })
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(map.current);
    } else {
      userMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
    }
  }, [userLocation, mapLoaded]);

  // Manage Native Community Signal MapLibre Markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const currentMap = map.current;
    const activeIds = new Set(activeSignals.map((s) => s.id));

    // Remove markers that are no longer active
    signalMarkersRef.current.forEach((marker, id) => {
      if (!activeIds.has(id)) {
        marker.remove();
        signalMarkersRef.current.delete(id);
      }
    });

    // Create or update active signal markers
    activeSignals.forEach((sig) => {
      const isSelected = selectedSignal?.id === sig.id;
      const isHigh = sig.priority === 'HIGH';
      const isMedium = sig.priority === 'MEDIUM';

      let marker = signalMarkersRef.current.get(sig.id);

      if (!marker) {
        const el = document.createElement('div');
        el.className = 'custom-signal-marker cursor-pointer pointer-events-auto transition-transform duration-200';

        const updateMarkerHTML = (selected: boolean) => {
          const priorityPulse = isHigh
            ? `<div class="w-12 h-12 rounded-full border-2 border-[#EF4B45] animate-target-pulse absolute shadow-[0_0_15px_rgba(239,75,69,0.8)]"></div>`
            : '';

          const bodyStyle = selected
            ? 'bg-[#EF4B45] border-white text-white shadow-[0_0_20px_#EF4B45] scale-110'
            : isHigh
            ? 'bg-[#0B1728] border-[#EF4B45] text-white shadow-[0_0_12px_rgba(239,75,69,0.6)]'
            : isMedium
            ? 'bg-[#0B1728] border-[#FF9F43] text-white shadow-[0_0_10px_rgba(255,159,67,0.5)]'
            : 'bg-[#0B1728] border-[#28A9D6] text-white shadow-[0_0_8px_rgba(40,169,214,0.4)]';

          const titleText = sig.title.length > 18 ? `${sig.title.substring(0, 18)}...` : sig.title;

          const tagStyle = selected
            ? 'bg-[#EF4B45] text-white border-white'
            : 'bg-[#07111F]/90 text-[#8DEBFF] border-[#1C55A0]';

          el.innerHTML = `
            <div class="relative flex flex-col items-center group">
              ${priorityPulse}
              <div class="w-9 h-9 border-2 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform ${bodyStyle}">
                <span class="text-base">${sig.icon}</span>
              </div>
              <div class="mt-1 text-[9px] font-mono font-bold px-1.5 py-0.5 border whitespace-nowrap shadow-md transition-all ${tagStyle}">
                ${titleText}
              </div>
            </div>
          `;
        };

        updateMarkerHTML(isSelected);

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          selectSignal(sig);
        });

        marker = new maplibregl.Marker({
          element: el,
          anchor: 'center',
        })
          .setLngLat([sig.longitude, sig.latitude])
          .addTo(currentMap);

        signalMarkersRef.current.set(sig.id, marker);
      } else {
        // Update marker position and selected style
        marker.setLngLat([sig.longitude, sig.latitude]);
        const el = marker.getElement();
        const selected = selectedSignal?.id === sig.id;
        const bodyStyle = selected
          ? 'bg-[#EF4B45] border-white text-white shadow-[0_0_20px_#EF4B45] scale-110'
          : isHigh
          ? 'bg-[#0B1728] border-[#EF4B45] text-white shadow-[0_0_12px_rgba(239,75,69,0.6)]'
          : isMedium
          ? 'bg-[#0B1728] border-[#FF9F43] text-white shadow-[0_0_10px_rgba(255,159,67,0.5)]'
          : 'bg-[#0B1728] border-[#28A9D6] text-white shadow-[0_0_8px_rgba(40,169,214,0.4)]';

        const bodyEl = el.querySelector('.w-9');
        if (bodyEl) {
          bodyEl.className = `w-9 h-9 border-2 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform ${bodyStyle}`;
        }
      }
    });
  }, [activeSignals, selectedSignal, mapLoaded, selectSignal]);

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();

  const handleLocateMe = async () => {
    const pos = await requestUserLocation();
    if (pos && map.current) {
      map.current.flyTo({
        center: [pos.lng, pos.lat],
        zoom: 14,
        speed: 1.5,
      });
    }
  };

  const isScanning = trackerState === 'SCANNING' || trackerState === 'SIGNAL_DETECTED';

  return (
    <div className="relative w-full h-full bg-[#040A14] overflow-hidden select-none">
      {/* MapLibre Canvas Container */}
      <div ref={mapContainer} className="w-full h-full absolute inset-0 z-0" />

      {/* Canvas / Vector Grid Overlay for Tactical Aesthetic */}
      <div className="absolute inset-0 z-10 pointer-events-none border-2 border-[#1C55A0]/40">
        {/* Tactical Corner Reticles */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-[#8DEBFF]/70 bg-[#07111F]/80 p-1 border border-[#1C55A0]">
          LAT: {mapCenterCoords.lat.toFixed(4)}° N | LON: {mapCenterCoords.lng.toFixed(4)}° E
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

      {/* Bottom Right Tactical Radar & Map Controls Overlay */}
      <div className="absolute right-4 bottom-14 md:bottom-6 z-30 flex items-end space-x-2 pointer-events-auto">
        {/* Zoom & Locate Controls */}
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
          <button
            onClick={handleLocateMe}
            className={`w-7 h-7 sm:w-8 sm:h-8 border flex items-center justify-center shadow-lg transition-all active:scale-95 ${
              locationState === 'granted'
                ? 'bg-[#164B8C] border-[#63D47A] text-[#63D47A] hover:bg-[#63D47A] hover:text-black'
                : 'bg-[#0D2235]/90 border-[#FF9F43] text-[#FF9F43] hover:bg-[#FF9F43]/20'
            }`}
            title="Locate Me (GPS)"
          >
            <Navigation className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${locationState === 'requesting' ? 'animate-spin' : ''}`} />
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
