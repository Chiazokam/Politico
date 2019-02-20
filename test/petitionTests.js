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
          name: 'Agbara Chairman',
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

  describe ('POST /api/v1/petitions', () => {
    it('should create a new petition', (done) => {
      request(app)
        .post('/api/v1/petitions')
        .set('token', token)
        .send({
          office: '1',
          text: 'The winner of the Presidential office is a thief',
          evidence: 'winner.jpg',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].office).to.equal(1);
        if (err) { return done(err); }
        done();
        });
    });
  });
  
  describe ('POST /api/v1/petitions', () => {
    it('should create a new petition with no office input', (done) => {
      request(app)
        .post('/api/v1/petitions')
        .set('token', token)
        .send({
          office: '            ',
          text: 'The winner of the Presidential office is a thief',
          evidence: 'winner.jpg',
        })
        .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error.office).to.equal('Improper Office format');
        if (err) { return done(err); }
        done();
        });
    });
  });

  describe ('POST /api/v1/petitions', () => {
    it('should create a new petition with no office input', (done) => {
      request(app)
        .post('/api/v1/petitions')
        .set('token', token)
        .send({
          office: '1',
          text: '       ',
          evidence: 'winner.jpg',
        })
        .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error.text).to.equal('Improper text format');
        if (err) { return done(err); }
        done();
        });
    });
  });

  describe ('POST /api/v1/petitions', () => {
    it('should create a new petition with no office input', (done) => {
      request(app)
        .post('/api/v1/petitions')
        .set('token', token)
        .send({
          office: '1',
          text: 'The winner of the Presidential office is a thief',
          evidence: '             ',
        })
        .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error.evidence).to.equal('Improper format for evidence');
        if (err) { return done(err); }
        done();
        });
    });
  });

  describe ('POST /api/v1/petitions', () => {
    it('should test for office input as integer', (done) => {
      request(app)
        .post('/api/v1/petitions')
        .set('token', token)
        .send({
          office: 4,
          text: 'The winner of the Presidential office is a thief',
          evidence: 'winner.jpg',
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

  describe ('POST /api/v1/petitions', () => {
    it('should test for text input as integer', (done) => {
      request(app)
        .post('/api/v1/petitions')
        .set('token', token)
        .send({
          office: '1',
          text: 99,
          evidence: 'winner.jpg',
        })
        .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error.text).to.equal('Petition text cannot be an Integer');
        if (err) { return done(err); }
        done();
        });
    });
  });

  describe ('POST /api/v1/petitions', () => {
    it('should test for text input as integer', (done) => {
      request(app)
        .post('/api/v1/petitions')
        .set('token', token)
        .send({
          office: '1',
          text: 'The winner of the Presidential office is a thief',
          evidence: 88,
        })
        .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error.evidence).to.equal('Petition evidence cannot be an Integer');
        if (err) { return done(err); }
        done();
        });
    });
  });

  describe ('POST /api/v1/petitions', () => {
    it('should test for an invalid office input', (done) => {
      request(app)
        .post('/api/v1/petitions')
        .set('token', token)
        .send({
          office: '--------------',
          text: 'The winner of the Presidential office is a thief',
          evidence: 'evidence.jpg',
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

  describe ('POST /api/v1/petitions', () => {
    it('should check if office exists', (done) => {
      request(app)
        .post('/api/v1/petitions')
        .set('token', token)
        .send({
          office: '20',
          text: 'The winner of the Presidential office is a thief',
          evidence: 'evidence.jpg',
        })
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