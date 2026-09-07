import { z } from 'zod';

export const LocationQuerySchema = z.object({
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  radius: z.coerce.number().positive().default(5000),
});

export const ScanRequestSchema = z.object({
  userLat: z.number().min(-90).max(90).optional(),
  userLng: z.number().min(-180).max(180).optional(),
  sector: z.string().optional().default('TN-CHENNAI'),
});

export const TargetSchema = z.object({
  id: z.string(),
  targetCode: z.string(),
  name: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'UNKNOWN']),
  latitude: z.number(),
  longitude: z.number(),
  confidence: z.number().min(0).max(1),
  lastDetectedAt: z.string(),
});

export const ActivitySchema = z.object({
  id: z.string(),
  type: z.enum(['POLICE', 'TRAFFIC', 'CROWD', 'EMERGENCY', 'ANOMALY']),
  title: z.string(),
  description: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  occurredAt: z.string(),
  isSimulated: z.literal(true),
});

export const PaniPuriSchema = z.object({
  id: z.string(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  rating: z.number().min(0).max(5),
  isOpen: z.boolean(),
  description: z.string().optional(),
  spicyLevel: z.string().optional(),
  specialty: z.string().optional(),
});
export * from './signal.js';
