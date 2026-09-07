import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { X, Send, MapPin, Radio, AlertTriangle, Navigation } from 'lucide-react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { SignalCategory, SignalPriority } from '@tn-spider-tracker/shared';
import { sound } from '../../lib/sound';

const ICONS = ['🚓', '🚗', '⚠️', '🚧', '🌧️', '💧', '🎉', '🏏', '☕', '🥤', '📍', '🔥', '⚡'];

const CATEGORIES: { id: SignalCategory; label: string }[] = [
  { id: 'SAFETY', label: 'SAFETY' },
  { id: 'TRAFFIC', label: 'TRAFFIC' },
  { id: 'WEATHER', label: 'WEATHER' },
  { id: 'ENVIRONMENT', label: 'ENVIRONMENT' },
  { id: 'COMMUNITY', label: 'COMMUNITY' },
  { id: 'FOOD', label: 'FOOD' },
  { id: 'FUN', label: 'FUN' },
  { id: 'OTHER', label: 'OTHER' },
];

const DURATION_PRESETS = [
  { label: '15 MIN', minutes: 15 },
  { label: '30 MIN', minutes: 30 },
  { label: '1 HOUR', minutes: 60 },
  { label: '2 HOURS', minutes: 120 },
  { label: '4 HOURS', minutes: 240 },
  { label: 'MIDNIGHT', minutes: 480 },
];

