import User from '../../models/user';

export default (app) => {
  app.post('/api/user/create', async (req, res) => {
    const { nickname } = req.body;

    let user;
    try {
      user = await User.create(nickname);
    } catch (err) {
      return res.send(err);
    }

    return res.status(201).json(user);
  });
};
