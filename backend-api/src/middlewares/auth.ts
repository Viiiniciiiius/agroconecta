/**
 * @fileoverview Authentication middleware implementation for validating JWT tokens
 * and protecting routes that require authentication.
 */

import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

/**
 * Middleware function to authenticate requests using JWT tokens.
 * Validates the presence and format of the Authorization header,
 * and verifies the JWT token against a secret key.
 *
 * @throws {Error} When JWT verification fails
 * @returns {Promise<void>} Returns nothing if authentication succeeds,
 *                         sends 401 response if authentication fails
 *
 * @example
 * // Usage in route:
 * fastify.addHook('preHandler', authMiddlware)
 *
 * // Expected Authorization header format:
 * // Authorization: Bearer <token>
 */
export async function authMiddelware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.code(401).send({ message: 'Token não fornecido' });
  }

  const [, token] = authHeader.split('Bearer ');

  if (!token) {
    return reply.code(401).send({ message: 'Token não fornecido' });
  }

  const isValid = jwt.verify(token, process.env.JWT_SECRET);

  if (!isValid) {
    return reply.code(401).send({ message: 'Não autorizado' });
  }
}
