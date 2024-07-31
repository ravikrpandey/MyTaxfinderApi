const { Sequelize, DataTypes } = require('sequelize');
const { masters, through } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const DashboardAccessControl = sequelize.define(through.dashboard_access_control, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clientUserId: {
        type: DataTypes.INTEGER,
    },
    dashboardId: {
        type: DataTypes.INTEGER,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: masters.client_users,
            key: 'id',
        },
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        references: {
            model: masters.client_users,
            key: 'id',
        },
    },
});

module.exports = DashboardAccessControl