/**
 * @fileoverview Authentication route handlers for login, registration and password reset
 * Implements request handling for user authentication endpoints
 */

import { FastifyRequest, FastifyReply } from 'fastify';
import {
  login,
  register,
  checkEmail,
} from 'controllers/authController';
import {
  LoginRequest,
  RegisterRequest,
} from './auth.types';

/**
 * Handles user login requests
 */
export async function loginHandler(
  request: FastifyRequest<{ Body: LoginRequest }>,
  reply: FastifyReply,
) {
  try {
    const { email, password, remember } = request.body;
    const { token, user } = await login(email, password, remember || false);
    reply.code(200).send({ token, user });
  } catch (error) {
    reply.code(401).send({ error: error.message });
  }
}

/**
 * Handles new user registration requests
 */
export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterRequest }>,
  reply: FastifyReply,
) {
  try {
    const { email } = request.body;
    const emailExists = await checkEmail(email);
    if (emailExists) {
      reply.code(409).send({ error: 'E-mail já está registrado' });
      throw new Error('E-mail já está registrado');
    }
    const user = await register(request.body);
    reply.code(201).send(user);
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
}
