/**
 * @fileoverview Type definitions for authentication-related requests
 * Includes interfaces for login and registration request payload structures
 */

import mongoose from 'mongoose';

/**
 * Interface for login request payload
 * @description Defines the expected structure for user login requests
 */
export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Interface for user registration request payload
 * @description Defines the required and optional fields for new user registration
 */

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  gender: 'Masculino' | 'Feminino' | 'Outro';
  birthDate: Date;
  profession: mongoose.Types.ObjectId;
  email: string;
}

/**
 * Interface for password reset request payload
 *
 * @interface ForgotPasswordRequest
 * @description Defines the expected structure for password reset requests
 *
 */

export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Interface for password reset request payload
 *
 * @interface ResetPasswordRequest
 * @description Defines the expected structure for password reset requests
 *
 */

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}
