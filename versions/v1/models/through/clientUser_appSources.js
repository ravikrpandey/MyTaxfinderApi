const { Sequelize, DataTypes } = require('sequelize');
const { masters, through } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const User = sequelize.define(through.clientUser_appSources_assigns, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clientUserId: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    appSourcesId: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = User