const _ = require('lodash');
const chai = require('chai');
const { expect }= chai;
const should = chai.should();
const supertest = require('supertest');
const port = parseInt(process.env.PORT, 10) || 8000;
const URL = process.env.URL || 'http://localhost:' + port;
const api = supertest(URL);

const { users } = require('../data');

describe('User', () => {

  it('should return init users', (done) => {
    const _users = _.map(users, (user) => {
      return _.pick(user, ['name', 'email', 'role', 'isDelete']);
    });
    api.get('/api/users')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        res.body.should.have.length(3);
        done();
      })
  });

});
