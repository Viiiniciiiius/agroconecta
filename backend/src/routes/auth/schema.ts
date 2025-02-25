/**
 * @fileoverview JSON Schema definitions for authentication route validation
 * Provides type-safe request validation for login and registration endpoints
 */

/**
 * Schema for validating login request bodies
 *
 * @example
 * // Valid request body:
 * {
 *   "email": "user@example.com",
 *   "password": "securepass123",
 *   "remember": true
 * }
 */
export const loginSchema = {
  tags: ['auth'],
  description: 'Login endpoint',
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      remember: { type: 'boolean' },
    },
  },
} as const;

/**
 * Schema for validating user registration request bodies
 */
export const registerSchema = {
  tags: ['auth'],
  description: 'Register endpoint',
  body: {
    type: 'object',
    required: [
      'firstName',
      'lastName',
      'email',
      'password',
      'phone',
      'profession',
      'birthDate',
    ],
    properties: {
      firstName: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
      },
      lastName: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 8,
      },
      phone: {
        type: 'string',
        pattern: '^\\(\\d{2}\\) \\d{5}-\\d{4}$',
      },
      profession: {
        type: 'string',
        pattern: '^[0-9a-fA-F]{24}$', // ObjectId
      },
      birthDate: {
        type: 'string',
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        gender: { type: 'string' },
        phone: { type: 'string' },
        profession: { ref: '#Profession' },
        birthDate: { type: 'string' },
      },
    },
  },
} as const;

// generate docs for forgot-password

/**
 * Schema for validating forgot password request bodies
 *
 */

export const forgotPasswordSchema = {
  tags: ['auth'],
  description: 'Request password reset email',
  body: {
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string', format: 'email' },
    },
  },
} as const;

/**
 * Schema for validating reset password request bodies
 */

export const resetPasswordSchema = {
  tags: ['auth'],
  description: 'Reset password with token',
  body: {
    type: 'object',
    required: ['token', 'newPassword'],
    properties: {
      email: { type: 'string', format: 'email' },
      token: { type: 'string' },
      newPassword: { type: 'string', minLength: 8 },
    },
  },
} as const;
