import { FastifyInstance } from 'fastify';
import { ScanRequestSchema } from '@tn-spider-tracker/shared';
import { TrackerService } from '../services/trackerService';

export async function trackerRoutes(fastify: FastifyInstance) {
  fastify.post('/tracker/scan', async (request, reply) => {
    const bodyResult = ScanRequestSchema.safeParse(request.body || {});
    const { userLat, userLng } = bodyResult.success ? bodyResult.data : { userLat: undefined, userLng: undefined };
    
    const result = TrackerService.createScanSession(userLat, userLng);
    return reply.status(201).send(result);
  });

  fastify.get('/tracker/status/:sessionId', async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const status = TrackerService.getSessionStatus(sessionId);
    return reply.send(status);
  });
}
