import { createUser, getAllUsers, getUserById, deleteUser } from '../services/userService.js';


const addUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      message: 'User successfully added',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json({
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    res.status(200).json({
      message: 'User successfully deleted',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export { addUser, getUsers, getUser, removeUser };
