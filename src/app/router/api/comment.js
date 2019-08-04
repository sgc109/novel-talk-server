/* eslint-disable no-unused-vars */
import express from 'express';
import Comment from '../../models/comment';
import jwt from '../../../jwt';

const router = express.Router();

router.route('/stories/:storyId/comments')
  .get(async (req, res) => {
    const { storyId } = req.params;
    const { cnt = 30, lastLoadedId, sortBy = 'writtenAt' } = req.query;

    let query;
    if (lastLoadedId) {
      query = Comment.find({ storyId, _id: { $lt: lastLoadedId } });
    } else {
      query = Comment.find({ storyId });
    }

    if (sortBy === 'writtenAt') {
      query = query.sort({ _id: -1 });
    } else {
      query = query.sort({ cntLike: -1 });
    }

    const comments = await query.limit(parseInt(cnt, 10)).exec();

    return res.status(200).json(comments);
  })
  .post(async (req, res) => {
    const { user } = req;
    const { content } = req.body;
    const { storyId } = req.params;

    const comment = await Comment.create({ storyId, writerId: user._id, content });

    // 글 작성자한테 notification
    return res.status(201).json(comment);
  });

router.post('/comment/:commentId/hide', (req, res) => {

});

router.put('/comment/:commentId/like', (req, res) => {
  // 댓글 작성자한테 notification
});

router.put('/comment/:commentId/unlike', (req, res) => {

});

router.delete('/comment/:commentId/remove', async (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;

  let decoded;
  try {
    decoded = await jwt.verify(token, req.app.get('jwt-secret'));
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }

  const { commentId } = req.params;
  try {
    Comment.findOneAndDelete({ _id: commentId, writerId: decoded.uid });
  } catch (err) {
    return res.status(401).res('unauthorized');
  }
  return res.status(202).res('successfully deleted');
});

export default router;
