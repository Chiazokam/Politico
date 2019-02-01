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

      describe ('POST /api/v1/auth/signup', () => {
        it('should create a new user', (done) => {
          request(app)
            .post('/api/v1/auth/signup')
            .send({
              firstname: 'Madea',
              lastname: 'Madea',
              othername: 'Madea',
              email: 'Madea@madea.com',
              phone: '+234-7032789456',
              passportUrl: 'www.madea.jpeg',
              password: 'Madea',
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

      describe ('POST /api/v1/parties', () => {
        it('should create a new party', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
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
            .set('token', token)
            .send({
              name: 'Village Chairman',
              type: 'State',
          })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
              expect(res.body.data[0].name).to.equal('Village Chairman');
            if (err) { return done(err); }
            done();
            });
        });
      });

      
      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate', (done) => {
          request(app)
            .post('/api/v1/offices/1/register')
            .set('token', token)
            .send({
              office: '1',
              party: '1',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
              expect(res.body.data[0].office).to.equal('1');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should create a new candidate with a non-existing user', (done) => {
          request(app)
            .post('/api/v1/offices/15/register')
            .set('token', token)
            .send({
              office: '1',
              party: '1',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.equal('User Not Found');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate with a non-existing office', (done) => {
          request(app)
            .post('/api/v1/offices/2/register')
            .set('token', token)
            .send({
              office: '10',
              party: '1',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.equal('Office Not Found');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate with a non-existing party', (done) => {
          request(app)
            .post('/api/v1/offices/2/register')
            .set('token', token)
            .send({
              office: '1',
              party: '15',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.equal('Party Not Found');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate with office as integer', (done) => {
          request(app)
            .post('/api/v1/offices/2/register')
            .set('token', token)
            .send({
              office: 8,
              party: '15',
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
        it('should create a new candidate with party as integer', (done) => {
          request(app)
            .post('/api/v1/offices/2/register')
            .set('token', token)
            .send({
              office: '1',
              party: 15,
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.error.party).to.equal('Party cannot be an Integer');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate with party as an invalid input', (done) => {
          request(app)
            .post('/api/v1/offices/2/register')
            .set('token', token)
            .send({
              office: '1',
              party: '------',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.error.party).to.equal('Party input is not valid');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate with party as an invalid input', (done) => {
          request(app)
            .post('/api/v1/offices/2/register')
            .set('token', token)
            .send({
              office: '-----------',
              party: '1',
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

      describe ('POST /api/v1/parties', () => {
        it('should check if candidate already exists', (done) => {
          request(app)
            .post('/api/v1/offices/1/register')
            .set('token', token)
            .send({
              office: '1',
              party: '1',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.equal('Candidate Already Exists');
            if (err) { return done(err); }
            done();
            });
        });
      });
}); 
