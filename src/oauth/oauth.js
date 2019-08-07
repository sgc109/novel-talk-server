import jwt from 'jsonwebtoken';
import User from '../app/models/user';

import { RESPONSE_UNAUTHORIZED } from '../app/router/response';

const requiresAuth = async (req, res, next) => {
  if (req.header('oauthData')) {
    next();
    return;
  }

  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, 'novel-talk');
  const user = await User.findOne({ _id: decoded._id });

  if (!user) {
    throw RESPONSE_UNAUTHORIZED;
  }

  req.token = token;
  req.user = user;
  next();
};

export default requiresAuth;
