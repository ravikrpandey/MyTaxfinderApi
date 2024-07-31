const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './env' });
const { DB_NAME, DB_USER_NAME, DB_PASSWORD, DB_SERVER_IP, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
    host: DB_SERVER_IP,
    port: DB_PORT,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
