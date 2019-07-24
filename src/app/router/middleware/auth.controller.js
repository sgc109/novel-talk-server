const jwt = require('jsonwebtoken');
const User = require('../../models/user');

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await User.findOneByUsername(username);
    if (newUser) {
      return res.json({ message: 'username exists' });
    }

    await User.create(username, password);

    const count = await User.count({});

    let isAdmin = false;
    if (count === 1) {
      isAdmin = true;
      await newUser.assignAdmin();
    }

    return res.json({
      message: 'registered successfully',
      admin: isAdmin,
    });
  } catch (err) {
    return res.status(409).json({
      message: err.message,
    });
  }
};

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/
exports.login = (req, res) => {
  const { username, password } = req.body;
  const secret = req.app.get('jwt-secret');

  // check the user info & generate the jwt
  const check = (user) => {
    if (!user) {
      // user does not exist
      throw new Error('login failed');
    } else {
      // user exists, check the password
      if (!user.verify(password)) throw new Error('login failed');

      // create a promise that generates jwt asynchronously
      const p = new Promise((resolve, reject) => {
        jwt.sign(
          {
            _id: user._id,
            username: user.username,
            admin: user.admin,
          },
          secret,
          {
            expiresIn: '5m',
            issuer: 'velopert.com',
            subject: 'userInfo',
          }, (err, token) => {
            if (err) reject(err);
            resolve(token);
          },
        );
      });
      return p;
    }
  };

  // respond the token
  const respond = (token) => {
    res.json({
      message: 'logged in successfully',
      token,
    });
  };

  // error occured
  const onError = (error) => {
    res.status(403).json({
      message: error.message,
    });
  };

  // find the user
  User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError);
};

/*
    GET /api/auth/check
*/
exports.check = (req, res) => {
  res.json({
    success: true,
    info: req.decoded,
  });
};
