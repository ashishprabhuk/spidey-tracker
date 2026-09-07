export type SignalCategory =
  | 'SAFETY'
  | 'TRAFFIC'
  | 'WEATHER'
  | 'ENVIRONMENT'
  | 'COMMUNITY'
  | 'FOOD'
  | 'FUN'
  | 'OTHER';

export type SignalPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export type SignalStatus = 'ACTIVE' | 'ENDED' | 'EXPIRED';

export interface Signal {
  id: string;
  anonymousUserId: string;
  title: string;
  description?: string | null;
  motto?: string | null;
  category: SignalCategory;
  priority: SignalPriority;
  icon: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  expiresAt: string;
  endedAt?: string | null;
  status: SignalStatus;
  isDemo?: boolean;
  distanceMeters?: number;
  isOwner?: boolean;
}

export interface SignalCreateInput {
  title: string;
  description?: string;
  motto?: string;
  category: SignalCategory;
  priority: SignalPriority;
  icon: string;
  latitude: number;
  longitude: number;
  durationMinutes: number;
}

export interface SignalQueryFilters {
  latitude?: number;
  longitude?: number;
  radiusMeters?: number;
  category?: SignalCategory | 'ALL';
  searchQuery?: string;
}
