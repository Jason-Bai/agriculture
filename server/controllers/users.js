const { User } = require('../models');

module.exports = {
  create(req, res) {
    const { name, email, pass } = req.body;
    return User
      .create({
        name,
        email,
        pass
      })
      .then(user => {
        const _user = user.toJSON()
        delete _user.pass;
        res.status(200).send(_user)
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User
      .findAll({
        attributes: ['name', 'email', 'role', 'isDelete']
      })
      .then(users => res.status(200).send(users))
      .catch(error => {
        console.log(error);
        res.status(400).send(error)
      });
  },
  retrieve(req, res) {
    return User
      .findById(req.params.userId, {
        attributes: ['name', 'email', 'role', 'isDelete']
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return User
      .findById(req.params.userId, {
        attributes: ['name', 'email', 'role', 'isDelete']
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        return user
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          })
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            message: 'User deleted successfully.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
