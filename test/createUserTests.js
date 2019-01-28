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
      it('should create a new user', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Dan',
            lastname: 'Mabel',
            othername: 'Cory',
            email: 'dan@mabel.com',
            phone: '+234-7032789466',
            passportUrl: 'www.passport.jpeg',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
            expect(res.body.data[0].user.firstname).to.equal('Dan');
            token = res.body.data[0].token;
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should attempt to recreate an existing user', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Dan',
            lastname: 'Mabel',
            othername: 'Cory',
            email: 'dan@mabel.com',
            phone: '+234-7032789466',
            passportUrl: 'www.passport.jpeg',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.equal('User already exists');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty firstname field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: ' ',
            lastname: 'Mabel',
            othername: 'Cory',
            email: 'dan@mabel.com',
            phone: '+234-7032789466',
            passportUrl: 'www.passport.jpeg',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error.firstname).to.equal('Firstname field cannot be empty');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty lastname field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Dane',
            lastname: '    ',
            othername: 'Cory',
            email: 'dan@mabel.com',
            phone: '+234-7032789466',
            passportUrl: 'www.passport.jpeg',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.lastname).to.equal('Lastname field cannot be empty');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty othername field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'May',
            lastname: 'Cory',
            othername: '  ',
            email: 'dan@mabel.com',
            phone: '+234-7032789466',
            passportUrl: 'www.passport.jpeg',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.othername).to.equal('Othername field cannot be empty');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty email field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Jude',
            lastname: 'Mabel',
            othername: 'Cory',
            email: '   ',
            phone: '+234-7032789466',
            passportUrl: 'www.passport.jpeg',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.email).to.equal('Email field cannot be empty');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty phone field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Mule',
            lastname: 'Mabel',
            othername: 'Cory',
            email: 'dan@mabel.com',
            phone: '    ',
            passportUrl: 'www.passport.jpeg',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.phone).to.equal('Phone Number field cannot be empty');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty passport Url field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Mule',
            lastname: 'Mabel',
            othername: 'Cory',
            email: 'dan@mabel.com',
            phone: '+234-9034567234',
            passportUrl: '    ',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.passportUrl).to.equal('Passport Url field cannot be empty');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty password field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Mule',
            lastname: 'Mabel',
            othername: 'Cory',
            email: 'dan@mabel.com',
            phone: '+234-9034567234',
            passportUrl: 'www.passport.jpg',
            password: '     ',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.password).to.equal('Password field cannot be empty');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty password field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Mule',
            lastname: 'Mabel',
            othername: 'Cory',
            email: 'danmabel.com',
            phone: '+234-9034567234',
            passportUrl: 'www.passport.jpg',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal('Wrong email format');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for a wrong phone number format', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Mule',
            lastname: 'Mabel',
            othername: 'Cory',
            email: 'dan@mabel.com',
            phone: '+234567234',
            passportUrl: 'www.passport.jpg',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal('Wrong phone number format');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/auth/signup', () => {
      it('should test for an empty password field', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Mule',
            lastname: 'Mabel',
            othername: 'Cory',
            email: 'dan@mabel.com',
            phone: '+234-7032567234',
            passportUrl: 'www.passport.pdf',
            password: 'lilian',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal('Wrong Image format');
          if (err) { return done(err); }
          done();
          });
      });
    });
});