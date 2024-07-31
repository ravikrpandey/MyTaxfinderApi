const { Sequelize, DataTypes } = require('sequelize');
const { masters, linked } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const User = sequelize.define(linked.invoices, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    invoiceNo: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    subscriptionStatusId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    dateOfExpiration: {
        type: DataTypes.DATE,
        defaultValue: () => {
            const now = new Date();
            const oneYearLater = new Date(now);
            oneYearLater.setFullYear(now.getFullYear() + 1);
            return oneYearLater;
        }
    },
    forUserId: {
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