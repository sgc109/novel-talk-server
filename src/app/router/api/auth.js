/* eslint-disable no-unused-vars */
import express from 'express';

const router = express.Router();

router.get('/auth/login/:provider', (req, res) => {
  const { provider } = req.params;

  if (provider === 'google') {
    const { oauthData } = JSON.parse(req.headers.oauthData);
    const { token, photoUrl, displayName } = oauthData;
  }

  res.send('hi');
});

export default router;
