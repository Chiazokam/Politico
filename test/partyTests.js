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

  /* ******************************TEST FOR EMPTY PARTIES TABLE**************************** */

  describe ('GET /api/v1/parties', () => {
    it('should not find parties in db', (done) => {
      request(app)
        .get('/api/v1/parties')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('No Parties Found');
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
            name: 'People Congress',
            hqAddress: 'Folawiyo Bankole Street',
            logoUrl: 'www.logo.com/url.jpg',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
            expect(res.body.data[0].name).to.equal('People Congress');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/parties', () => {
      it('should attempt to create a party with a wrong token', (done) => {
        request(app)
          .post('/api/v1/parties')
          .set('token', '253533637722hxhchfhdfhs')
          .send({
            name: 'Developed People',
            hqAddress: 'Surulere',
            logoUrl: 'www.logodeveloped.jpg',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.equal('user unauthenticated');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/parties', () => {
      it('should attempt to create a party without a wrong token', (done) => {
        request(app)
          .post('/api/v1/parties')
          .send({
            name: 'Developed People',
            hqAddress: 'Surulere',
            logoUrl: 'www.logodeveloped.jpg',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.equal('token not provided');
          if (err) { return done(err); }
          done();
          });
      });
    });

    
   describe ('POST /api/v1/parties', () => {
      it('should attempt to create an existing party', (done) => {
        request(app)
          .post('/api/v1/parties')
          .set('token', token)
          .send({
            name: 'People Congress',
            hqAddress: 'Folawiyo Bankole Street',
            logoUrl: 'www.logo.com/url.jpg',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.equal('Party Name or Logo already exists');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/parties', () => {
        it('should test for wrong party Name format', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
            .send({
              name: '   ',
              hqAddress: 'Folawiyo Bankole Street',
              logoUrl: 'www.logo.com/url.jpg',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.name).to.equal('Improper party Name format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should test for wrong party Address format', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
            .send({
              name: 'People Congress',
              hqAddress: '   ',
              logoUrl: 'www.logo.com/url.jpg',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.hqAddress).to.equal('Improper party Address format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should test if address is an integer', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
            .send({
              name: 'Dope party',
              hqAddress: '12',
              logoUrl: 'www.dope.com/url.jpg',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal('Address cannot be an integer');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should test for wrong party Logo format', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
            .send({
              name: 'People Congress',
              hqAddress: 'Folawiyo Bankole Street',
              logoUrl: '  ',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.logoUrl).to.equal('Improper party Logo format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should check if party Name is a string', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
            .send({
              name: 'People Congress 999',
              hqAddress: 'Folawiyo Bankole Street',
              logoUrl: 'www.logo.com/url.jpg',
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.equal('Wrong Party Name format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should check if image format is wrong', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
            .send({
              name: 'People Congress',
              hqAddress: 'Folawiyo Bankole Street',
              logoUrl: 'www.logo.com/url.pdf',
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

      describe ('POST /api/v1/parties', () => {
        it('should test all input for wrong format', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
            .send({
              name: '   ',
              hqAddress: ' ',
              logoUrl: '   ',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.be.an('object');
              expect(res.body.error.name).to.equal('Improper party Name format');
              expect(res.body.error.hqAddress).to.equal('Improper party Address format');
              expect(res.body.error.logoUrl).to.equal('Improper party Logo format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should test for a wrong address', (done) => {
          request(app)
            .post('/api/v1/parties')
            .set('token', token)
            .send({
              name: 'Good People',
              hqAddress: 'Bode Thomas',
              logoUrl: 'www.logogood.com/url.jpg',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal('Put In a Correct Address Please');
            if (err) { return done(err); }
            done();
            });
        });
      });


describe ('GET Requests', () => {

  describe ('GET /api/v1/parties', () => {
    it('should get all parties', (done) => {
      request(app)
        .get('/api/v1/parties')
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
});
 
  describe ('GET /api/v1/parties/:id', () => {
    it('should get one party', (done) => {
      request(app)
        .get('/api/v1/parties/1')
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

  describe ('GET /api/v1/parties/:id', () => {
    it('should get a non-existing party', (done) => {
      request(app)
        .get('/api/v1/parties/5')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Party Not Found');
          if (err) { return done(err); }
          done();
        });
    });
  });
}); 

describe ('PATCH Requests', () => {

  describe ('PATCH /api/v1/parties/:id/name', () => {
    it('should edit the name of a party', (done) => {
      request(app)
        .patch('/api/v1/parties/1/name')
        .set('token', token)
        .send({
          name: 'Democratic Congress',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].name).to.equal('Democratic Congress');
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe ('PATCH /api/v1/parties/:id/name', () => {
    it('should attempt to edit a non-existing party', (done) => {
      request(app)
        .patch('/api/v1/parties/8/name')
        .set('token', token)
        .send({
          name: 'Democratic Congress',
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
});


describe ('DELETE Requests', () => {

  describe ('DELETE /api/v1/parties/:id', () => {
    it('should delete a party', (done) => {
      request(app)
        .delete('/api/v1/parties/1')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].message).to.equal('Party Successfully deleted');
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe ('DELETE /api/v1/parties/:id', () => {
    it('should attempt to delete a non-existing party', (done) => {
      request(app)
        .delete('/api/v1/parties/8')
        .set('token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Party Not Found');
          if (err) { return done(err); }
          done();
        });
    });
});
}); 
