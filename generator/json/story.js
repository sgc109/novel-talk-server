const faker = require('faker');


const generateStoryJson = () => ({
  title: faker.lorem.sentence(),
  cntComments: faker.random.number() % 100,
  cntView: faker.random.number() % 100,
  cntEval: faker.random.number() % 10,
});


const series = Array.from({ length: 100 }).map(generateStoryJson);

export default series;
