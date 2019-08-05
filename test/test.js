// import chai from 'chai';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import server, { disposable } from '../app';

const baseUrl = '/api';
const randomSeriesId = '5d46723642c6eb449781ad1f';
let randomStoryId;

describe('Novel Talk Server', () => {
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

  describe('Story', () => {
    it('get all stories', async () => {
      const res = await request(server)
        .get(`${baseUrl}/series/${randomSeriesId}/stories`)
        .set('Authorization', 'Bearer 5d417dd07e4530f807811416');

      // console.log(res.body);
      randomStoryId = res.body[0]._id;

      expect(res.status).to.equal(200);
    });
  });

  describe('Comment', () => {
    it('get all comments', async () => {
      const res = await request(server)
        .get(`${baseUrl}/stories/${randomStoryId}/comments`)
        .set('Authorization', 'Bearer 5d417dd07e4530f807811416');
      expect(res.status).to.equal(200);
    });
  });

  after(() => {
    mongoose.disconnect();
    disposable.close();
  });
});
