const { masters, linked, through } = require('../../models/__titles');
const { superAdmin, clientUsers, kyc_forms,
  through: throughModel, meta_data_management, link: linkedModels } = require('../../models/index')

// on first run want to alter columns in db
module.exports = () => {

  // superAdmin.hasMany(meta_data_management.contactForm, { foreignKey: 'createdBy' });
  // superAdmin.hasMany(meta_data_management.contactForm, { foreignKey: 'updatedBy' });
  

};