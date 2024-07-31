const { Sequelize, DataTypes } = require('sequelize');
const { masters, linked } = require('../__titles');
const sequelize = require('../../services/mariadb/index');


const User = sequelize.define(linked.kyc_forms, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    forUser: {
        type: DataTypes.INTEGER,
        references: {
            model: masters.client_users,
            key: 'id',
        },
    },
    organisationCountry: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    registeredName: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    contactNumber: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    parentCompany: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    businessEntityType: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    industryEntityType: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    addressLineOne: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    addressLineTwo: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    city: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    state: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    pincode: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    turnOver: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    mailingAddress: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    corporateEMailAddress: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    corporateAddress: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    countryOfIncorporation: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    registrationNumber: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    dateOfIncorporation: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    certificateOfIncorporationNumber: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    registrationNumberAsPerNICCodes: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    panCardNumber: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    gstNumber: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    certNoCommOfBusinessForPublic: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    certificateOfIncorporationFile: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    certNoCommOfBusinessForPublicFile: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    gstCertificateFile: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    panCardFile: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});
module.exports = User