import jwt from 'jsonwebtoken';
import { InvariantError } from '../exceptions/index.js';

const tokenManager = {
  generateAccessToken: payload => jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1h' }),
  generateRefreshToken: payload => jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '30D' }),
  verifyAccessToken: (accessToken, secret) => {
    try {
      const payload = jwt.verify(accessToken, secret);
      return payload;
    } catch (error) {
      console.log(error);
      throw new InvariantError('Authentication failed');
    }
  },
  verifyRefreshToken: refreshToken => {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return payload;
    } catch (error) {
      console.log(error);
      throw new InvariantError('Invalid refresh token');
    }
  },
};

export default tokenManager;
