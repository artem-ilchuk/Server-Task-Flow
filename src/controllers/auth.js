import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  requestResetPassword,
  resetPassword,
} from '../services/auth.js';
import { setSessionCookies } from '../utils/setSessionCookies.js';
import { THIRTY_DAYS } from '../constants/index.js';

export const registerUserController = async (req, res) => {
  const { user, session } = await registerUser(req.body);
  setSessionCookies(res, session, THIRTY_DAYS);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      sessionId: session._id.toString(),
    },
  });
};

export const loginUserController = async (req, res) => {
  const { user, session } = await loginUser(req.body);
  setSessionCookies(res, session, THIRTY_DAYS);

  res.json({
    status: 200,
    message: 'Successfully logged in!',
    data: {
      user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      sessionId: session._id.toString(),
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) await logoutUser(sessionId);
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setSessionCookies(res, session, THIRTY_DAYS);

  res.json({
    status: 200,
    message: 'Session refreshed!',
    data: { accessToken: session.accessToken },
  });
};

export const requestResetPasswordController = async (req, res) => {
  await requestResetPassword(req.body.email);
  res.json({ status: 200, message: 'Reset email sent', data: {} });
};

export const resetEmailController = async (req, res) => {
  await resetPassword(req.body);
  res.json({ status: 200, message: 'Password reset successfully', data: {} });
};
