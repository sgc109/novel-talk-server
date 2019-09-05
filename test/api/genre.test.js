/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import request from 'supertest';
import { expect } from 'chai';
import server from '../../app';
import { baseUrl } from '../config';

export default jwt => describe('Genre Test', async () => {
  let genreId;

  it('Create Genres', async () => {
    await request(server)
      .post(`${baseUrl}/genres`)
      .field('title', 'mock genre')
      .field('description', 'mock genre')
      .attach('coverImageUrl', 'static/images/android.png')
      .expect(201);
  });

  it('Get Genres', async () => {
    const res = await request(server)
      .get(`${baseUrl}/genres`);
    expect(res.status).to.equal(200);
    expect(res.body).to.haveOwnProperty('0');
    const [genre] = res.body;
    genreId = genre._id;
  });

  it('Update Genre', async () => {
    const newTitle = 'updated title';
    const newDescription = 'updated description';
    const res = await request(server)
      .put(`${baseUrl}/genres/${genreId}`)
      .field('title', newTitle)
      .field('description', newDescription)
      .attach('coverImageUrl', 'static/images/android.png');
    expect(res.status).to.equal(202);
    expect(res.body).to.haveOwnProperty('title', newTitle);
    expect(res.body).to.haveOwnProperty('description', newDescription);
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
