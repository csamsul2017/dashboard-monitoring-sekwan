import { createUser, getAllUsers, getUserById, updateUserById, deleteUser } from '../services/userService.js';
import response from '../utils/response.js';

const addUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    return response(res, 201, 'User successfully added', user);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return response(res, 200, 'Users retrieved successfully', users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    return response(res, 200, 'User retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await updateUserById(userId, req.body);
    return response(res, 200, 'Update data successful', user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);
    return response(res, 200, 'User successfully deleted', user);
  } catch (error) {
    next(error);
  }
};

export { addUser, getUsers, getUser, updateUser, removeUser };
