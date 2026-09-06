export type TrackerState =
  | 'IDLE'
  | 'SCANNING'
  | 'SIGNAL_DETECTED'
  | 'TARGET_LOCKED'
  | 'ERROR';

export interface Target {
  id: string;
  targetCode: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'UNKNOWN';
  latitude: number;
  longitude: number;
  confidence: number;
  lastDetectedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ActivityType = 'POLICE' | 'TRAFFIC' | 'CROWD' | 'EMERGENCY' | 'ANOMALY';
export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  severity: SeverityLevel;
  occurredAt: string;
  isSimulated: boolean;
  createdAt?: string;
}

export interface PaniPuriLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  rating: number;
  isOpen: boolean;
  description?: string;
  distanceMeters?: number;
  spicyLevel?: string;
  specialty?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrackerSession {
  sessionId: string;
  status: TrackerState;
  target?: Target;
  startedAt: string;
  completedAt?: string;
}

export interface EventLogItem {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warn' | 'success' | 'alert' | 'system';
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    requestId: string;
  };
}
