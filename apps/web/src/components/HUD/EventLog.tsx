import React, { useState } from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { Terminal, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

export const EventLog: React.FC = () => {
  const { eventLogs } = useTrackerStore();
  const [expanded, setExpanded] = useState(false);

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-[#63D47A]';
      case 'alert':
      case 'warn':
        return 'text-[#FF9F43]';
      case 'system':
        return 'text-[#8DEBFF] font-bold';
      default:
        return 'text-[#8BA9B8]';
    }
  };

  return (
    <div className="w-full bg-[#07111F] border-t-2 border-[#1C55A0] text-xs font-mono text-[#E8F7FF] z-30 relative shadow-inner">
      {/* Log Header Bar */}
      <div className="px-3 py-1.5 bg-[#0B1728] border-b border-[#1C55A0] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-[#8DEBFF]" />
          <span className="font-arcade text-[11px] font-bold text-[#8DEBFF] tracking-wider uppercase">
            SYSTEM EVENT LOG
          </span>
          <span className="text-[10px] bg-[#164B8C] text-[#8DEBFF] px-1.5 py-0.2 border border-[#28A9D6]">
            LIVE FEED ({eventLogs.length})
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center space-x-1 text-[11px] text-[#8BA9B8] hover:text-[#8DEBFF] transition-all"
        >
          <span>{expanded ? 'COLLAPSE' : 'EXPAND'}</span>
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Log Entries Container */}
      <div
        className={`px-3 py-2 overflow-y-auto space-y-1 transition-all duration-200 ${
          expanded ? 'h-40' : 'h-14'
        }`}
      >
        {eventLogs.map((log, idx) => (
          <div
            key={log.id}
            className={`flex items-start space-x-2 text-[11px] ${
              idx === 0 ? 'bg-[#102B40]/40 p-0.5 border-l-2 border-[#8DEBFF]' : ''
            }`}
          >
            <span className="text-[#8BA9B8] shrink-0 font-semibold">{log.timestamp}</span>
            <span className="text-[#28A9D6] shrink-0">&gt;</span>
            <span className={`break-all ${getLogTypeColor(log.type)}`}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
