import series from './api/series';
import story from './api/story';
import user from './api/user';
import comment from './api/comment';
// import auth from './api/auth';
// import genre from './api/genre';
// import home from './api/home';
// import notification from './api/notification';
// import report from './api/report';
// import talk from './api/talk';

export default (app) => {
  const routes = [
    user,
    series,
    story,
    comment,
    // auth,
    // genre,
    // home,
    // notification,
    // report,
    // talk,
  ];

  routes.map(route => route(app));

  app.get('/', (req, res) => {
    res.json({ result: 'hello world!' });
  });
};