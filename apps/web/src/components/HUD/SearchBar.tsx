import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { SignalCategory } from '@tn-spider-tracker/shared';

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

interface SearchBarProps {
  onSearchLocation?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchLocation }) => {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter } = useTrackerStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearchLocation?.(searchQuery);
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
          placeholder="Search this area, signals, or location..."
          className="w-full bg-transparent text-[#E8F7FF] placeholder-[#8BA9B8] text-xs font-mono outline-none px-1"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="p-1 text-[#8BA9B8] hover:text-white"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
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
