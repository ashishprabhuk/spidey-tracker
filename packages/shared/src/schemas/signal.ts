import { z } from 'zod';

export const SignalCategorySchema = z.enum([
  'SAFETY',
  'TRAFFIC',
  'WEATHER',
  'ENVIRONMENT',
  'COMMUNITY',
  'FOOD',
  'FUN',
  'OTHER',
]);

export const SignalPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export const SignalCreateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(80, 'Title cannot exceed 80 characters'),
  description: z
    .string()
    .max(300, 'Description cannot exceed 300 characters')
    .optional(),
  motto: z
    .string()
    .max(120, 'Motto cannot exceed 120 characters')
    .optional(),
  category: SignalCategorySchema,
  priority: SignalPrioritySchema,
  icon: z.string().min(1, 'Icon selection required'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  durationMinutes: z
    .number()
    .min(15, 'Minimum duration is 15 minutes')
    .max(1440, 'Maximum duration is 24 hours (1440 minutes)'),
});

export const SignalQuerySchema = z.object({
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
  radiusMeters: z.coerce.number().positive().default(10000),
  category: z.string().optional(),
  searchQuery: z.string().optional(),
});
