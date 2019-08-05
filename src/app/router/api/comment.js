/* eslint-disable no-unused-vars */
import express from 'express';
import Comment from '../../models/comment';
import Story from '../../models/story';
import jwt from '../../../jwt';
import { RESPONSE_RESOURCE_NOT_FOUND, RESPONSE_UNAUTHORIZED } from '../response';

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

    // must add Transaction
    const comment = await Comment.create({ storyId, writerId: user._id, content });
    await Story.findByIdAndUpdate(storyId, { $inc: { cntComments: 1 } });

    // 글 작성자한테 notification
    return res.status(201).json(comment);
  });

router.patch('/comments/:commentId/hide', async (req, res) => {
  const { user } = req;
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) throw RESPONSE_RESOURCE_NOT_FOUND;

  const story = await Story.findById(comment.storyId);
  if (!story) throw RESPONSE_RESOURCE_NOT_FOUND;

  if (!story.authorId.equals(user._id)) throw RESPONSE_UNAUTHORIZED;

  await Comment.updateOne({ _id: commentId }, { isHidden: true });

  res.status(202).send('successfully hided comment');
});

router.patch('/comments/:commentId/unhide', async (req, res) => {

});

router.patch('/comments/:commentId/like', (req, res) => {
  // 댓글 작성자한테 notification
});

router.patch('/comments/:commentId/unlike', (req, res) => {

});

router.delete('/comments/:commentId', async (req, res) => {
  const { user } = req;
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) throw RESPONSE_RESOURCE_NOT_FOUND;

  const { writerId } = comment;
  if (!writerId.equals(user._id)) throw RESPONSE_UNAUTHORIZED;

  // Must add Transaction
  const { storyId } = await Comment.findOneAndDelete({ _id: commentId });
  await Story.findByIdAndUpdate(storyId, { $inc: { cntComments: -1 } });

  return res.status(202).send('successfully deleted');
});

export default router;
