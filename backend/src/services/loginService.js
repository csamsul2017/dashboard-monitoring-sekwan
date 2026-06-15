import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ClientError } from '../exceptions/index.js';

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

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { user, token };
};

export { authenticateUser };
