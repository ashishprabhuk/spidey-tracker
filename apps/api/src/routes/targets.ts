import { FastifyInstance } from 'fastify';
import { TrackerService } from '../services/trackerService';

export async function targetRoutes(fastify: FastifyInstance) {
  fastify.get('/targets/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const target = TrackerService.getTargetById(id);
    return reply.send(target);
  });
}
