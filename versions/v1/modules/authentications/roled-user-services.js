const Router = require("express").Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { Op } = require("sequelize");

const { generateOTP } = require("../../../../utils/commons");
const { sendOtpToMail } = require("../../services/node-mailer");
const User = require("../../models/user");
const { privateKeyForRoleUser } = require('../../../../utils/consts');
const roles = require('../../../../utils/roles');
const userDefinedRoles = require("../../models/users/roles");
const KpisModel = require('../configurations/models/kpis');
const { through } = require("../../models/__conts");
const {models} = require('../../models/index')

const login = async (req, res, next) => {
    try {
        const { password, email } = req.body;

        const userRes = await userDefinedRoles.findOne({
            where: { email },
            include: [{
                model: KpisModel,
                through: through.roledUser_kpis
            }],
        })

        // check otp expiration
        if (!userRes) {
            return res.json({ success: false, message: 'No role user found!' })
        }
        // no hasing for role based user
        const hashedPW = userRes.getDataValue('password')

        // const isPWCorrect = bcrypt.compareSync(password, hashedPW);
        const isPWCorrect = (hashedPW === password);

        if (!isPWCorrect) {
            return res.json({ success: false, message: "Password not match!" })
        };

        const token = jsonwebtoken.sign({ email, role: roles.ROLE_USER }, privateKeyForRoleUser);
        console.log('userRes', userRes.toJSON().id)
        // recording the login time
        await models.login_tracking.create({user_id : userRes.toJSON().id})
        return res.json({ success: true, data: { token, user: userRes.toJSON() } })
    } catch (error) {
        return res.json({ success: false, message: error?.message || 'Something went wrong, Please try again later!' })
    }
}

const loggedIn = async (req, res, next) => {
    try {
        const { token } = req.body;
        const { email } = jsonwebtoken.verify(token, privateKeyForRoleUser)
        const userRes = await userDefinedRoles.findOne({
            where: {
                email
            },
            attributes: ['id', 'fullName', 'email', 'isVerified', 'updatedAt', 'functionalArea', 'functionalRole', 'isBlocked', 'managementMode'],
            include: [{
                model: KpisModel,
                through: through.roledUser_kpis
            }],
        });
        return res.status(200).json({ success: true, data: { user: userRes.toJSON() } });
    } catch (error) {
        return res.status(401).json({ success: false, message: error?.message || 'Something went wrong!' });
    }
}

// reset password
const resetSendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userRes = await User.findOne({
            where: {
                email
            },
        });
        if (!userRes) {
            return res.json({ success: false, message: 'No user found!' })
        }
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 15);
        const otpCode = generateOTP();
        await userRes.update({
            otpExpiration: expirationTime,
            otpCode: otpCode
        });
        sendOtpToMail({ email, otp: otpCode }); //  need to make it syncronously
        await userRes.save();
        return res.json({ success: true, message: 'OTP sent!', data: {} })
    } catch (error) {
        return res.json({ success: false, message: error?.message || 'Something went wrong, Please try again later!' })
    }
}

const resetConfirmPassword = async (req, res, next) => {
    try {
        const { email, otp, password } = req.body;
        const userRes = await User.findOne({
            where: {
                email,
                otpCode: otp,
                otpExpiration: {
                    [Op.gte]: new Date()
                },
            },
        });

        // check otp expiration
        if (!userRes) {
            return res.json({ success: false, message: 'OTP Expired!' })
        };

        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const token = jsonwebtoken.sign({ email, role: roles.USER }, privateKeyForRoleUser);
        await userRes.update({ password: hash });
        const updatedUser = await userRes.save();
        res.json({ success: true, data: { token, user: updatedUser.toJSON() } });
    } catch (error) {
        return res.json({ success: false, message: error?.message || 'Something went wrong, Please try again later!' })
    }
}

Router.post('/login', login);
Router.post('/logged-in', loggedIn);

Router.post('/reset-sendotp', resetSendOtp);
Router.post('/reset-confirm', resetConfirmPassword);

module.exports = Router;