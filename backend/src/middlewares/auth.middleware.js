import tokenManager from '../utils/token.util.js';
import response from '../utils/response.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token?.startsWith('Bearer ')) {
    try {
      const user = tokenManager.verifyAccessToken(token.split(' ')[1], process.env.ACCESS_TOKEN_KEY);
      req.user = user;
      return next();
    } catch (error) {
      return response(res, 401, error.message, null);
    }
  }

  return response(res, 401, 'Unauthorized', null);
};

export default authMiddleware;
