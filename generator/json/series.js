const faker = require('faker');

const generateSeriesJson = () => ({
  title: faker.lorem.sentence(),
  isRecommend: false,
  cntStories: 0,
  coverImage: 'asdf.jpg',
});


const series = Array.from({ length: 15 }).map(generateSeriesJson);

export default series;
