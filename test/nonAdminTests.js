/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */


import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../server/app';

let token;

describe('POST Requests', () => {

    describe ('POST /api/v1/auth/signup', () => {
      it('should create a new user for other tests', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Sally',
            lastname: 'Diana',
            othername: 'Marta',
            email: 'sally@mart.com',
            phone: '+234-123456789',
            passportUrl: 'www.sallypassport.jpeg',
            password: 'diana',
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

      /* ***************************CREATE PARTY******************************* */

      describe ('POST /api/v1/parties', () => {
        it('should attempt to create party without admin rights', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
            .send({
              name: 'Peoples Develop Party',
              hqAddress: 'Folawiyo Bankole Street',
              logoUrl: 'www.develop.com/url.jpg',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body.error.message).to.equal('User Unauthorized');
            if (err) { return done(err); }
            done();
            });
        });
      });

    /* ***************************CREATE OFFICE******************************* */

      describe ('POST /api/v1/offices', () => {
        it('should attempt to create office without admin rights', (done) => {
          request(app)
            .post('/api/v1/offices')
            .set('token', token)
            .send({
              name: 'Chief Justice',
              type: 'Legislative',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body.error.message).to.equal('User Unauthorized');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should attempt to create a candidate without admin rights', (done) => {
          request(app)
            .post('/api/v1/offices/1/register')
            .set('token', token)
            .send({
              name: 'Chief Justice',
              type: 'Legislative',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body.error.message).to.equal('User Unauthorized');
            if (err) { return done(err); }
            done();
            });
        });
      });
});


  /* ***************************EDIT PARTY******************************* */

describe ('PATCH Requests', () => {
  describe ('GET /api/v1/parties/1', () => {
    it('should edit a party without admin rights', (done) => {
      request(app)
        .patch('/api/v1/parties/1/name')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.error.message).to.equal('User Unauthorized');
          if (err) { return done(err); }
          done();
        });
    });
  });
});

/* ***************************DELETE PARTY******************************* */

describe ('DELETE Requests', () => {
  describe ('GET /api/v1/parties/1', () => {
    it('should edit a party without admin rights', (done) => {
      request(app)
        .delete('/api/v1/parties/1')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.error.message).to.equal('User Unauthorized');
          if (err) { return done(err); }
          done();
        });
    });
  });
});