export const SignalComposer: React.FC = () => {
  const {
    composerOpen,
    setComposerOpen,
    createSignal,
    userLocation,
    locationState,
    locationAccuracy,
    requestUserLocation,
  } = useTrackerStore();

  const [icon, setIcon] = useState('🚓');
  const [category, setCategory] = useState<SignalCategory>('SAFETY');
  const [priority, setPriority] = useState<SignalPriority>('MEDIUM');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [motto, setMotto] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);

  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number }>({
    lat: userLocation.lat,
    lng: userLocation.lng,
  });

  const pickerContainerRef = useRef<HTMLDivElement>(null);
  const pickerMapRef = useRef<maplibregl.Map | null>(null);

  // Initialize interactive MapLibre Location Picker Map
  useEffect(() => {
    if (!composerOpen || !pickerContainerRef.current || pickerMapRef.current) return;

    try {
      const initialLat = userLocation.lat;
      const initialLng = userLocation.lng;

      pickerMapRef.current = new maplibregl.Map({
        container: pickerContainerRef.current,
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [initialLng, initialLat],
        zoom: 14,
        attributionControl: false,
      });

      pickerMapRef.current.on('load', () => {
        if (pickerMapRef.current) {
          const c = pickerMapRef.current.getCenter();
          setSelectedCoords({ lat: c.lat, lng: c.lng });
        }
      });

      pickerMapRef.current.on('move', () => {
        if (pickerMapRef.current) {
          const c = pickerMapRef.current.getCenter();
          setSelectedCoords({ lat: c.lat, lng: c.lng });
        }
      });
    } catch (e) {
      console.warn('Picker map init error:', e);
    }

    return () => {
      if (pickerMapRef.current) {
        pickerMapRef.current.remove();
        pickerMapRef.current = null;
      }
    };
  }, [composerOpen]);

  if (!composerOpen) return null;

  const handleClose = () => {
    sound.playClick();
    setComposerOpen(false);
  };

  const handleUseMyLocation = async () => {
    sound.playClick();
    const pos = await requestUserLocation();
    if (pos && pickerMapRef.current) {
      pickerMapRef.current.flyTo({
        center: [pos.lng, pos.lat],
        zoom: 15,
        speed: 1.4,
      });
      setSelectedCoords({ lat: pos.lat, lng: pos.lng });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createSignal({
      title: title.trim(),
      description: description.trim() || undefined,
      motto: motto.trim() || undefined,
      category,
      priority,
      icon,
      latitude: selectedCoords.lat,
      longitude: selectedCoords.lng,
      durationMinutes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#040A14]/85 backdrop-blur-sm flex items-center justify-center p-3 select-none">
      <div className="max-w-lg w-full bg-[#0B1728] border-2 border-[#28A9D6] p-5 shadow-[0_0_30px_rgba(40,169,214,0.4)] relative max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-[#1C55A0] pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-[#EF4B45]/20 border border-[#EF4B45] flex items-center justify-center">
              <Radio className="w-4 h-4 text-[#EF4B45] animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold font-arcade text-[#8DEBFF] tracking-wider">
                PUBLISH COMMUNITY SIGNAL
              </h2>
              <p className="text-[10px] text-[#8BA9B8] uppercase">
                Anonymous Temporary Observation Terminal
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 border border-[#1C55A0] text-[#8BA9B8] hover:text-white hover:border-[#8DEBFF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {/* Icon Selector */}
          <div>
            <label className="block text-[11px] font-arcade text-[#8DEBFF] mb-1">
              SELECT SIGNAL ICON:
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-[#07111F] border border-[#1C55A0]">
              {ICONS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`w-8 h-8 text-base border flex items-center justify-center transition-all ${
                    icon === i
                      ? 'bg-[#1C55A0] border-[#8DEBFF] shadow-[0_0_8px_#8DEBFF]'
                      : 'bg-[#0B1728] border-[#1C55A0]/50 hover:border-[#28A9D6]'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-arcade text-[#8DEBFF] mb-1">
                CATEGORY:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SignalCategory)}
                className="w-full bg-[#07111F] border border-[#1C55A0] text-[#8DEBFF] p-2 outline-none focus:border-[#28A9D6]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-arcade text-[#8DEBFF] mb-1">
                PRIORITY LEVEL:
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['LOW', 'MEDIUM', 'HIGH'] as SignalPriority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2 text-[10px] font-arcade font-bold border transition-all ${
                      priority === p
                        ? p === 'HIGH'
                          ? 'bg-[#EF4B45] text-white border-white'
                          : p === 'MEDIUM'
                          ? 'bg-[#FF9F43] text-black border-white'
                          : 'bg-[#1C55A0] text-[#8DEBFF] border-[#8DEBFF]'
                        : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-arcade text-[#8DEBFF] mb-1">
              SIGNAL TITLE (REQUIRED):
            </label>
            <input
              type="text"
              required
              maxLength={80}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Traffic Police Spot Check / Heavy Rain Downpour"
              className="w-full bg-[#07111F] border border-[#1C55A0] text-[#E8F7FF] placeholder-[#536B78] p-2 outline-none focus:border-[#8DEBFF]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-arcade text-[#8DEBFF] mb-1">
              OBSERVATION DETAILS (OPTIONAL):
            </label>
            <textarea
              maxLength={300}
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What did you observe at this location?"
              className="w-full bg-[#07111F] border border-[#1C55A0] text-[#E8F7FF] placeholder-[#536B78] p-2 outline-none focus:border-[#8DEBFF] resize-none"
            />
          </div>

          {/* Motto / Tip */}
          <div>
            <label className="block text-[11px] font-arcade text-[#8DEBFF] mb-1">
              COMMUNITY MOTTO / TIP (OPTIONAL):
            </label>
            <input
              type="text"
              maxLength={120}
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              placeholder="e.g. Wear helmet! / Take alternate flyover route"
              className="w-full bg-[#07111F] border border-[#1C55A0] text-[#E8F7FF] placeholder-[#536B78] p-2 outline-none focus:border-[#8DEBFF]"
            />
          </div>

          {/* Duration Selector */}
          <div>
            <label className="block text-[11px] font-arcade text-[#8DEBFF] mb-1">
              TEMPORARY LIFETIME (EXPIRATION):
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
              {DURATION_PRESETS.map((preset) => (
                <button
                  key={preset.minutes}
                  type="button"
                  onClick={() => setDurationMinutes(preset.minutes)}
                  className={`py-1.5 text-[9px] font-arcade font-bold border transition-all ${
                    durationMinutes === preset.minutes
                      ? 'bg-[#63D47A] text-black border-white shadow-[0_0_8px_#63D47A]'
                      : 'bg-[#07111F] text-[#8BA9B8] border-[#1C55A0]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Location Picker Map */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-arcade text-[#8DEBFF]">
                SELECT SIGNAL LOCATION:
              </label>
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="text-[10px] font-arcade bg-[#164B8C] hover:bg-[#1C55A0] text-[#8DEBFF] border border-[#28A9D6] px-2 py-0.5 flex items-center space-x-1"
              >
                <Navigation className="w-3 h-3 text-[#63D47A]" />
                <span>USE MY LOCATION</span>
              </button>
            </div>

            {/* Embedded Picker Map Container */}
            <div className="relative w-full h-48 bg-[#040A14] border-2 border-[#1C55A0] overflow-hidden">
              <div ref={pickerContainerRef} className="w-full h-full absolute inset-0 z-0" />

              {/* Fixed Dead-Center Target Reticle Pin */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                <div className="relative flex flex-col items-center transform -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full border-2 border-[#EF4B45] animate-target-pulse absolute shadow-[0_0_15px_rgba(239,75,69,0.8)]" />
                  <div className="w-8 h-8 bg-[#EF4B45] border-2 border-white rounded-full flex items-center justify-center text-white shadow-lg">
                    <span className="text-sm">{icon}</span>
                  </div>
                  <div className="bg-[#07111F] text-[#8DEBFF] border border-[#28A9D6] text-[8px] font-mono px-1.5 py-0.5 mt-1 font-bold whitespace-nowrap shadow-md">
                    PAN MAP UNDER PIN
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Coordinates Bar */}
            <div className="bg-[#07111F] border border-[#1C55A0] border-t-0 p-2 flex items-center justify-between text-[11px]">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF9F43]" />
                <span className="text-[#8DEBFF] font-bold">SELECTED COORDS:</span>
              </div>
              <div className="font-mono text-[#E8F7FF] font-bold">
                {selectedCoords.lat.toFixed(4)}° N, {selectedCoords.lng.toFixed(4)}° E
              </div>
            </div>

            {/* Location Accuracy Warning */}
            {locationAccuracy && (
              <div className="text-[9px] text-[#8BA9B8] mt-1">
                LOCATION ACCURACY ±{locationAccuracy}m
              </div>
            )}
          </div>

          {/* Safety Disclaimer */}
          <div className="flex items-center space-x-2 text-[10px] text-[#FF9F43] bg-[#07111F] p-2 border border-[#FF9F43]/40">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Community reported observation. Exposes no personal user identity.</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#1C55A0]">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-[#07111F] text-[#8BA9B8] border border-[#1C55A0] hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 bg-[#EF4B45] hover:bg-[#FF625A] disabled:opacity-50 text-white font-arcade font-bold uppercase tracking-wider border border-white shadow-[0_0_15px_rgba(239,75,69,0.7)] flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>PUBLISH SIGNAL</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
