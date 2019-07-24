import admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://movietalktalkdb.firebaseio.com',
});
const authService = admin.auth();


const requiresAuth = async (req, res, next) => {
  const idToken = req.header('FIREBASE_AUTH_TOKEN');
  let decodedIdToken;
  try {
    decodedIdToken = await authService.verifyIdToken(idToken);
    const { uid } = decodedIdToken;
    req.uid = uid;
  } catch (error) {
    next(error);
    return;
  }
  next();
};

export default requiresAuth;
