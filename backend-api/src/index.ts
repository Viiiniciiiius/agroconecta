import dotenv from 'dotenv';
import { FastifyReply, FastifyRequest } from 'fastify';
import app from './app';

dotenv.config();

export default async function handler(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  await app.ready();
  app.server.emit('request', req, reply);
}

export const config = {
  regions: ['gru1'],
};

if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    try {
      await app.ready();
      await app.listen({ port: 4023, host: '0.0.0.0' });
      console.log('🚀 Server running on http://localhost:4023');
    } catch (err) {
      console.error('❌ Error starting server:', err);
      process.exit(1);
    }
  };

  startServer();
}
