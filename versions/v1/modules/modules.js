const Router = require("express").Router();

const _roles = require("../../../utils/roles");

const { authenticateAdmin, authenticateClient } = require("./authentications/_middle-ware");

// Router.use('/public', require('./public/index'));

// Router.use('/authentication', require('./authentications/index'));

// Router.use('/super-admin', authenticateAdmin([_roles.ADMIN]), require('./super-admin/index'));

// Router.use('/client-admin', authenticateClient([_roles.ADMIN, _roles.CLIENT_USER]), require('./client-admin/index'));
Router.use('/client-admin', require('./client-admin/index'));

// Router.use('/client-user', authenticateClient([_roles.ADMIN, _roles.CLIENT_USER]), require('./client-user/index'));
Router.use('/client-user', require('./client-user/index'));

module.exports = Router;