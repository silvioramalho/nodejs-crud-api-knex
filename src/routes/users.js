const express = require('express');
const routes = express.Router();
const usersController = require('../controllers/users');

routes.get('/users', usersController.list);
routes.post('/users', usersController.create);
routes.get('/users/:id', usersController.index);
routes.put('/users/:id', usersController.update);
routes.delete('/users/:id', usersController.delete);

module.exports = routes