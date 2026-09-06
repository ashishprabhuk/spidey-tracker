import { create } from 'zustand';
import {
  Target,
  PaniPuriLocation,
  Activity,
  TrackerState,
  EventLogItem,
  DEFAULT_SPIDEY_TARGET,
  DEMO_PANI_PURI_LOCATIONS,
  DEMO_ACTIVITIES,
} from '@tn-spider-tracker/shared';
import { sound } from '../lib/sound';

interface TrackerStore {
  // States
  trackerState: TrackerState;
  tnMode: boolean;
  paniPuriMode: boolean;
  crtOverlay: boolean;
  soundEnabled: boolean;
  booted: boolean;
  selectedTarget: Target | null;
  selectedPaniPuri: PaniPuriLocation | null;
  userLocation: { lat: number; lng: number };
  eventLogs: EventLogItem[];
  paniPuriLocations: PaniPuriLocation[];
  activities: Activity[];
  activeFilter: 'ALL' | 'TARGET' | 'PANI_PURI' | 'ACTIVITY';

  // Actions
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

export const useTrackerStore = create<TrackerStore>((set, get) => ({
  trackerState: 'IDLE',
  tnMode: false,
  paniPuriMode: false,
  crtOverlay: true,
  soundEnabled: true,
  booted: false,
  selectedTarget: null,
  selectedPaniPuri: null,
  userLocation: { lat: 13.0827, lng: 80.2707 },
  eventLogs: [
    {
      id: 'log-0',
      timestamp: new Date().toLocaleTimeString(),
      message: 'SPIDEY TRACKER OS v2.4 INITIALIZED',
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

  setBooted: (booted) => set({ booted }),

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

  startScan: async () => {
    const { addLog } = get();
    sound.playScanSweep();

    set({ trackerState: 'SCANNING', selectedTarget: null });
    addLog('INITIATING TAMIL NADU SECTOR SATELLITE SCAN...', 'info');

    // Simulate multi-stage scanning sequence
    setTimeout(() => {
      sound.playScanSweep();
      set({ trackerState: 'SIGNAL_DETECTED' });
      addLog('HIGH-FREQUENCY BIO-SIGNAL DETECTED IN CHENNAI ZONE', 'warn');
    }, 1200);

    setTimeout(() => {
      sound.playTargetLock();
      const target: Target = {
        ...DEFAULT_SPIDEY_TARGET,
        latitude: get().userLocation.lat + 0.006,
        longitude: get().userLocation.lng + 0.004,
        lastDetectedAt: new Date().toISOString(),
      };
      set({
        trackerState: 'TARGET_LOCKED',
        selectedTarget: target,
      });
      addLog(`TARGET LOCKED // ${target.targetCode} (${target.name})`, 'success');
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
      newMode ? 'TAMIL NADU MODE ENABLED // SPECIAL SECTOR LAYERS ACTIVE' : 'TN MODE DEACTIVATED',
      newMode ? 'alert' : 'info'
    );
  },

  togglePaniPuriMode: () => {
    const newMode = !get().paniPuriMode;
    sound.playPaniPuriDetect();
    set({ paniPuriMode: newMode });
    get().addLog(
      newMode ? 'PANI PURI SCANNER ACTIVE // 6 NEARBY VENDORS LOCATED' : 'PANI PURI SCANNER OFF',
      'info'
    );
  },

  selectPaniPuri: (location) => {
    if (location) sound.playClick();
    set({ selectedPaniPuri: location });
    if (location) {
      get().addLog(`PANI PURI INTEL OPENED // ${location.name}`, 'info');
    }
  },

  selectTarget: (target) => {
    if (target) sound.playClick();
    set({ selectedTarget: target });
  },

  resetTracker: () => {
    sound.playClick();
    set({
      trackerState: 'IDLE',
      selectedTarget: null,
      selectedPaniPuri: null,
      tnMode: false,
      paniPuriMode: false,
    });
    get().addLog('TRACKER SYSTEM RESET TO IDLE STATE', 'system');
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
