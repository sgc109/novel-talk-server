import express from 'express';
import User from '../../models/user';

const router = express.Router();

router.route('/users/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.status(200).json(user);
  });

export default router;
