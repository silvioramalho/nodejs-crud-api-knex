const express = require('express');
const routes = express.Router();
const groupsRoutes = require('./routes/groups')
const usersRoutes = require('./routes/users')

routes.use(groupsRoutes)
routes.use(usersRoutes)

module.exports = routes