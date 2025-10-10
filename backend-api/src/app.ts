/**
 * @fileoverview Application bootstrap and configuration module
 * Sets up Fastify instance with plugins, routes, and error handling
 * @module app
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { errorHandler } from 'utils/errorHandler';
import mongoosePlugin from 'plugins/mongoose';
import solutionRoutes from 'routes/solution';
import authRoutes from 'routes/auth';
import { rateLimiter } from 'utils/rateLimiter';
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
const app = Fastify();
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
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

// Apply rate limiting globally
app.addHook('preHandler', rateLimiter);


/**
 * Route registration block
 * Mounts API endpoints with their respective prefixes
 */

await app.register(solutionRoutes, { prefix: '/solutions' });
await app.register(authRoutes, { prefix: '/auth' });

export default app;
