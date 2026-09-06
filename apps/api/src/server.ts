import Fastify from 'fastify';
import cors from '@fastify/cors';
import { healthRoutes } from './routes/health';
import { trackerRoutes } from './routes/tracker';
import { targetRoutes } from './routes/targets';
import { activityRoutes } from './routes/activities';
import { paniPuriRoutes } from './routes/pani-puri';

const fastify = Fastify({
  logger: true,
  requestIdHeader: 'x-request-id',
});

// Register CORS
await fastify.register(cors, {
  origin: '*',
});

// Custom global error handler matching API spec
fastify.setErrorHandler((error, request, reply) => {
  const requestId = (request.id as string) || 'req-unknown';
  fastify.log.error(error);

  const statusCode = error.statusCode || 500;
  const errorCode = statusCode === 404 ? 'NOT_FOUND' : 'INTERNAL_ERROR';

  return reply.status(statusCode).send({
    error: {
      code: errorCode,
      message: error.message || 'An unexpected error occurred.',
      requestId,
    },
  });
});

// Register routes under /api/v1 prefix
await fastify.register(
  async (apiScope) => {
    await apiScope.register(healthRoutes);
    await apiScope.register(trackerRoutes);
    await apiScope.register(targetRoutes);
    await apiScope.register(activityRoutes);
    await apiScope.register(paniPuriRoutes);
  },
  { prefix: '/api/v1' }
);

const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || '0.0.0.0';

const start = async () => {
  try {
    await fastify.listen({ port, host });
    console.log(`⚡ TN SPIDER TRACKER API running at http://${host}:${port}/api/v1`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
