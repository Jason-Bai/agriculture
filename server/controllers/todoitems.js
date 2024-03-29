const { TodoItem } = require('../models');

module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId
      })
      .then(todoItem => res.status(200).send(todoItem))
      .catch(error => res.status(400).send(error))
  },
  update(req, res) {
    return TodoItem
      .findById(req.params.todoItemId)
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found'
          });
        }
        return todoItem
          .update(req.body, { fields: Object.keys(req.body)})
          .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return TodoItem
      .findById(req.params.todoItemId)
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found'
          });
        }
        return todoItem
          .destroy()
          .then(() => res.status(200).send({
            message: 'destroy TodoItem successfully.'
          }))
          .catch(error => res.status(400).send(errro));
      })
      .catch(error => res.status(400).send(error));
  }
};
