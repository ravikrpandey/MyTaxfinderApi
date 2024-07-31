const { Sequelize, DataTypes } = require('sequelize');
const { masters } = require('../../__titles');
const sequelize = require('../../../services/mysql/index');

const contactForm = sequelize.define(masters.meta_data_management.contact_form, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Active', 'Inactive'],
        defaultValue: 'Active'
    },
    createdBy: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: masters.super_admins,
        //     key: 'id',
        // },
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: masters.super_admins,
        //     key: 'id',
        // },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = contactForm