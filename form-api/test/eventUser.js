let mongoose = require('mongoose');
let EventUser = require('../api/models/userSignedModel');

mongoose.connect('mongodb://localhost/Eventdb');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//czyszczenie bazy
describe('EventUsers', () => {
  before(done => {
    EventUser.deleteMany({}, err => {
      done();
    });
  });

  /* Testowanie GET */
  describe('/GET user', () => {
    it('it should GET empy array from database', done => {
      chai
        .request(server)
        .get('/eventUsers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  let user = {
    firstName: 'Adam',
    lastName: 'Mitrega',
    eventDate: '2019-05-14',
    email: 'amitrega01@gmail.com',
  };
  /* Testowanie POST  */
  describe('/POST user', () => {
    it('it should POST user ', done => {
      chai
        .request(server)
        .post('/eventUsers')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('added').eql(true);
          done();
        });
    });
  });
  describe('/POST user', () => {
    it('it should not POST user with the same data', done => {
      chai
        .request(server)
        .post('/eventUsers')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('added').eql(false);
          done();
        });
    });
  });
});
