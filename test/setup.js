/* eslint-disable linebreak-style */

import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../server/app';

describe('GET /', () => {
  it('should get the root page', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        if (err) { return done(err); }
        done();
      });
  });
});