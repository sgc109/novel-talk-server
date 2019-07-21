/* eslint-disable no-unused-vars */
import express from 'express';
import Story from '../../models/story';

const router = express.Router();

router.post('/api/series/:seriesId/story/create', async (req, res) => {
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

router.delete('/api/series/:seriesId/remove', (req, res) => {

});

export default router;
