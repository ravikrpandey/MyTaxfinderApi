const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../services/mariadb/index");
const {masters, through} = require("../__titles");

const FunctionalRoleMapping = sequelize.define(through.functional_role_mapping, {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,   
    },
    businessFunctionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: masters.meta_data_management.business_function,
        //     key: 'id'
        // }
    },
    businessFunctionsName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    functionalRole : {
        type: DataTypes.JSON,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: masters.super_admins,
            key: 'id',
        },
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        references: {
            model: masters.super_admins,
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
    status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: 'ACTIVE'
    } 
});

module.exports = FunctionalRoleMapping