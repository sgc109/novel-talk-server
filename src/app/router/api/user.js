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

export default router;
