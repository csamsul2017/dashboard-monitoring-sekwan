import * as authService from '../services/authService.js';
import response from '../utils/response.js';

const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.authenticate(req.body);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return response(res, 200, 'Login success', { accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { accessToken } = await authService.reAuthenticate(req.cookies.refreshToken);

    return response(res, 200, 'New access token created', { accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  // console.log('data', req);
  try {
    await authService.unAuthenticate(req.cookies.refreshToken);

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return response(res, 200, 'Logout success', null);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { login, logout, refresh };
