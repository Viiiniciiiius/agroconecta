/**
 * @fileoverview Application bootstrap and configuration module
 * Sets up Fastify instance with plugins, routes, and error handling
 * @module app
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import qs from 'qs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { errorHandler } from 'utils/errorHandler';
import mongoosePlugin from 'plugins/mongoose';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import solutionRoutes from 'routes/solution';
/**
 * Creates and configures the main Fastify application instance
 *
 * Environment Configuration:
 * - Loads environment variables from .env file in project root
 * - Configures paths relative to the current module
 *
 * Features:
 * - Request logging enabled
 * - Global error handling
 * - CORS support (all origins in current config)
 * - MongoDB integration via mongoose
 * - Swagger UI docs (development only)
 *
 * @requires process.env.NODE_ENV - Current environment (development/production)
 * @requires dotenv - Environment configuration from .env file
 *
 * Routes:
 * - /supply-types/* - Supply type management endpoints
 * - /auth/* - Authentication and user management endpoints
 *
 * @example
 * // Usage in index.ts
 * import app from './app'
 * await app.listen({ port: 4023 })
 */

// Environment configuration
dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env'),
});

// Initialize Fastify instance
const app = Fastify({ logger: true, querystringParser: qs.parse });
app.setErrorHandler(errorHandler);

/**
 * Plugin registration block
 * Configures application middleware and features
 *
 * @async
 * @throws {Error} If plugin registration fails
 */
await app.register(mongoosePlugin);
await app.register(cors, {
  origin: '*',
});

if (process.env.NODE_ENV === 'development') {
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Todos Ganham API',
        description: 'API Documentation for Todos Ganham',
        version: '1.0.0',
      },
      host: 'localhost:4023',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'auth', description: 'Authentication endpoints' },
        { name: 'supply-types', description: 'Supply types endpoints' },
      ],
    },
  });
  // @ts-expect-error fastify-swagger-ui types seem not to be up to date
  await app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'Fastify API',
        version: '1.0.0',
      },
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    exposeRoute: true,
  });
}

/**
 * Route registration block
 * Mounts API endpoints with their respective prefixes
 */

await app.register(solutionRoutes, { prefix: '/solutions' });

export default app;
