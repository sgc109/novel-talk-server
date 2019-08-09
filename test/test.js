// import chai from 'chai';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import server, { disposable } from '../app';
import genreTest from './api/genre.test';
import { mongoTestHost, mongoTestPort, mongoTestDBName } from './config';
import User from '../src/app/models/user';
import { testAdminAccountNickname, testUserAccountNickname } from '../src/config/config';

const baseUrl = '/api';

describe('Novel Talk Server', () => {
  before(async () => {
    await mongoose.disconnect();
    await mongoose.connect(`mongodb://${mongoTestHost}:${mongoTestPort}/${mongoTestDBName}`, { useNewUrlParser: true, useFindAndModify: false });
    await mongoose.connection.dropDatabase();
    await User.create({
      nickname: testAdminAccountNickname,
      oauthId: 'dummy',
      provider: 'noone',
      isOfficial: true,
    });

    await User.create({
      nickname: testUserAccountNickname,
      oauthId: 'dummy',
      provider: 'noone',
      isOfficial: true,
    });
  });
  genreTest();
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
