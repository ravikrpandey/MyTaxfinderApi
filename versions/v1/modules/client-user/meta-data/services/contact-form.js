// const superUserModel = require('../../../../models/user');
const Router = require("express").Router();
const { getWhereclause } = require("../../../../../../utils/commons");
const models = require("../../../../models/index");


const contactForm = async (req, res, next) => {
    try {
        const {name, email, subject, message} = req.body;

            const _contactForm = await models.meta_data_management.contactForm.create({name,email,subject,message})

        res.json({ success: true, message: 'Query raised successfully', data: _contactForm });

    } catch (error) {
        res.json({ success: false, message: error?.message || 'something went wrong!' })
    }
};

Router.post('/contact-enquiry', contactForm);

module.exports = Router;