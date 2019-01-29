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
              expect(res.body.error).to.equal('User Unauthorized');
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
              expect(res.body.error).to.equal('User Unauthorized');
            if (err) { return done(err); }
            done();
            });
        });
      });

});

describe('GET Requests', () => {

     /* ***************************GET ALL PARTIES******************************* */

    describe ('GET /api/v1/parties', () => {
        it('should get all parties without admin rights', (done) => {
          request(app)
            .get('/api/v1/parties')
            .set('token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(401);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal('User Unauthorized');
              if (err) { return done(err); }
              done();
            });
        });
      });

    /* ***************************GET ALL OFFICES******************************* */

    describe ('GET /api/v1/offices', () => {
      it('should get all offices without admin rights', (done) => {
        request(app)
          .get('/api/v1/offices')
          .set('token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.equal('User Unauthorized');
            if (err) { return done(err); }
            done();
          });
      });
    });
});
