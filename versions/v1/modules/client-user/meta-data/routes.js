const Router = require("express").Router();

Router.use('/contact-form', require('./services/contact-form'));
// Router.use('/get-menus', require('./services/menus'));

module.exports = Router;