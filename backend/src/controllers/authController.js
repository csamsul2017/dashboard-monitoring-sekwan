import { authenticateUser } from '../services/loginService.js';
import response from '../utils/response.js';

const login = async (req, res, next) => {
  try {
    const user = await authenticateUser(req.body);
    return response(res, 200, 'Login success', user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { login };
