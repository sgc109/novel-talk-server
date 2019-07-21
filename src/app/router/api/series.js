/* eslint-disable no-unused-vars */
import Series from '../../models/series';

export default (app) => {
  // app.get('/api/series/all', (req, res) => {

  // });

  // app.get('/api/series', (req, res) => {

  // });

  app.post('/api/series/create', async (req, res) => {
    const { title, authorId } = req.body;
    try {
      const series = await Series.create(title, authorId);
      return res.status(201).send(series);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  app.delete('/api/series/:seriesId/remove', (req, res) => {

  });
};
