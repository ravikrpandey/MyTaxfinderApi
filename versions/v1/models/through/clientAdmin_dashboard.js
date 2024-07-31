const { Sequelize, DataTypes } = require('sequelize');
const { masters, through } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const User = sequelize.define(through.clientAdmin_dashboard, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clientUserId: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    dashboardId: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    prod_reportId: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    prod_workspaceId: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    sand_reportId: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    sand_workspaceId: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = User