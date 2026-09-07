import React, { useState } from 'react';
import { X, Send, MapPin, Radio, ShieldAlert, Clock, Info, AlertTriangle } from 'lucide-react';
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
  const { composerOpen, setComposerOpen, createSignal, userLocation } = useTrackerStore();

  const [icon, setIcon] = useState('🚓');
  const [category, setCategory] = useState<SignalCategory>('SAFETY');
  const [priority, setPriority] = useState<SignalPriority>('MEDIUM');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [motto, setMotto] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);

  // Position adjustment delta relative to user position
  const [locationOffset, setLocationOffset] = useState({ lat: 0, lng: 0 });

  if (!composerOpen) return null;

  const handleClose = () => {
    sound.playClick();
    setComposerOpen(false);
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
      latitude: userLocation.lat + locationOffset.lat,
      longitude: userLocation.lng + locationOffset.lng,
      durationMinutes,
    });
  };

  const activeLat = (userLocation.lat + locationOffset.lat).toFixed(4);
  const activeLng = (userLocation.lng + locationOffset.lng).toFixed(4);

  return (
    <div className="fixed inset-0 z-50 bg-[#040A14]/80 backdrop-blur-sm flex items-center justify-center p-3 select-none">
      <div className="max-w-lg w-full bg-[#0B1728] border-2 border-[#28A9D6] p-5 shadow-[0_0_30px_rgba(40,169,214,0.4)] relative max-h-[90vh] overflow-y-auto">
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

          {/* Location Preview & Offset */}
          <div className="bg-[#07111F] border border-[#1C55A0] p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#FF9F43]" />
              <div>
                <span className="text-[#8DEBFF] font-bold">SIGNAL GPS:</span>
                <span className="text-[#8BA9B8] ml-2">
                  {activeLat}° N, {activeLng}° E
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLocationOffset({ lat: (Math.random() - 0.5) * 0.01, lng: (Math.random() - 0.5) * 0.01 })}
              className="text-[9px] bg-[#164B8C] text-[#8DEBFF] px-2 py-1 border border-[#28A9D6] hover:bg-[#1C55A0]"
            >
              ADJUST PIN
            </button>
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
