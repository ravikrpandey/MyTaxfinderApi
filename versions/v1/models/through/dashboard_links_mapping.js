const { Sequelize, DataTypes } = require('sequelize');
const { through } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const User = sequelize.define(through.dashboard_links_mapping, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    link: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    dashboardId: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = User