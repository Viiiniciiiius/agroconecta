/**
 * @fileoverview Responsible for dealing with database logic related to user authentication.
 */

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from 'models/user';
import emailService from 'services/emailService';

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
 * Sends an email to the user with a password reset link.
 */

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    console.log(`[Password Reset] Iniciando processo para email: ${email}`);
    
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log(`[Password Reset] Usuário não encontrado para email: ${email}`);
      return; // Retornamos silenciosamente para não expor informação sobre existência do email
    }

    console.log(`[Password Reset] Usuário encontrado: ${user._id}`);
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    const resetTokenExpires = new Date(Date.now() + 3600000);

    try {
      await user.updateOne({
        $set: { resetTokenHash, resetTokenExpires },
      });
      console.log(`[Password Reset] Token atualizado para usuário: ${user._id}`);
    } catch (updateError) {
      console.error('[Password Reset] Erro ao atualizar token:', updateError);
      throw new Error('Erro ao gerar token de reset');
    }

    try {
      console.log('[Password Reset] Tentando enviar email com config:', {
        emailService: process.env.EMAIL_SERVICE,
        emailHost: process.env.EMAIL_HOST,
        emailPort: process.env.EMAIL_PORT,
        emailUser: process.env.EMAIL_USER?.substring(0, 3) + '***', // Log parcial por segurança
        hasEmailPass: !!process.env.EMAIL_PASS,
      });

      await emailService.sendPasswordResetEmail(email, resetToken);
      console.log(`[Password Reset] Email enviado com sucesso para: ${email}`);
    } catch (emailError) {
      console.error('[Password Reset] Erro ao enviar email:', emailError);
      
      // Reverte as mudanças no usuário se o email falhar
      await user.updateOne({
        $unset: { resetTokenHash: "", resetTokenExpires: "" }
      });
      
      throw new Error('Erro ao enviar email de reset');
    }
    
  } catch (error) {
    console.error('[Password Reset] Erro geral:', error);
    throw error;
  }
};

/**
 * Resets the user's password.
 * @throws {Error} If the reset token is invalid or expired.
 */

export const resetPassword = async (
  email: string,
  token: string,
  newPassword: string,
): Promise<void> => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error('E-mail não encontrado');
  }

  if (!user.resetTokenExpires || !user.resetTokenHash) {
    throw new Error('Token inválido');
  }

  const isValidToken = await bcrypt.compare(token, user.resetTokenHash);

  if (!isValidToken) {
    throw new Error('Token inválido');
  }

  if (user.resetTokenExpires < new Date()) {
    throw new Error('Token expirado');
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);

  if (isSamePassword) {
    throw new Error('A nova senha deve ser diferente da anterior.');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await UserModel.updateOne(
    { _id: user._id },
    {
      $set: { passwordHash },
      $unset: { resetTokenHash: '', resetTokenExpires: '' },
    },
  );
};

/**
 * Checks if an email is already registered.
 * @returns {Promise<boolean>} Whether the email exists.
 */

export const checkEmail = async (email: string) => {
  const exists = await UserModel.exists({ email });
  return exists;
};
