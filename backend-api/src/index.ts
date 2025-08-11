import dotenv from 'dotenv';
import { FastifyReply, FastifyRequest } from 'fastify';
import app from './app';

dotenv.config();

/**
 * @fileoverview Entry point for the Fastify backend API server.
 * Handles both serverless deployment and local development scenarios.
 */

/**
 * Handler function for Vercel deployment.
 * Processes incoming HTTP requests by forwarding them to the Fastify application.
 */
export default async function handler(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  await app.ready();
  app.server.emit('request', req, reply);
}

/**
 * Vercel deployment configuration.
 * Specifies the regions where the serverless function should be deployed.
 *
 * @property {string[]} regions - Array of Vercel region codes
 */
export const config = {
  regions: ['gru1'],
};

// Start server for local development
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
