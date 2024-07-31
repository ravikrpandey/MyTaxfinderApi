const Router = require("express").Router();

Router.use('/dashboards', require('./services/dashboard'));
Router.use('/industries', require('./services/industries'));
Router.use('/countries', require('./services/countries'));
Router.use('/cities', require('./services/cities'));
Router.use('/business-unit', require('./services/business-unit'));

module.exports = Router;