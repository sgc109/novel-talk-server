/* eslint-disable no-unused-vars */
import express from 'express';
import Comment from '../../models/comment';
import jwt from '../../../jwt';

const router = express.Router();


router.get('/series/:seriesId/story/:storyId/comment', (req, res) => {

});

router.post('/series/:seriesId/story/:storyId/comment/write', async (req, res) => {
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
