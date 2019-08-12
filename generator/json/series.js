const faker = require('faker');

//
// title: { type: String, required: true },
// author: { type: Schema.Types.ObjectId, ref: 'User' },
// genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
// isRecommend: { type: Boolean }, // indexing 하기
// cntStories: { type: Number, default: 0 },
// coverImage: { type: String, required: true },
// lastWrittenAt: { type: Date, default: '1970-01-01' },

const generateUserJson = () => ({
  title: faker.lorem.sentence(),
  isRecommend: false,
  cntStories: 0,
  coverImage: '',
});

export default [
  ...Array(30).map(generateUserJson),
];
