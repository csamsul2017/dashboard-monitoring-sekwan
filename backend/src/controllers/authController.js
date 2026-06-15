import { authenticateUser } from '../services/loginService.js';

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await authenticateUser(req.body);
    res.status(200).json({
      message: 'Login success',
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { login };
