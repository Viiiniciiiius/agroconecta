/**
 * @fileoverview User model definition and database schema configuration.
 * Provides the data structure and validation rules for user management.
 * Implements MongoDB schema using Mongoose ODM.
 */

import mongoose, { Document } from 'mongoose';

/**
 * The IUser interface represents a User document in MongoDB.
 */
export interface IUser extends Document {
  username: string;
  email: string;
  image?: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  gender: 'Masculino' | 'Feminino' | 'Outro';
  phone: string;
  birthDate: Date;
  profession: mongoose.Types.ObjectId;
  accounts: [
    {
      provider: string;
      providerAccountId: string;
    },
  ];
  resetTokenHash?: string; // Add resetToken field to IUser interface
  resetTokenExpires?: Date; // Add resetTokenExpires field to IUser interface
}

/**
 * Mongoose schema definition for User model.
 * Includes field definitions, validation rules, and indexing configuration.
 *
 * @remarks
 * - Email must be unique and match standard email format
 * - Phone number must match Brazilian format (XX) XXXXX-XXXX
 */
const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (email: string) {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/.test(email);
      },
      message: 'E-mail inválido',
    },
  },
  passwordHash: { type: String, required: false },
  firstName: {
    type: String,
    required: true,
    minlength: [2, 'O nome deve ter no mínimo 2 caracteres'],
    maxlength: [50, 'O nome deve ter no máximo 50 caracteres'],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, 'O sobrenome deve ter no mínimo 3 caracteres'],
    maxlength: [50, 'O sobrenome deve ter no máximo 50 caracteres'],
  },
  gender: {
    type: String,
    required: true,
    enum: ['Masculino', 'Feminino', 'Outro'],
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (phone: string) => /^\(\d{2}\) \d{5}-\d{4}$/.test(phone),
      message: 'Telefone inválido',
    },
  },
  birthDate: {
    type: Date,
    required: true,
    validate: {
      validator: (date: Date) => date < new Date(),
      message: 'Data de nascimento inválida',
    },
  },
  profession: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profession',
  },
  accounts: [
    {
      provider: { type: String, required: true },
      providerAccountId: { type: String, required: true },
    },
  ],
  resetTokenHash: {
    type: String,
    required: false,
  },
  resetTokenExpires: {
    type: Date,
    required: false,
  },
});

/**
 * Mongoose model for User collection.
 * Provides CRUD (Create, Read, Update, Delete ) operations and query capabilities for user documents.
 *
 * @remarks
 * Uses model singletoning to prevent model redefinition errors
 */
export const UserModel =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
