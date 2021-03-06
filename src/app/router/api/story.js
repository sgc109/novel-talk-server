/* eslint-disable no-unused-vars */
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import Story from '../../models/story';
import Series from '../../models/series';
import { RESPONSE_UNAUTHORIZED, RESPONSE_RESOURCE_NOT_FOUND } from '../response';

const router = express.Router();
const upload = multer({ dest: 'uploads/story/' });

router.route('/series/:seriesId/stories')
  .post(upload.single('coverImage'), async (req, res) => {
    const { user } = req;
    const { title } = req.body;
    const { seriesId } = req.params;

    // const coverImage = {};
    // try {
    //   coverImage.data = fs.readFileSync(req.file.path);
    //   coverImage.contentType = req.file.mimetype;
    // } catch (err) {
    //   // console.log('file is not uploaded');
    // }

    /* TODO add transaction by solving replica set problem */

    // let story;
    // try {
    // const session = await mongoose.connection.startSession();
    // session.startTransaction();
    const { authorId } = await Series.findById(seriesId);
    if (!authorId.equals(user._id)) return res.status(401).send('Unauthorized');

    const story = await Story.create({
      title, seriesId, authorId: user._id, coverImageUrl: req.file.path,
    });

    await Series.updateOne({ _id: seriesId }, { $inc: { cntStories: 1 } });

    // await session.commitTransaction();
    // session.endSession();
    // } catch (err) {
    //   console.log(err);
    //   return res.status(500).send(err);
    // }

    return res.status(201).json(story);
  });

router.route('/stories/:storyId')
  .patch(upload.single('coverImage'), async (req, res) => {
    const { user } = req;
    const { storyId } = req.params;
    const { title } = req.body;

    // const coverImage = {};
    // coverImage.data = fs.readFileSync(req.file.path);
    // coverImage.contentType = req.file.mimetype;

    const { authorId } = await Story.findById(storyId);
    if (!authorId.equals(user._id)) return res.status(401).send('Unauthorized');

    const updatedStory = await Story.updateOne(
      { _id: storyId }, { title, coverImageUrl: req.file.path },
    );

    return res.status(202).json(updatedStory);
  })
  .delete(async (req, res) => {
    const { user } = req;
    const { storyId } = req.params;

    const story = await Story.findById(storyId);
    if (!story) throw RESPONSE_RESOURCE_NOT_FOUND;

    const { authorId } = story;
    if (!authorId.equals(user._id)) throw RESPONSE_UNAUTHORIZED;

    /* TODO add transaction by solving replica set problem */
    const { seriesId } = await Story.findOneAndDelete({ _id: storyId });
    await Series.updateOne({ _id: seriesId }, { $inc: { cntStories: -1 } });

    return res.status(202).send('Deletion accedpted');
  });

export default router;
