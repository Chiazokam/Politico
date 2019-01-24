/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */

import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../server/app';

describe('GET Requests', () => {
  describe('GET /', () => {
    it('should get the root page', (done) => {
      request(app)
        .get('/')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Welcome to Politico');
          if (err) { return done(err); }
          done();
        });
    });
  });
});