/* eslint-disable no-unused-vars */
import Story from '../../models/story';

export default (app) => {
  app.post('/api/series/:seriesId/story/create', async (req, res) => {
    const { title, authorId } = req.body;
    const { seriesId } = req.params;

    try {
      // const user = await User.findOneByNickname(authorName);
      const story = await Story.create(title, seriesId, authorId);
      return res.status(201).json(story);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  app.delete('/api/series/:seriesId/remove', (req, res) => {

  });
};
