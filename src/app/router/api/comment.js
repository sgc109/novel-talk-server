/* eslint-disable no-unused-vars */
import Comment from '../../models/comment';

export default (app) => {
  app.get('/api/series/:seriesId/story/:storyId/comment', (req, res) => {

  });

  app.post('/api/series/:seriesId/story/:storyId/comment/write', async (req, res) => {
    const { content, writerId } = req.body;
    const { seriesId, storyId } = req.params;

    let comment;
    try {
      comment = await Comment.create(storyId, writerId, content);
    } catch (err) {
      return res.status(504).json(err);
    }

    // 글 작성자한테 notification
    return res.status(201).json(comment);
  });

  app.post('/api/comment/:commentId/hide', (req, res) => {

  });

  app.put('/api/comment/:commentId/like', (req, res) => {
    // 댓글 작성자한테 notification
  });

  app.put('/api/comment/:commentId/unlike', (req, res) => {

  });

  app.delete('/api/comment/:commentId/remove', (req, res) => {

  });
};
