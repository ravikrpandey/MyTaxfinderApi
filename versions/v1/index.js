const Router = require("express").Router();
Router.use('/v1', require('./modules/modules.js'));
module.exports = Router; 