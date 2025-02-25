/**
 * @fileoverview Authentication route handlers for login, registration and password reset
 * Implements request handling for user authentication endpoints
 */

import { FastifyRequest, FastifyReply } from 'fastify';
import {
  login,
  register,
  checkEmail,
  sendPasswordResetEmail,
  resetPassword,
} from 'controllers/authController';
import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  ForgotPasswordRequest,
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
/**
 * Handles forgot password requests
 *
 * @throws {Error} When email is not found or sending email fails
 */

export async function forgotPasswordHandler(
  request: FastifyRequest<{ Body: ForgotPasswordRequest }>,
  reply: FastifyReply,
) {
  try {
    const { email } = request.body;
    await sendPasswordResetEmail(email);
    reply.code(202).send({
      message: 'Instruções de recuperação enviadas se o e-mail existe',
    });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
}

export async function resetPasswordHandler(
  request: FastifyRequest<{ Body: ResetPasswordRequest }>,
  reply: FastifyReply,
) {
  try {
    const { email, token, newPassword } = request.body;
    await resetPassword(email, token, newPassword);
    reply.code(204).send();
  } catch (error) {
    let status: number;
    let message = error.message;
    switch (error.message) {
      case 'A nova senha deve ser diferente da anterior.':
        status = 422;
        message = 'A nova senha deve ser diferente da senha atual.';
        break;
      case 'Token inválido':
      case 'Token expirado':
      case 'E-mail não encontrado':
        status = 401;
        break;
      default:
        status = 500;
    }
    reply.code(status).send({
      error: message,
    });
  }
}
