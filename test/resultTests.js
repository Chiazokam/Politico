/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../server/app';

let token;

describe('POST Requests', () => {

  describe ('POST /api/v1/auth/login', () => {
    it('should sign in a user', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'chiazokamecheta@gmail.com',
          password: 'root',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          token = res.body.data[0].token;
        if (err) { return done(err); }
        done();
        });
    });
  });
});

describe ('POST /api/v1/offices', () => {
  it('should create a new office', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('token', token)
      .send({
        name: 'Party Chairman',
        type: 'State',
    })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
      if (err) { return done(err); }
      done();
      });
  });
});

describe ('GET Requests', () => {

  describe ('GET /api/v1/office/id/result', () => {
    it('should get results for an office', (done) => {
      request(app)
        .get('/api/v1/office/4/result')
        .set('token', token)
        .end((err, res) => {
          console.log(res.error)
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.equal('No Results for this office Found');
          if (err) { return done(err); }
          done();
        });
    });
  });
});