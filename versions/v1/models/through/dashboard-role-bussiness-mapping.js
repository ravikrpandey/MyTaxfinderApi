const { Sequelize, DataTypes } = require('sequelize');
const { through, masters } = require('../__titles');
const sequelize = require('../../services/mariadb/index');

const DashboardMappingWithBusinessIndustriesAndKpi = sequelize.define(through.dashboard_business_kpi_mapping, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dashboardMappingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: masters.meta_data_management.dashboard,
            key: 'id'
        }
    },
    bussinessFunctionId: {
        type: DataTypes.INTEGER,
    },
    bussinessFunctionName: {
        type: DataTypes.STRING,
    },
    industriesId: {
        type: DataTypes.INTEGER,
    },
    industriesName: {
        type: DataTypes.STRING,
    },
    kpiName: {
        type: DataTypes.STRING,
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