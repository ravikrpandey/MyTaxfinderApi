const Router = require("express").Router();

Router.use('/meta-data', require('./meta-data/routes'));
// Router.use('/meta-config', require('./meta-config/routes'));
// Router.use('/profile', require('./profile/routes'));
// Router.use('/power-bi', require('./power-bi/routes'));
// Router.use('/react-dashboard', require('./react-dashboard/routes'));

module.exports = Router;