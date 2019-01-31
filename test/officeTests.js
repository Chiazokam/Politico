/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../server/app';

describe('POST Requests', () => {

    describe ('POST /api/v1/offices', () => {
      it('should create a new office', (done) => {
        request(app)
          .post('/api/v1/offices')
          .send({
            name: 'Governor',
            type: 'State',
        })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
            expect(res.body.data[0].name).to.equal('governor');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/offices', () => {
        it('should attempt tocreate an existing office', (done) => {
          request(app)
            .post('/api/v1/offices')
            .send({
              name: 'Governor',
              type: 'State',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(403);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal('Office Already Exists');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices', () => {
        it('should check for an empty name field', (done) => {
          request(app)
            .post('/api/v1/offices')
            .send({
              name: '  ',
              type: 'State',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.name).to.equal('Improper office Name format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices', () => {
        it('should check for an empty type field', (done) => {
          request(app)
            .post('/api/v1/offices')
            .send({
              name: 'President',
              type: '    ',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.type).to.equal('Improper office Type format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices', () => {
        it('should check for a wrong type format', (done) => {
          request(app)
            .post('/api/v1/offices')
            .send({
              name: 'President',
              type: 'Officer',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal('Office Type Incorrect');
            if (err) { return done(err); }
            done();
            });
        });
      });
});

describe ('GET Requests', () => {

  describe ('GET /api/v1/offices', () => {
    it('should get all offices', (done) => {
      request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe ('GET /api/v1/offices/:id', () => {
    it('should get one office', (done) => {
      request(app)
        .get('/api/v1/offices/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe ('GET /api/v1/offices/:id', () => {
    it('should get a non-existing office', (done) => {
      request(app)
        .get('/api/v1/offices/3')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Office Not Found');
          if (err) { return done(err); }
          done();
        });
    });
  });
});
