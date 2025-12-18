import {
  registerUser,
  loginUser,
  logoutUser,
  requestResetPassword,
  resetPassword,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const { user, session } = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      user,
      accessToken: session.accessToken,
    },
  });
};

export const loginUserController = async (req, res) => {
  const { user, session } = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};
export const logoutUserController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (typeof sessionId === 'string' && typeof refreshToken === 'string') {
    await logoutUser(sessionId, refreshToken);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetPasswordController = async (req, res) => {
  const { email } = req.body;
  requestResetPassword(email);

  res.json({
    message: 'Reset password email has been successfully sent.',
    status: 200,
    data: {},
  });
};

export const resetEmailController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
