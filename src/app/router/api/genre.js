/* eslint-disable no-unused-vars */
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import Genre from '../../models/genre';
import Series from '../../models/series';
import { Http500Response } from '../response';

const router = express.Router();
const upload = multer({ dest: 'uploads/genre/' });

router.route('/genres')
  .get(async (req, res) => {
    const genres = await Genre.find();
    res.status(200).send(genres);
  })
  .post(upload.single('coverImage'), async (req, res) => {
    // Check if requester has admin auth or not
    const { title, description } = req.body;
    // const coverImage = {};
    // coverImage.data = fs.readFileSync(req.file.path);
    // coverImage.contentType = req.file.mimetype;

    const genre = await Genre.create({ title, description, coverImageUrl: req.file.path });

    return res.status(201).json(genre);
  });

router.route('/genres/:genreId')
  .put(upload.single('coverImage'), async (req, res) => {
    const { genreId } = req.params;
    const { title, description } = req.body;
    // const coverImage = {};
    // coverImage.data = fs.readFileSync(req.file.path);
    // coverImage.contentType = req.file.mimetype;

    const updatedGenre = await Genre.findOneAndUpdate(
      { _id: genreId },
      { title, description, coverImageUrl: req.file.path },
      { new: true },
    );

    if (!updatedGenre) throw Http500Response('nothing is changed!');

    return res.status(202).json(updatedGenre);
  })
  .delete(async (req, res) => {
    const { genreId } = req.params;

    await Genre.deleteOne({ _id: genreId });

    return res.status(202).send('deletion accepted');
  });

router.route('/genres/:genreId/series')
  .get(async (req, res) => {
    const { genreId } = req.params;

    res.send(await Series.find({ genreId }));
  });

export default router;
