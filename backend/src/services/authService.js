import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import { ClientError } from '../exceptions/index.js';
import tokenManager from '../utils/token.util.js';

const authenticate = async userData => {
  const { email, password } = userData;
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      status: true,
    },
  });

  if (!user) {
    throw new ClientError('Invalid email or password', 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new ClientError('Invalid email or password', 401);
  }
  const accessToken = tokenManager.generateAccessToken({ userId: user.id });
  const refreshToken = tokenManager.generateRefreshToken({ userId: user.id });
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt,
    },
  });

  return { accessToken, refreshToken };
};

const reAuthenticate = async userData => {
  if (!userData) {
    throw new ClientError('Refresh token is required', 400);
  }
  const user = await prisma.refreshToken.findFirst({
    where: {
      token: userData,
    },
  });
  if (!user) {
    throw new ClientError('Refresh token invalid or has been revoked', 401);
  }

  const accessToken = tokenManager.generateAccessToken({ userId: user.userId });

  return { accessToken };
};

const unAuthenticate = async userData => {
  await prisma.refreshToken.deleteMany({
    where: {
      token: userData,
    },
  });
};

export { authenticate, reAuthenticate, unAuthenticate };
