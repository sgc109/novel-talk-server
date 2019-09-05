/* eslint-disable no-unused-vars */
// import chai from 'chai';
// import request from 'supertest';
// import { expect } from 'chai';
import mongoose from 'mongoose';
import { disposable } from '../app';
import genreTest from './api/genre.test';
import seriesTest from './api/series.test';
import { mongoTestHost, mongoTestPort, mongoTestDBName } from './config';
import User from '../src/app/models/user';
import Series from '../src/app/models/series';
import Genre from '../src/app/models/genre';
import Story from '../src/app/models/story';
import Comment from '../src/app/models/comment';

import { testOfficialUserNickname, testNormalUserNickname } from '../src/config/config';

// const baseUrl = '/api';
let officialUser;
let normalUser;
let genreId;
let seriesId;
let storyId;
let commentId;

describe('Novel Talk Server', async () => {
  before(async () => {
    await mongoose.disconnect();
    await mongoose.connect(`mongodb://${mongoTestHost}:${mongoTestPort}/${mongoTestDBName}`, { useNewUrlParser: true, useFindAndModify: false });
    await mongoose.connection.dropDatabase();
    officialUser = await User.create({
      nickname: testOfficialUserNickname,
      oauthId: 'dummy',
      provider: 'noone',
      isOfficial: true,
    });

    normalUser = await User.create({
      nickname: testNormalUserNickname,
      oauthId: 'dummy',
      provider: 'noone',
      isOfficial: true,
    });

    genreId = await Genre.create({ title: 'test', description: 'test' })._id;
    seriesId = await Series.create({ title: 'title', authorId: officialUser._id, genreId })._id;
    storyId = await Story.create({ title: 'title', seriesId, authorId: officialUser._id })._id;
    commentId = await Comment.create({ storyId, writerId: normalUser._id, content: 'test' });
  });
  genreTest();
  seriesTest();
  // describe('Series', () => {
  //   it('get all series', async () => {
  //     const res = await request(server)
  //       .get(`${baseUrl}/series`)
  //       .set('Authorization', 'Bearer 5d417dd07e4530f807811416');

  //     console.log(res.body);
  //     randomSeriesId = res.body[0];

  //     expect(res.status).to.equal(200);
  //   });
  // });

  // describe('Story', () => {
  //   it('get all stories', async () => {
  //     const res = await request(server)
  //       .get(`${baseUrl}/series/${randomSeriesId}/stories`)
  //       .set('Authorization', 'Bearer 5d417dd07e4530f807811416');

  //     // console.log(res.body);
  //     randomStoryId = res.body[0]._id;

  //     expect(res.status).to.equal(200);
  //   });
  // });

  // describe('Comment', () => {
  //   it('get all comments', async () => {
  //     const res = await request(server)
  //       .get(`${baseUrl}/stories/${randomStoryId}/comments`)
  //       .set('Authorization', 'Bearer 5d417dd07e4530f807811416');
  //     expect(res.status).to.equal(200);
  //   });
  // });

  after(() => {
    mongoose.disconnect();
    disposable.close();
  });
});
