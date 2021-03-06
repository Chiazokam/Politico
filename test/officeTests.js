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

    describe ('POST /api/v1/offices', () => {
      it('should create a new office', (done) => {
        request(app)
          .post('/api/v1/offices')
          .set('token', token)
          .send({
            name: 'Governor',
            type: 'State',
        })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
            expect(res.body.data[0].name).to.equal('Governor');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/offices', () => {
        it('should attempt to create an existing office', (done) => {
          request(app)
            .post('/api/v1/offices')
            .set('token', token)
            .send({
              name: 'Governor',
              type: 'State',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(409);
              expect(res.body).to.be.an('object');
              expect(res.body.error.message).to.equal('Office Already Exists');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices', () => {
        it('should check for an empty name field', (done) => {
          request(app)
            .post('/api/v1/offices')
            .set('token', token)
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
        it('should check for integers in the name input', (done) => {
          request(app)
            .post('/api/v1/offices')
            .set('token', token)
            .send({
              name: '7528873',
              type: 'State',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.name).to.equal('Office Name Invalid');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices', () => {
        it('should check for an empty type field', (done) => {
          request(app)
            .post('/api/v1/offices')
            .set('token', token)
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
            .set('token', token)
            .send({
              name: 'President',
              type: 'Officer',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.type).to.equal('Office Type Incorrect');
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
        .set('token', token)
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
        .set('token', token)
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
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error.message).to.equal('Office Not Found');
          if (err) { return done(err); }
          done();
        });
    });
  });
});
