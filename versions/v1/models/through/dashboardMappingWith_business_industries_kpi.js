const { Sequelize, DataTypes } = require('sequelize');
const { through } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const DashboardMappingWithBusinessIndustriesAndKpi = sequelize.define(through.dashboard_businessFunction_industries_kpi_mapping, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bussinessFunctionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bussinessFunctionName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    industriesId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    industriesName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kpiName: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    kpiId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = DashboardMappingWithBusinessIndustriesAndKpi