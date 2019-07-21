import express from 'express';

const router = express.Router();

router.get('/auth/login', (req, res) => {
  res.send('hi');
});

export default router;
