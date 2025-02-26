/**
 * @fileoverview Responsible for dealing with database logic related to user authentication.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from 'models/user';

/**
 * Registers a new user in the Mongo database.
 * @param {Partial<IUser>} userData - The user data.
 * @returns {Promise<IUser>} The saved user.
 */

export const register = async (
  userData: Partial<IUser> & { password: string },
): Promise<IUser> => {
  const {
    username,
    email,
    password,
    profession,
    phone,
    gender,
    birthDate,
    firstName,
    lastName,
  } = userData;
  const emailExists = await UserModel.exists({ email });
  if (emailExists) {
    throw new Error('E-mail já está registrado');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new UserModel({
    username,
    email,
    passwordHash, // Store the hashed password
    firstName,
    lastName,
    profession,
    phone,
    gender,
    birthDate,
  });

  user.save();
  return await user.populate('profession');
};

/**
 * Logs in a user.
 * @returns {Promise<{token: string, user: IUser}>} The token and user.
 * @throws {Error} If the credentials are invalid.
 */

export const login = async (
  email: string,
  password: string,
  remember: boolean,
) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Usuário/senha inválidos');
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Usuário/senha inválidos');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: remember ? '30d' : '24h',
  });
  return { token, user };
};

/**
 * Checks if an email is already registered.
 * @returns {Promise<boolean>} Whether the email exists.
 */

export const checkEmail = async (email: string) => {
  const exists = await UserModel.exists({ email });
  return exists;
};
