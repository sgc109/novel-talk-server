import User from './app/models/user';
// import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  // const token = req.headers['x-access-token'] || req.query.token;

  // // token does not exist
  // if (!token) {
  //   return res.status(403).json({
  //     success: false,
  //     message: 'not logged in',
  //   });
  // }

  // try {
  //   req.decoded = await jwt.verify(token, req.app.get('jwt-secret'));
  // } catch (err) {
  //   return res.status(403).json({
  //     success: false,
  //     message: err.message,
  //   });
  // }

  // return next();

  const { authorization } = req.headers;
  if (!authorization) throw Error();

  const [, uid] = authorization.split(' ');
  const user = await User.findById(uid);
  req.user = user;
  next();
};

export default authMiddleware;
