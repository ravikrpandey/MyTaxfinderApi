const { Sequelize, DataTypes } = require('sequelize');
const { masters, through } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const DashboardAccessControlBusinessConfigMapping = sequelize.define(through.dashboard_access_control_businessconfig_mapping, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    DashboardAccessControlId: {
        type: DataTypes.INTEGER,
    },
    businessUnitId: {
        type: DataTypes.INTEGER,
        defaultValue: null
    }
});

module.exports = DashboardAccessControlBusinessConfigMapping