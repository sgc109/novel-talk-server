import mongoose from 'mongoose';
import {
  mongoDBTestName, mongoHost, mongoPort,
} from '../src/config/db';
import { User, Genre, Series } from '../src/app/models';


const genreDatas = require('./json/genre');
const userDatas = require('./json/user');
const seriesDatas = require('./json/series');

const dependencies = new Map();
const generator = new Map();

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDBTestName}`, { useNewUrlParser: true, useFindAndModify: false });


generator
  .set(User, userDatas) // make 30 dummy users
  .set(Genre, genreDatas) // create Genre with genre json file
  .set(Series, seriesDatas);

dependencies
  .set(User, (_) => {})
  .set(Genre, (_) => {})
  .set(Series, (_) => { // Series should be created after User,Genre Model created
    const genres = Genre.getAllGenres();
    const users = User.find({}).take(10).exec();
    return { genre: genres[0].id, author: users[0].id };
  });


// order is important
const topologicalOrder = [User, Genre, Series];

topologicalOrder.forEach(async (Schema) => {
  const presets = generator.get(Schema);
  const jobs = [];
  // user = new User({ oauthId, provider });
  // await user.save();
  console.log(presets[0]);
  presets.forEach((data) => {
    const instance = new Schema({
      ...data,
      ...dependencies.get(Schema)(),
    });

    // const job = Schema({
    //   ...data,
    //   ...dependencies.get(Schema)(),
    // }).save();
    jobs.push(instance.save());
  });
  await Promise.all(jobs).catch(err => console.err(err));
});
