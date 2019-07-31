/* eslint-disable no-unused-vars */
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import Series from '../../models/series';

const router = express.Router();
const upload = multer({ dest: 'uploads/genre/' });

router.route('/series')
  .get((req, res) => {
    const { keyword, cnt, lastId } = req.query;
  })
  .post(upload.single('coverImage'), async (req, res) => {
    const { title, genreIds } = req.body;
    const { authorization: authorId } = req.headers;

    const coverImage = {};
    coverImage.data = fs.readFileSync(req.file.path);
    coverImage.contentType = req.file.mimetype;


    const series = await Series.create(title, authorId, coverImage, genreIds.split(','));

    return res.status(201).json(series);
  });

router.route('/series/:seriesId')
  .get((req, res) => {
  })
  .delete(async (req, res) => {
    const { seriesId } = req.params;

    await Series.deleteOne({ _id: seriesId });

    return res.status(202).send('deletion accepted');
  });

router.route('/user/:userId/series')
  .get((req, res) => {
    const { sortBy } = req.params;
  });

export default router;
