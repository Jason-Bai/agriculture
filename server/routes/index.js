//const todosController = require('../controllers').todos;
//const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const categoriesController = require('../controllers').categories;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!'
  }));

  // user api
  app.get('/api/users', usersController.list);

  app.post('/api/users', usersController.create);

  app.patch('/api/users', usersController.update);

  app.delete('/api/users', usersController.destroy);

  // category api
  app.get('/api/categories', categoriesController.list);

  app.post('/api/categories', categoriesController.create);

  app.patch('/api/categories', categoriesController.update);

  app.delete('/api/categories', categoriesController.destroy);
}
