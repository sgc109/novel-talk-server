import express from 'express';
import User from '../../models/user';

const router = express.Router();

router.route('/users/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.status(200).json(user);
  });
router.post('/user/create', async (req, res) => {
  const { nickname, oauthId, provider } = req.body;
  const user = await User.create(nickname, oauthId, provider);

  return res.status(201).json(user);
});

router.post('/user/token', async (req, res) => {
  const { uid } = req;
  let user;

  if (await (User.findById(uid)) === null) { // SignUp
    user = await User.create(uid);
    console.log('no user');
  } else {
    user = await User.findById(uid); // SignIn
    console.log('already user');
  }
  res.send(user);
});

export default router;
