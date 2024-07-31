const { Sequelize, DataTypes } = require('sequelize');
const { masters, through } = require('../__titles');
const sequelize = require("../../services/mariadb/index");


const BusinessUnitFunction = sequelize.define(through.business_unit_function, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    businessUnitId: {
        type: DataTypes.INTEGER,
    },
    businessUnitFunctionId: {
        type: DataTypes.INTEGER,
    },
    businessUnitFunctionName: {
        type: DataTypes.STRING,
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
module.exports = BusinessUnitFunction;