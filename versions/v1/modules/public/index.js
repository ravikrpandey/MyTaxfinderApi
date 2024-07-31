const Router = require("express").Router();

Router.use('/file', require('./services/blob-files'));

module.exports = Router;