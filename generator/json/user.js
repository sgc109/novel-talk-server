const faker = require('faker');

const generateUserJson = () => ({
  oauthId: faker.lorem.text(),
  provider: 'google',
  isOfficial: false,
  profileImage: faker.image.avatar(),
});

const users = Array.from({ length: 100 }).map(generateUserJson);
export default users;
