import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { poolRoutes } from './routes/pool';
import { userRoutes } from './routes/user';
import { guessRoutes } from './routes/guess';
import { authRoute } from './routes/auth';
import { gameRoutes } from './routes/game';

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  });

  await fastify.register(cors, {
    origin: true
  });

  // NOTE -> Pesquisar sobre variaveis ambiente
  await fastify.register(jwt, {
    secret: 'nlwcopaserver'
  });

  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(authRoute);
  await fastify.register(gameRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();
