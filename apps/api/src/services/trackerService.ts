import {
  DEFAULT_SPIDEY_TARGET,
  DEMO_ACTIVITIES,
  DEMO_PANI_PURI_LOCATIONS,
  Target,
  Activity,
  PaniPuriLocation,
  TrackerState,
} from '@tn-spider-tracker/shared';

interface ActiveSession {
  sessionId: string;
  status: TrackerState;
  createdAt: number;
  target?: Target;
}

const inMemorySessions = new Map<string, ActiveSession>();

export class TrackerService {
  static createScanSession(userLat?: number, userLng?: number): { sessionId: string; status: TrackerState } {
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    // Custom target position offset based on user position or default Chennai
    const targetLat = userLat ? userLat + 0.008 : DEFAULT_SPIDEY_TARGET.latitude;
    const targetLng = userLng ? userLng + 0.005 : DEFAULT_SPIDEY_TARGET.longitude;

    const target: Target = {
      ...DEFAULT_SPIDEY_TARGET,
      latitude: targetLat,
      longitude: targetLng,
      lastDetectedAt: new Date().toISOString(),
    };

    inMemorySessions.set(sessionId, {
      sessionId,
      status: 'SCANNING',
      createdAt: Date.now(),
      target,
    });

    return { sessionId, status: 'SCANNING' };
  }

  static getSessionStatus(sessionId: string): { sessionId: string; status: TrackerState; target?: Target } {
    const session = inMemorySessions.get(sessionId);

    if (!session) {
      // Return deterministic target lock for unknown/demo session IDs
      return {
        sessionId,
        status: 'TARGET_LOCKED',
        target: DEFAULT_SPIDEY_TARGET,
      };
    }

    const elapsed = Date.now() - session.createdAt;

    if (elapsed > 2000) {
      session.status = 'TARGET_LOCKED';
    } else if (elapsed > 1000) {
      session.status = 'SIGNAL_DETECTED';
    } else {
      session.status = 'SCANNING';
    }

    return {
      sessionId: session.sessionId,
      status: session.status,
      target: session.target,
    };
  }

  static getTargetById(id: string): Target {
    return {
      ...DEFAULT_SPIDEY_TARGET,
      id,
      lastDetectedAt: new Date().toISOString(),
    };
  }

  static getActivities(lat?: number, lng?: number, radius?: number): Activity[] {
    return DEMO_ACTIVITIES;
  }

  static getPaniPuriLocations(lat?: number, lng?: number, radius?: number): PaniPuriLocation[] {
    return DEMO_PANI_PURI_LOCATIONS;
  }
}
