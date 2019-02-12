/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../server/app';

let token, adminToken;

describe('POST Requests', () => {
    describe ('POST /api/v1/auth/signup', () => {
        it('should create a new user', (done) => {
          request(app)
            .post('/api/v1/auth/signup')
            .send({
              firstname: 'Manny',
              lastname: 'Manny',
              othername: 'Manny',
              email: 'manny@manny.com',
              phone: '+234-7032000466',
              passportUrl: 'www.manny.jpeg',
              password: 'manny',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
              token = res.body.data[0].token;
            if (err) { return done(err); }
            done();
            });
        });
      });

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
              adminToken = res.body.data[0].token;
            if (err) { return done(err); }
            done();
            });
        });
      });

     describe ('POST /api/v1/parties', () => {
        it('should create a new party', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', adminToken)
            .send({
              name: 'New Peoples Party',
              hqAddress: 'Ibadan, Nigeria',
              logoUrl: 'www.npp.com/url.jpg',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
              expect(res.body.data[0].name).to.equal('New Peoples Party');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices', () => {
        it('should create a new office', (done) => {
          request(app)
            .post('/api/v1/offices')
            .set('token', adminToken)
            .send({
              name: 'Village Chief',
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

      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate', (done) => {
          request(app)
            .post('/api/v1/offices/1/register')
            .set('token', adminToken)
            .send({
              office: '1',
              party: '3',
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
      
      describe ('POST /api/v1/votes', () => {
        it('should vote', (done) => {
          request(app)
            .post('/api/v1/votes')
            .set('token', token)
            .send({
              office: '1',
              candidate: '2',
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

      describe ('POST /api/v1/votes', () => {
        it('should vote a non-existing office', (done) => {
          request(app)
            .post('/api/v1/votes')
            .set('token', token)
            .send({
              office: '10',
              candidate: '1',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.error.office).to.equal('Office Not Found');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/votes', () => {
        it('should vote with office as integer', (done) => {
          request(app)
            .post('/api/v1/votes')
            .set('token', token)
            .send({
              office: 8,
              candidate: '15',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.error.office).to.equal('Office cannot be an Integer');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should vote with candidate as integer', (done) => {
          request(app)
            .post('/api/v1/votes')
            .set('token', token)
            .send({
              office: '1',
              candidate: 15,
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.error.candidate).to.equal('Candidate cannot be an Integer');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/votes', () => {
        it('should vote with candidate as an invalid input', (done) => {
          request(app)
            .post('/api/v1/votes')
            .set('token', token)
            .send({
              office: '1',
              candidate: '------',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.error.candidate).to.equal('Candidate input is not valid');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/votes', () => {
        it('should vote with party as an invalid input', (done) => {
          request(app)
            .post('/api/v1/votes')
            .set('token', token)
            .send({
              office: '-----------',
              candidate: '1',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.error.office).to.equal('Office input is not valid');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/votes', () => {
        it('should check if user has voted', (done) => {
          request(app)
            .post('/api/v1/votes')
            .set('token', token)
            .send({
              office: '1',
              candidate: '1',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body).to.be.an('object');
                expect(res.body.error.message).to.equal('You cannot vote twice for this office');
            if (err) { return done(err); }
            done();
            });
        });
      });
});
