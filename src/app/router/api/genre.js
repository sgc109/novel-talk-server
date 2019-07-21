import express from 'express';
import multer from 'multer';
import fs from 'fs';
import Genre from '../../models/genre';

const router = express.Router();
const upload = multer({ dest: 'uploads/genre/' });

router.get('/genre/all', async (req, res) => {
  let genres;
  try {
    genres = await Genre.getAllGenres();
  } catch (err) {
    res.status(500).send(err);
  }
  res.status(200).send(genres);
});

router.get('/genre/:genreId', (req, res) => {
  res.send('specific genre');
});


router.post('/genre/create', upload.single('coverImage'), async (req, res) => {
  const { title, description } = req.body;
  const coverImg = {};
  coverImg.data = fs.readFileSync(req.file.path);
  coverImg.contentType = req.file.mimetype;

  try {
    await Genre.create(title, description, coverImg);
  } catch (err) {
    return res.status(500).send('duplicate title');
  }

  return res.status(202).send('creation accepted');
});

export default router;
