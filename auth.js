const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token

  // token does not exist
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in'
    });
  }

  try {
    req.decoded = await jwt.verify(token, req.app.get('jwt-secret'));
    next();
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = authMiddleware;