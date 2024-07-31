const { Sequelize, DataTypes } = require('sequelize');
const { masters, linked } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const User = sequelize.define(linked.feed_logs, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    file: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    feedId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
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