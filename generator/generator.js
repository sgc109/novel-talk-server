import mongoose from 'mongoose';
import {
  mongoDBTestName, mongoHost, mongoPort,
} from '../src/config/db';
import { User, Genre, Series } from '../src/app/models';
import { genreDatas, seriesDatas, userDatas } from './json';


const dependencies = new Map();
const generator = new Map();

mongoose.set('useCreateIndex', true);
const db = mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDBTestName}`, { useNewUrlParser: true, useFindAndModify: false });

mongoose.connection.dropDatabase(); // clear db very first time.


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


generator
  .set(User, userDatas)
  .set(Genre, genreDatas)
  .set(Series, seriesDatas);

dependencies
  .set(User, (_) => {})
  .set(Genre, (_) => {})
  .set(Series, async (_) => { // Series should be created after User,Genre Model created
    const genres = await Genre.find({}).exec();
    const users = await User.find({}).exec();
    const genreIndex = getRandomInt(0, genres.length);
    const userIndex = getRandomInt(0, users.length);
    return { genre: genres[genreIndex]._id, author: users[userIndex]._id };
  });


// order is very important

const topologicalOrder = [Genre, User, Series];

async function process(Schemas) {
  if (Schemas.length === 0) return;
  const T = Schemas.shift(0);
  const presets = generator.get(T);
  const jobs = [];
  presets.forEach((data) => {
    const instance = new T({
      ...data,
      ...dependencies.get(T)(),
    });
    jobs.push(instance.save());
  });
  await Promise.all(jobs).catch(err => console.log(err));
  process(Schemas);
}

process(topologicalOrder)
  .then(() => console.log('generate data'))
  .catch(err => console.log(err));
