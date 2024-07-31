const Router = require("express").Router();

// admin user auths
Router.use('/admin', require('./admin-services'));

// super users auths 
Router.use('/client-user', require('./super-user-services'));

// super users auths 
// Router.use('/role-user', require('./roled-user-services'));

module.exports = Router;