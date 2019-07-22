import express from 'express';
import User from '../../models/user';

const router = express.Router();


router.post('/user/create', async (req, res) => {
  const { nickname } = req.body;

  let user;
  try {
    user = await User.create(nickname);
  } catch (err) {
    return res.status(409).send('duplicate nickname');
  }

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
