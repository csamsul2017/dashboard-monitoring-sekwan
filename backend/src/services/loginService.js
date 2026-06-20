import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import { ClientError } from '../exceptions/index.js';
import tokenManager from '../utils/token.util.js';

const authenticateUser = async userData => {
  const { email, password } = userData;
  const user = await prisma.user.findUnique({
    where: { email },
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
      token: accessToken,
      userId: user.id,
      expiresAt,
    },
  });

  return { accessToken, refreshToken };
};

export { authenticateUser };
