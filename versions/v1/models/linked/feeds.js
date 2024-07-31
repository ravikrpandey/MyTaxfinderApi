const { Sequelize, DataTypes } = require('sequelize');
const { masters, linked } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const User = sequelize.define(linked.client_admin_feeds, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dashboardId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    appSourceId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    feedTypeId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    feedValue: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    feedFrequencyId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    feedMethodId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    userTypeId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    managementMode: {
        type: DataTypes.ENUM,
        values: ['production', 'sandbox'],
        defaultValue: 'production'
    },
    isFeedEnable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdById: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
});

module.exports = User