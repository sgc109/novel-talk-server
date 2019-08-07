/* eslint-disable no-unused-vars */
import express from 'express';
import axios from 'axios';
import User from '../../models/user';
import { RESPONSE_UNAUTHORIZED } from '../response';
import { googleClientId, facebookAppId, facebookAppSecret } from '../../../config/oauth';


const { OAuth2Client } = require('google-auth-library');


const client = new OAuth2Client(googleClientId);
const router = express.Router();


const oauth = {
  google: async (token) => {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });
    return ticket.getPayload().sub;
  },
  facebook: async (token) => {
    const response = await axios.get('https://graph.facebook.com/debug_token', {
      params: {
        input_token: token,
        access_token: `${facebookAppId}|${facebookAppSecret}`,
      },
      timeout: 5000,
    });
    const { data } = response.data || {};
    /* eslint-disable camelcase */
    const { is_valid, user_id } = data || {};
    if (is_valid !== true) throw RESPONSE_UNAUTHORIZED;
    return user_id;
  },
};


router.get('/auth/login/:provider', async (req, res) => {
  try {
    const { provider } = req.params;
    const { token, photoUrl } = JSON.parse(req.header('oauthData'));


    const getUserIdFunction = oauth[provider];

    if (!getUserIdFunction) throw Error();

    const oauthId = await getUserIdFunction(token);

    if (!oauthId) throw Error();

    let user = await User.findOne({ oauthId });

    if (!user) {
      user = new User({ oauthId, provider });
      await user.save();
    }
    const authToken = user.generateAuthToken();
    res.status(201).send({ user, token: authToken });
  } catch (e) {
    console.log(e);
    throw RESPONSE_UNAUTHORIZED;
  }
});

export default router;
