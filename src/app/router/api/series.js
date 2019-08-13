/* eslint-disable no-unused-vars */
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import Series from '../../models/series';
import Story from '../../models/story';

const router = express.Router();
const upload = multer({ dest: 'uploads/genre/' });

router.route('/series')
  .get((req, res) => {
    const {
      keyword, cnt, lastId, sortBy,
    } = req.query;
  })
  .post(upload.single('coverImage'), async (req, res) => {
    const { user } = req;
    const { title, genreId } = req.body;

    const coverImage = {};
    try {
      coverImage.data = fs.readFileSync(req.file.path);
      coverImage.contentType = req.file.mimetype;
    } catch (err) {
      console.log('coverImage is not uploaded');
    }

    const series = await Series.create({
      title, authorId: user._id, coverImage, genreId,
    });

    return res.status(201).json(series);
  });

// author: { type: Schema.Types.ObjectId, ref: 'User' },
// genre: { type: Schema.Types.ObjectId, ref: 'Genre' },


router.route('/series/recommends')
  .get(async (req, res) => {
    const recommends = await Series.find({
      isRecommend: true,
    }).populate('author')
      .populate('genre')
      .limit(3)
      .exec();
    return res.status(200).json(recommends);
  });


router.route('/series/:seriesId')
  .get(async (req, res) => {
    const { seriesId } = req.params;
    const series = await Series.findOne({ _id: seriesId });
    return res.status(200).json(series);
  })
  .delete(async (req, res) => {
    const { user } = req;
    const { seriesId } = req.params;

    const series = await Series.findById({ _id: seriesId });
    if (series.authorId !== user._id) return res.status(500).json({ message: 'unauthorized' });

    await Series.deleteOne({ _id: seriesId });

    return res.status(202).send('deletion accepted');
  });

router.route('/user/:userId/series')
  .get((req, res) => {
    const { sortBy } = req.params;
  });

router.route('/series/:seriesId/stories')
  .get(async (req, res) => {
    const { seriesId } = req.params;
    const stories = await Story.find({ seriesId });

    return res.status(200).json(stories);
  });

export default router;
