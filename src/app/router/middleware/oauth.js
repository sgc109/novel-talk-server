import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { testAdminAccountNickname } from '../../../config/config';

import { RESPONSE_UNAUTHORIZED } from '../response';

const requiresAuth = async (req, res, next) => {
  if (process.env.TEST_MODE || req.header('oauthData')) {
    req.user = await User.findOne({ nickname: testAdminAccountNickname });
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
