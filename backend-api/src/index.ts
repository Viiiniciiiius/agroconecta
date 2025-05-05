import dotenv from 'dotenv';
dotenv.config();

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
