import { create } from 'zustand';
import {
  Signal,
  SignalCategory,
  SignalCreateInput,
  Target,
  PaniPuriLocation,
  Activity,
  TrackerState,
  EventLogItem,
  DEFAULT_SPIDEY_TARGET,
  DEMO_PANI_PURI_LOCATIONS,
  DEMO_ACTIVITIES,
  DEMO_SIGNALS,
} from '@tn-spider-tracker/shared';
import { sound } from '../lib/sound';

// Get or generate persistent anonymous identity for local session
const getAnonymousSessionId = (): string => {
  if (typeof window === 'undefined') return 'anon-session-001';
  let stored = localStorage.getItem('spidey_signal_anon_id');
  if (!stored) {
    stored = `anon-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    localStorage.setItem('spidey_signal_anon_id', stored);
  }
  return stored;
};

interface TrackerStore {
  // Anonymous Session & Core States
  anonymousUserId: string;
  trackerState: TrackerState;
  tnMode: boolean;
  paniPuriMode: boolean;
  crtOverlay: boolean;
  soundEnabled: boolean;
  booted: boolean;
  userLocation: { lat: number; lng: number };

  // Signals Domain State
  signals: Signal[];
  selectedSignal: Signal | null;
  composerOpen: boolean;
  mySignalsOpen: boolean;
  searchQuery: string;
  categoryFilter: SignalCategory | 'ALL';

  // Legacy & Compatibility Layer
  selectedTarget: Target | null;
  selectedPaniPuri: PaniPuriLocation | null;
  eventLogs: EventLogItem[];
  paniPuriLocations: PaniPuriLocation[];
  activities: Activity[];
  activeFilter: 'ALL' | 'TARGET' | 'PANI_PURI' | 'ACTIVITY';

  // Signal Actions
  createSignal: (input: SignalCreateInput) => Signal;
  endSignal: (signalId: string) => void;
  selectSignal: (signal: Signal | null) => void;
  setComposerOpen: (open: boolean) => void;
  setMySignalsOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: SignalCategory | 'ALL') => void;
  checkExpirations: () => void;

  // General System Actions
  setBooted: (booted: boolean) => void;
  startScan: () => Promise<void>;
  toggleTnMode: () => void;
  togglePaniPuriMode: () => void;
  selectPaniPuri: (location: PaniPuriLocation | null) => void;
  selectTarget: (target: Target | null) => void;
  resetTracker: () => void;
  toggleSound: () => void;
  toggleCrt: () => void;
  addLog: (message: string, type?: EventLogItem['type']) => void;
  setUserLocation: (lat: number, lng: number) => void;
  setActiveFilter: (filter: 'ALL' | 'TARGET' | 'PANI_PURI' | 'ACTIVITY') => void;
}

const initialAnonId = getAnonymousSessionId();

// Tag demo signals with isOwner if matched
const initialSignals: Signal[] = DEMO_SIGNALS.map((sig) => ({
  ...sig,
  category: sig.category as SignalCategory,
  priority: sig.priority as 'LOW' | 'MEDIUM' | 'HIGH',
  status: sig.status as 'ACTIVE' | 'ENDED' | 'EXPIRED',
  isOwner: sig.anonymousUserId === initialAnonId,
}));

export const useTrackerStore = create<TrackerStore>((set, get) => ({
  anonymousUserId: initialAnonId,
  trackerState: 'IDLE',
  tnMode: false,
  paniPuriMode: false,
  crtOverlay: true,
  soundEnabled: true,
  booted: false,
  userLocation: { lat: 13.0827, lng: 80.2707 },

  // Signals Data
  signals: initialSignals,
  selectedSignal: initialSignals[0] || null,
  composerOpen: false,
  mySignalsOpen: false,
  searchQuery: '',
  categoryFilter: 'ALL',

  // Legacy Data
  selectedTarget: null,
  selectedPaniPuri: null,
  eventLogs: [
    {
      id: 'log-0',
      timestamp: new Date().toLocaleTimeString(),
      message: 'SPIDEY SIGNAL NETWORK v1.0 ONLINE',
      type: 'system',
    },
    {
      id: 'log-1',
      timestamp: new Date().toLocaleTimeString(),
      message: 'SECTOR TAMIL NADU (CHN-07) STANDBY',
      type: 'info',
    },
  ],
  paniPuriLocations: DEMO_PANI_PURI_LOCATIONS,
  activities: DEMO_ACTIVITIES,
  activeFilter: 'ALL',

  addLog: (message, type = 'info') => {
    const newLog: EventLogItem = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    set((state) => ({
      eventLogs: [newLog, ...state.eventLogs].slice(0, 50),
    }));
  },


  // Signal Domain Actions
  createSignal: (input) => {
    const { anonymousUserId, signals, addLog } = get();
    sound.playTargetLock();

    const now = new Date();
    const expiresAt = new Date(now.getTime() + input.durationMinutes * 60 * 1000);

    const newSignal: Signal = {
      id: `sig-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      anonymousUserId,
      title: input.title.trim(),
      description: input.description?.trim() || null,
      motto: input.motto?.trim() || null,
      category: input.category,
      priority: input.priority,
      icon: input.icon,
      latitude: input.latitude,
      longitude: input.longitude,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      status: 'ACTIVE',
      isOwner: true,
      isDemo: false,
    };

    set({
      signals: [newSignal, ...signals],
      selectedSignal: newSignal,
      composerOpen: false,
    });

    addLog(`COMMUNITY SIGNAL PUBLISHED // ${newSignal.title}`, 'success');
    return newSignal;
  },

  endSignal: (signalId) => {
    const { signals, selectedSignal, addLog } = get();
    sound.playClick();

    const updated = signals.map((sig) => {
      if (sig.id === signalId) {
        return {
          ...sig,
          status: 'ENDED' as const,
          endedAt: new Date().toISOString(),
        };
      }
      return sig;
    });

    const newSelected = selectedSignal?.id === signalId ? { ...selectedSignal, status: 'ENDED' as const, endedAt: new Date().toISOString() } : selectedSignal;

    set({
      signals: updated,
      selectedSignal: newSelected,
    });

    const targetSig = signals.find((s) => s.id === signalId);
    addLog(`SIGNAL TERMINATED BY CREATOR // ${targetSig?.title || signalId}`, 'warn');
  },

  selectSignal: (signal) => {
    if (signal) sound.playClick();
    set({ selectedSignal: signal, selectedTarget: null, selectedPaniPuri: null });
    if (signal) {
      get().addLog(`SIGNAL INSPECTED // ${signal.title}`, 'info');
    }
  },

  setComposerOpen: (composerOpen) => {
    sound.playClick();
    set({ composerOpen });
  },

  setMySignalsOpen: (mySignalsOpen) => {
    sound.playClick();
    set({ mySignalsOpen });
  },

  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
  },

  setCategoryFilter: (categoryFilter) => {
    sound.playClick();
    set({ categoryFilter });
  },

  checkExpirations: () => {
    const { signals } = get();
    const now = new Date();

    let hasChanges = false;
    const updated = signals.map((sig) => {
      if (sig.status === 'ACTIVE' && new Date(sig.expiresAt) <= now) {
        hasChanges = true;
        return { ...sig, status: 'EXPIRED' as const };
      }
      return sig;
    });

    if (hasChanges) {
      set({ signals: updated });
    }
  },

  // General System Actions
  setBooted: (booted) => set({ booted }),

  startScan: async () => {
    const { addLog } = get();
    sound.playScanSweep();

    set({ trackerState: 'SCANNING', selectedSignal: null });
    addLog('INITIATING TAMIL NADU SECTOR SIGNAL SCAN...', 'info');

    setTimeout(() => {
      sound.playScanSweep();
      set({ trackerState: 'SIGNAL_DETECTED' });
      addLog('7 TEMPORARY COMMUNITY SIGNALS DETECTED IN CHENNAI ZONE', 'warn');
    }, 1200);

    setTimeout(() => {
      sound.playTargetLock();
      const activeSigs = get().signals.filter((s) => s.status === 'ACTIVE');
      const targetSig = activeSigs[0] || null;
      set({
        trackerState: 'TARGET_LOCKED',
        selectedSignal: targetSig,
      });
      if (targetSig) {
        addLog(`SIGNAL LOCKED // ${targetSig.title}`, 'success');
      }
    }, 2400);
  },

  toggleTnMode: () => {
    const newMode = !get().tnMode;
    sound.playTnModeActivate();
    set({
      tnMode: newMode,
      paniPuriMode: newMode ? true : get().paniPuriMode,
    });
    get().addLog(
      newMode ? 'TAMIL NADU MODE ENABLED // REGIONAL SIGNALS ACTIVE' : 'TN MODE DEACTIVATED',
      newMode ? 'alert' : 'info'
    );
  },

  togglePaniPuriMode: () => {
    const newMode = !get().paniPuriMode;
    sound.playPaniPuriDetect();
    set({ paniPuriMode: newMode });
    get().addLog(
      newMode ? 'PANI PURI SCANNER ACTIVE // FOOD SIGNALS FILTERED' : 'PANI PURI SCANNER OFF',
      'info'
    );
  },

  selectPaniPuri: (location) => {
    if (location) sound.playClick();
    set({ selectedPaniPuri: location, selectedSignal: null });
    if (location) {
      get().addLog(`PANI PURI INTEL OPENED // ${location.name}`, 'info');
    }
  },

  selectTarget: (target) => {
    if (target) sound.playClick();
    set({ selectedTarget: target, selectedSignal: null });
  },

  resetTracker: () => {
    sound.playClick();
    set({
      trackerState: 'IDLE',
      selectedSignal: null,
      selectedTarget: null,
      selectedPaniPuri: null,
      tnMode: false,
      paniPuriMode: false,
      searchQuery: '',
      categoryFilter: 'ALL',
    });
    get().addLog('SPIDEY SIGNAL NETWORK RESET TO STANDBY', 'system');
  },

  toggleSound: () => {
    const newSoundState = !get().soundEnabled;
    sound.setMuted(!newSoundState);
    if (newSoundState) sound.playClick();
    set({ soundEnabled: newSoundState });
    get().addLog(`AUDIO FEED ${newSoundState ? 'MUTED' : 'UNMUTED'}`, 'system');
  },

  toggleCrt: () => {
    sound.playClick();
    const newCrt = !get().crtOverlay;
    set({ crtOverlay: newCrt });
    get().addLog(`CRT DISPLAY SCANLINES ${newCrt ? 'ENABLED' : 'DISABLED'}`, 'system');
  },

  setUserLocation: (lat, lng) => {
    set({ userLocation: { lat, lng } });
    get().addLog(`GPS LOCATION UPDATED // LAT: ${lat.toFixed(4)}, LNG: ${lng.toFixed(4)}`, 'info');
  },

  setActiveFilter: (filter) => {
    sound.playClick();
    set({ activeFilter: filter });
  },
}));
