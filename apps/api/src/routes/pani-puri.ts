import { FastifyInstance } from 'fastify';
import { LocationQuerySchema } from '@tn-spider-tracker/shared';
import { TrackerService } from '../services/trackerService';

export async function paniPuriRoutes(fastify: FastifyInstance) {
  fastify.get('/pani-puri', async (request, reply) => {
    const query = LocationQuerySchema.safeParse(request.query);
    const { latitude, longitude, radius } = query.success
      ? query.data
      : { latitude: undefined, longitude: undefined, radius: undefined };
    const items = TrackerService.getPaniPuriLocations(latitude, longitude, radius);
    return reply.send({ items });
  });
}
