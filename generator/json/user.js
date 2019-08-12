const faker = require('faker');

const generateUserJson = () => ({
  oauthId: faker.lorem.text(),
  provider: 'google',
  isOfficial: false,
  profileImage: faker.image.avatar(),
});

export default [
  ...Array(50).map(generateUserJson),
];
