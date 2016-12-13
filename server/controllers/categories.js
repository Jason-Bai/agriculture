const { Category } = require('../models');

module.exports = {
  create(req, res) {
    const { c_name } = req.body;
    return Category
      .create({
        c_name
      })
      .then(cateogry => {
        res.status(200).send(cateogry)
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Category
      .findAll({
        attributes: ['c_name', 'level', 'parentId', 'creatorId', 'isDelete']
      })
      .then(categories => res.status(200).send(categories))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Category
      .findById(req.params.cateogryId, {
        attributes: ['c_name', 'level', 'parentId', 'creatorId', 'isDelete']
      })
      .then(cateogry => {
        if (!cateogry) {
          return res.status(404).send({
            message: 'Category Not Found'
          });
        }
        return res.status(200).send(cateogry);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Category
      .findById(req.params.cateogryId, {
        attributes: ['c_name', 'level', 'parentId', 'creatorId', 'isDelete']
      })
      .then(cateogry => {
        if (!cateogry) {
          return res.status(404).send({
            message: 'Category Not Found'
          });
        }
        return cateogry
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(cateogry))
          .catch(error => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Category
      .findById(req.params.cateogryId)
      .then(cateogry => {
        if (!cateogry) {
          return res.status(404).send({
            message: 'Category Not Found'
          })
        }
        return cateogry
          .destroy()
          .then(() => res.status(200).send({
            message: 'Category deleted successfully.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
