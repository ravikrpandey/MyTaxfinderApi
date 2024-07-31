const { Sequelize, DataTypes } = require('sequelize');
const { masters, through } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const DashboardAccessControlCountryMapping = sequelize.define(through.dashboard_access_control_country_mapping, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    DashboardAccessControlId: {
        type: DataTypes.INTEGER,
    },
    countryId: {
        type: DataTypes.INTEGER,
        defaultValue: null
    }
});

module.exports = DashboardAccessControlCountryMapping