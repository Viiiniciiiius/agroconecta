import { FastifyRequest, FastifyReply } from 'fastify';
import { loginHandler, registerHandler } from './handlers';
import { login, register } from 'controllers/authController';
import { RegisterRequest, LoginRequest } from './auth.types';
import { forgotPasswordHandler, resetPasswordHandler } from './handlers';
import { ForgotPasswordRequest, ResetPasswordRequest } from './auth.types';

jest.mock('controllers/authController');

describe('Auth Handlers', () => {
  const mockReply = {
    code: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as FastifyReply;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginHandler', () => {
    const mockRequest = {
      body: { email: 'user@test.com', password: 'test123' },
    } as FastifyRequest<{ Body: LoginRequest }>;

    test('success - returns JWT token', async () => {
      (login as jest.Mock).mockResolvedValue({ token: 'jwt.token.here' });
      await loginHandler(mockRequest, mockReply);
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ token: 'jwt.token.here' });
    });
  });

  describe('registerHandler', () => {
    const mockRequest = {
      body: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123',
        phone: '(11) 99999-9999',
      },
    } as FastifyRequest<{ Body: RegisterRequest }>;

    test('success - creates new user', async () => {
      const newUser = {
        id: '1',
        email: mockRequest.body.email,
        firstName: mockRequest.body.firstName,
      };
      (register as jest.Mock).mockResolvedValue(newUser);

      await registerHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(newUser);
    });

    test('error - handles registration failure', async () => {
      const error = new Error('Registration failed');
      (register as jest.Mock).mockRejectedValue(error);

      await registerHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('Password Reset Handlers', () => {
    test('forgotPasswordHandler should send reset email', async () => {
      const mockRequest = {
        body: { email: 'contato.lazuli.costa@gmail.com' },
      } as FastifyRequest<{ Body: ForgotPasswordRequest }>;

      await forgotPasswordHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(202);
      expect(mockReply.send).toHaveBeenCalledWith({
        message: 'Instruções de recuperação enviadas se o e-mail existe',
      });
    });

    test('resetPasswordHandler should reset user password', async () => {
      const mockRequest = {
        body: {
          token: 'valid-token',
          newPassword: 'newPassword123',
        },
      } as FastifyRequest<{ Body: ResetPasswordRequest }>;
      await resetPasswordHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(204);
    });
  });
});
