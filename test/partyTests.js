/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

/*
import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../server/app';

describe('POST Requests', () => {

    describe ('POST /api/v1/parties', () => {
      it('should create a new party', (done) => {
        request(app)
          .post('/api/v1/parties')
          .send({
            partyName: 'People Congress',
            partyAddress: 'Folawiyo Bankole Street',
            partyLogo: 'www.logo.com/url.jpg',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.be.an('object');
            expect(res.body.data[0].partyName).to.equal('People Congress');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/parties', () => {
      it('should attempt to create an existing party', (done) => {
        request(app)
          .post('/api/v1/parties')
          .send({
            partyName: 'People Congress',
            partyAddress: 'Folawiyo Bankole Street',
            partyLogo: 'www.logo.com/url.jpg',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.equal('Party Name, Address or Logo Already Exists');
          if (err) { return done(err); }
          done();
          });
      });
    });

    describe ('POST /api/v1/parties', () => {
        it('should test for wrong party Name format', (done) => {
          request(app)
            .post('/api/v1/parties')
            .send({
              partyName: '   ',
              partyAddress: 'Folawiyo Bankole Street',
              partyLogo: 'www.logo.com/url.jpg',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.partyName).to.equal('Improper party Name format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should test for wrong party Address format', (done) => {
          request(app)
            .post('/api/v1/parties')
            .send({
              partyName: 'People Congress',
              partyAddress: '   ',
              partyLogo: 'www.logo.com/url.jpg',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.partyAddress).to.equal('Improper party Address format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should test for wrong party Logo format', (done) => {
          request(app)
            .post('/api/v1/parties')
            .send({
              partyName: 'People Congress',
              partyAddress: 'Folawiyo Bankole Street',
              partyLogo: '  ',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error.partyLogo).to.equal('Improper party Logo format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should check if party Name is a string', (done) => {
          request(app)
            .post('/api/v1/parties')
            .send({
              partyName: 'People Congress 999',
              partyAddress: 'Folawiyo Bankole Street',
              partyLogo: 'www.logo.com/url.jpg',
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
            .send({
              partyName: 'People Congress',
              partyAddress: 'Folawiyo Bankole Street',
              partyLogo: 'www.logo.com/url.pdf',
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
            .send({
              partyName: '   ',
              partyAddress: ' ',
              partyLogo: '   ',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.be.an('object');
              expect(res.body.error.partyName).to.equal('Improper party Name format');
              expect(res.body.error.partyAddress).to.equal('Improper party Address format');
              expect(res.body.error.partyLogo).to.equal('Improper party Logo format');
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should test for a wrong address', (done) => {
          request(app)
            .post('/api/v1/parties')
            .send({
              partyName: 'People Congress',
              partyAddress: '89 J',
              partyLogo: 'www.logo.com/url.jpg',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(500);
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal("Cannot read property 'formatted_address' of undefined");
            if (err) { return done(err); }
            done();
            });
        });
      });
});


describe ('GET Requests', () => {

  describe ('GET /api/v1/parties', () => {
    it('should get all parties', (done) => {
      request(app)
        .get('/api/v1/parties')
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
    it('should get one party', (done) => {
      request(app)
        .get('/api/v1/parties/1')
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
        .get('/api/v1/parties/3')
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
        .send({
          partyName: 'Democratic Congress',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].partyName).to.equal('Democratic Congress');
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe ('PATCH /api/v1/parties/:id/name', () => {
    it('should attempt to edit a non-existing party', (done) => {
      request(app)
        .patch('/api/v1/parties/3/name')
        .send({
          partyName: 'Democratic Congress',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Cannot Edit a Non-Existing Party');
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
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0].message).to.equal("Successfully deleted 'Democratic Congress'");
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe ('DELETE /api/v1/parties/:id', () => {
    it('should attempt to delete a non-existing party', (done) => {
      request(app)
        .delete('/api/v1/parties/3')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Party Does Not Exist');
          if (err) { return done(err); }
          done();
        });
    });
});
});
*/