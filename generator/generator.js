import mongoose from 'mongoose';
import {
  mongoDBTestName, mongoHost, mongoPort,
} from '../src/config/db';
import {
  User, Genre, Series, Story, Comment,
} from '../src/app/models';
import {
  genreDatas, seriesDatas, userDatas, storyDatas, commentDatas,
} from './json';


const dependencies = new Map();
const generator = new Map();

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDBTestName}`, { useNewUrlParser: true, useFindAndModify: false });

mongoose.connection.dropDatabase(); // clear db very first time.


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function getRandomData(Schema) {
  const datas = await Schema.find({}).exec();
  return datas[getRandomInt(0, datas.length)];
}

generator
  .set(User, userDatas)
  .set(Genre, genreDatas)
  .set(Series, seriesDatas)
  .set(Story, storyDatas)
  .set(Comment, commentDatas);

dependencies
  .set(User, async () => {})
  .set(Genre, async () => {})
  .set(Series, async () => {
    const genre = await getRandomData(Genre);
    const user = await getRandomData(User);
    return { genre: genre._id, author: user._id };
  })
  .set(Story, async () => {
    const user = await getRandomData(User);
    const series = await getRandomData(Series);
    return { series: series._id, author: user._id };
  })
  .set(Comment, async () => {
    // Comment should be created after User,Series,Story model created
    const user = await getRandomData(User);
    const series = await getRandomData(Series);
    const story = await getRandomData(Story);

    return {
      series: series._id,
      story: story._id,
      writer: user._id,
    };
  });


// Series should be created after [ User , Genre ]
// Story should be created after [User, Series ]
// Comment should be created after [User, Series, Story ]

const topologicalOrder = [User, Genre, Series, Story, Comment];

async function process(Schemas) {
  if (Schemas.length === 0) {
    mongoose.connection.close();
    return;
  }
  const T = Schemas.shift(0);
  const presets = generator.get(T);

  const jobs = presets.map(async (data) => {
    const dependencyModels = await dependencies.get(T)();
    return T({
      ...data,
      ...dependencyModels,
    }).save();
  });


  await Promise.all(jobs);
  console.log(T);
  console.log('created');
  process(Schemas);
}

process(topologicalOrder);
