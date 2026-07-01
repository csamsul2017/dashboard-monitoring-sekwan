import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { InvariantError, NotFoundError } from "../exceptions/index.js";

const createUser = async (userData) => {
  const { name, nip, email, password, roleId, deptId, isActive } = userData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        id: `user-${nanoid(10)}`,
        nip,
        name,
        email,
        password: hashedPassword,
        roleId,
        deptId,
        isActive,
      },
      select: {
        id: true,
        nip: true,
        name: true,
        email: true,
      },
    });

    return {
      id: newUser.id,
      nip: newUser.nip,
      name: newUser.name,
      email: newUser.email,
    };
  } catch (error) {
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];
      throw new InvariantError(`${field} already in use`);
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
      isActive: true,
    },
  });
  return users;
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      nip: true,
      email: true,
      roleId: true,
      deptId: true,
      isActive: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

const updateUserById = async (id, userData) => {
  const user = await prisma.user.update({
    where: { id },
    data: { ...userData },
    select: {
      id: true,
      name: true,
      nip: true,
      email: true,
      roleId: true,
      deptId: true,
      isActive: true,
    },
  });

  return user;
};

const deleteUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundError("User not found");
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
      isActive: true,
    },
  });

  return deletedUser;
};

export { createUser, getAllUsers, getUserById, updateUserById, deleteUser };
