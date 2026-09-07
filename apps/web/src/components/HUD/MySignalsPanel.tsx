import React from 'react';
import { useTrackerStore } from '../../stores/useTrackerStore';
import { X, Radio, Clock, Trash2, ExternalLink } from 'lucide-react';
import { sound } from '../../lib/sound';

export const MySignalsPanel: React.FC = () => {
  const { signals, mySignalsOpen, setMySignalsOpen, selectSignal, endSignal } = useTrackerStore();

  if (!mySignalsOpen) return null;

  const mySignals = signals.filter((s) => s.isOwner);

  const handleClose = () => {
    sound.playClick();
    setMySignalsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#040A14]/80 backdrop-blur-sm flex items-center justify-center p-3 select-none">
      <div className="max-w-md w-full bg-[#0B1728] border-2 border-[#28A9D6] p-4 shadow-[0_0_30px_rgba(40,169,214,0.4)] relative font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#1C55A0] pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[#8DEBFF] animate-pulse" />
            <h2 className="text-sm font-bold font-arcade text-[#8DEBFF] tracking-wider">
              MY ANONYMOUS SIGNALS
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 border border-[#1C55A0] text-[#8BA9B8] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Signals List */}
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {mySignals.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#8BA9B8] bg-[#07111F] border border-[#1C55A0]">
              NO SIGNALS PUBLISHED IN THIS SESSION. TAP "+ REPORT SIGNAL" TO SHARE AN OBSERVATION.
            </div>
          ) : (
            mySignals.map((sig) => {
              const isEnded = sig.status === 'ENDED';
              const isExpired = sig.status === 'EXPIRED';
              const isActive = sig.status === 'ACTIVE';

              return (
                <div
                  key={sig.id}
                  className="bg-[#07111F] border border-[#1C55A0] p-3 flex flex-col space-y-2 hover:border-[#8DEBFF] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{sig.icon}</span>
                      <div>
                        <h4 className="text-xs font-arcade font-bold text-[#E8F7FF]">
                          {sig.title}
                        </h4>
                        <div className="text-[9px] text-[#8BA9B8] flex items-center space-x-2">
                          <span>{sig.category}</span>
                          <span>•</span>
                          <span>{sig.priority} PRIORITY</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[8px] font-arcade px-1.5 py-0.5 border ${
                        isActive
                          ? 'bg-[#63D47A]/20 text-[#63D47A] border-[#63D47A]'
                          : isEnded
                          ? 'bg-amber-900/40 text-amber-400 border-amber-500'
                          : 'bg-red-900/40 text-red-400 border-red-500'
                      }`}
                    >
                      {sig.status}
                    </span>
                  </div>

                  {sig.description && (
                    <p className="text-[11px] text-[#8BA9B8] truncate">{sig.description}</p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#1C55A0]/40">
                    <button
                      onClick={() => {
                        selectSignal(sig);
                        setMySignalsOpen(false);
                      }}
                      className="text-[10px] text-[#8DEBFF] hover:underline flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>VIEW ON MAP</span>
                    </button>

                    {isActive && (
                      <button
                        onClick={() => endSignal(sig.id)}
                        className="text-[10px] text-[#FF625A] hover:bg-[#EF4B45] hover:text-white px-2 py-0.5 border border-[#EF4B45] transition-all flex items-center space-x-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>END SIGNAL</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
