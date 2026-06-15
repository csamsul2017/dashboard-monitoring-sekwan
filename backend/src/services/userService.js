import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import { InvariantError, NotFoundError } from '../exceptions/index.js';

const createUser = async userData => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new InvariantError('Username or email already in use');
    }
    throw error;
  }
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return users;
};

const getUserById = async id => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

const deleteUser = async id => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return deletedUser;
};

export { createUser, getAllUsers, getUserById, deleteUser };
