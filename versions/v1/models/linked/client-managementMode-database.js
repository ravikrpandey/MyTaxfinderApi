const { Sequelize, DataTypes } = require('sequelize');
const { masters, linked } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const User = sequelize.define(linked.database_perManagementMode, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clientAdminId: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    productionURI: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    sandboxURI: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = User