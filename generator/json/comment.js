const faker = require('faker');

const generateCommentJson = () => ({
  content: faker.lorem.sentence(),
  isHidden: faker.random.number() % 10 === 0,
  cntLike: faker.random.number() % 100,
});


const series = Array.from({ length: 400 }).map(generateCommentJson);

export default series;
