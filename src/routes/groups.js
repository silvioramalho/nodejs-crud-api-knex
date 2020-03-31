const express = require('express');
const routes = express.Router();
const groupsController = require('../controllers/groups');

routes.get('/groups', groupsController.list);
routes.post('/groups', groupsController.create);
routes.get('/groups/:id', groupsController.index);
routes.put('/groups/:id', groupsController.update);
routes.delete('/groups/:id', groupsController.delete);

module.exports = routes