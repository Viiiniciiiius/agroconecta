/**
 * @fileoverview Entry point for the Fastify backend API server.
 * Handles both serverless deployment and local development scenarios.
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import app from './app';

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

/**
 * Local development server setup.
 * Only runs when not in production environment.
 */
if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    try {
      await app.listen({ port: 4022, host: '0.0.0.0' });
      console.log(`Server listening at ${app.server.address()}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };

  startServer();
}
