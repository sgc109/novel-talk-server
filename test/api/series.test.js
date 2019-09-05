/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import request from 'supertest';
import { expect } from 'chai';
import server from '../../app';
import { baseUrl } from '../config';

export default jwt => describe('Series Test', async () => {
  let genreId;

  it('Create Series', async () => {
    await request(server)
      .post(`${baseUrl}/series`)
      .field('title', 'mock series')
      .field('description', 'mock series')
      .attach('coverImageUrl', 'static/images/android.png')
      .expect(201);
  });

  it('Get Series', async () => {
    const res = await request(server)
      .get(`${baseUrl}/genres`);
    expect(res.status).to.equal(200);
    expect(res.body).to.haveOwnProperty('0');
    const [genre] = res.body;
    genreId = genre._id;
  });

  it('Get specific Series', async () => {
    const res = await request(server)
      .get(`${baseUrl}/genres`);
    expect(res.status).to.equal(200);
    expect(res.body).to.haveOwnProperty('0');
    const [genre] = res.body;
    genreId = genre._id;
  });

  it('Get series in a genre', async () => {
    const res = await request(server)
      .get(`${baseUrl}/genres/${genreId}/series`);
    expect(res.status).to.equal(200);
  });

  it('Delete Genre', async () => {
    await request(server)
      .delete(`${baseUrl}/genres/${genreId}`)
      .expect(202);
  });
});
