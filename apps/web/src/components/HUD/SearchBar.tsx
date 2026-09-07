import React from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { SignalCategory } from '@tn-spider-tracker/shared';
import { sound } from '../../lib/sound';

const CATEGORIES: { id: SignalCategory | 'ALL'; label: string; icon: string }[] = [
  { id: 'ALL', label: 'ALL SIGNALS', icon: '🌐' },
  { id: 'SAFETY', label: 'SAFETY', icon: '🚓' },
  { id: 'TRAFFIC', label: 'TRAFFIC', icon: '🚗' },
  { id: 'WEATHER', label: 'WEATHER', icon: '🌧️' },
  { id: 'ENVIRONMENT', label: 'ENVIRONMENT', icon: '🚧' },
  { id: 'COMMUNITY', label: 'COMMUNITY', icon: '⚡' },
  { id: 'FOOD', label: 'FOOD', icon: '🥤' },
  { id: 'FUN', label: 'FUN', icon: '🏏' },
];

// Regional geocoding dictionary for Tamil Nadu cities and landmarks
const TN_LOCATION_GEOCODE: Record<string, { lat: number; lng: number }> = {
  chennai: { lat: 13.0827, lng: 80.2707 },
  madurai: { lat: 9.9252, lng: 78.1198 },
  coimbatore: { lat: 11.0168, lng: 76.9558 },
  trichy: { lat: 10.7905, lng: 78.7047 },
  tiruchirappalli: { lat: 10.7905, lng: 78.7047 },
  salem: { lat: 11.6643, lng: 78.146 },
  tnagar: { lat: 13.0418, lng: 80.2341 },
  't. nagar': { lat: 13.0418, lng: 80.2341 },
  marina: { lat: 13.05, lng: 80.2824 },
  'marina beach': { lat: 13.05, lng: 80.2824 },
  central: { lat: 13.0827, lng: 80.2707 },
  guindy: { lat: 13.0067, lng: 80.202 },
  egmore: { lat: 13.0732, lng: 80.2609 },
};

interface SearchBarProps {
  onSearchLocation?: (coords: { lat: number; lng: number }) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchLocation }) => {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, addLog, flyToLocation } = useTrackerStore();

  const handleSearchSubmit = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    sound.playClick();

    // Check if query matches a known landmark or city
    const matchKey = Object.keys(TN_LOCATION_GEOCODE).find((key) => q.includes(key));
    if (matchKey) {
      const coords = TN_LOCATION_GEOCODE[matchKey];
      flyToLocation(coords);
      onSearchLocation?.(coords);
      addLog(`SEARCH NAVIGATED // SECTOR: ${matchKey.toUpperCase()} (${coords.lat.toFixed(4)}°, ${coords.lng.toFixed(4)}°)`, 'info');
    } else {
      addLog(`SEARCH FILTER ACTIVE // QUERY: "${searchQuery}"`, 'info');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col space-y-2 pointer-events-auto">
      {/* Input Field */}
      <div className="relative flex items-center bg-[#07111F]/90 backdrop-blur-md border-2 border-[#28A9D6] p-1.5 shadow-[0_0_20px_rgba(40,169,214,0.3)]">
        <Search className="w-4 h-4 text-[#8DEBFF] ml-2 mr-2 flex-shrink-0 animate-pulse" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search location (Chennai, Madurai, Trichy, T. Nagar) or keyword..."
          className="w-full bg-transparent text-[#E8F7FF] placeholder-[#8BA9B8] text-xs font-mono outline-none px-1"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="p-1 text-[#8BA9B8] hover:text-white mr-1"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={handleSearchSubmit}
          className="bg-[#164B8C] hover:bg-[#1C55A0] text-[#8DEBFF] border border-[#28A9D6] px-2 py-1 text-[10px] font-arcade uppercase font-bold flex items-center space-x-1"
        >
          <MapPin className="w-3 h-3 text-[#FF9F43]" />
          <span>GO</span>
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-2 py-1 text-[10px] font-arcade uppercase font-bold whitespace-nowrap border flex items-center space-x-1 transition-all ${
              categoryFilter === cat.id
                ? 'bg-[#1C55A0] text-[#8DEBFF] border-[#8DEBFF] shadow-[0_0_10px_rgba(141,235,255,0.4)]'
                : 'bg-[#07111F]/80 text-[#8BA9B8] border-[#1C55A0]/60 hover:border-[#28A9D6]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
