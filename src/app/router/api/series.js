/* eslint-disable no-unused-vars */
import express from 'express';
import Series from '../../models/series';

const router = express.Router();

// router.get('/series/all', (req, res) => {

// });

// router.get('/series', (req, res) => {

// });

router.post('/series/create', async (req, res) => {
  const { title, authorId } = req.body;
  try {
    const series = await Series.create(title, authorId);
    return res.status(201).send(series);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/series/:seriesId/remove', (req, res) => {

});

export default router;
