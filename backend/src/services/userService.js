import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { InvariantError, NotFoundError } from '../exceptions/index.js';

const createUser = async userData => {
  const { name, nip, email, password, roleId, deptId, status } = userData;
  const id = `user-${nanoid(10)}`;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        id,
        nip,
        name,
        email,
        password: hashedPassword,
        roleId,
        deptId,
        status,
      },
    });

    return { id, nip, name, email };
  } catch (error) {
    if (error.code === 'P2002') {
      throw new InvariantError('Email or NIP already in use');
    }
    throw error;
  }
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      nip: true,
      email: true,
      roleId: true,
      deptId: true,
      status: true,
    },
  });
  return users;
};

const getUserById = async id => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      nip: true,
      email: true,
      roleId: true,
      deptId: true,
      status: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

const deleteUser = async id => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const deletedUser = await prisma.user.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      nip: true,
      email: true,
      roleId: true,
      deptId: true,
      status: true,
    },
  });

  return deletedUser;
};

export { createUser, getAllUsers, getUserById, deleteUser };
