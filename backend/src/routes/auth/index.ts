/**
 * @fileoverview Authentication routes configuration
 * Defines and registers login and registration endpoints
 */
import { FastifyInstance } from 'fastify';
import {
  loginHandler,
  registerHandler,
  resetPasswordHandler,
  forgotPasswordHandler,
} from './handlers';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './schema';

/**
 * Configures authentication routes for the Fastify instance
 *
 * @example
 * // Usage in Fastify server setup
 * fastify.register(authRoutes, { prefix: '/auth' })
 *
 * @description Registers the following endpoints:
 * - POST /login: User authentication
 * - POST /register: New user registration
 * - POST /forgot-password: Request password reset
 * - POST /reset-password: Reset user password
 *
 */
export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', { schema: loginSchema }, loginHandler);

  fastify.post('/register', { schema: registerSchema }, registerHandler);

  fastify.post(
    '/forgot-password',
    { schema: forgotPasswordSchema },
    forgotPasswordHandler,
  );

  fastify.post(
    '/reset-password',
    { schema: resetPasswordSchema },
    resetPasswordHandler,
  );
}
