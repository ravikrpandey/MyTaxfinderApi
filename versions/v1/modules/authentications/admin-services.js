const Router = require("express").Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { Op } = require("sequelize");

// const { getAdminModels } = require("../../models/getConnection");
const models = require('../../models/index')
const { masters } = require("../../models/__titles");
const { generateOTP } = require("../../../../utils/commons");
const { sendOtpToMail } = require("../../services/node-mailer/index");
const { superAdminPrivateKey } = require('../../../../utils/consts')
const _roles = require('../../../../utils/roles');

const registerConfirm = async (req, res, next) => {
    try {
        const { password, email, otp } = req.body;
        const userRes = await models.superAdmin.findOne({
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
        }
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const token = jsonwebtoken.sign({ email, role: _roles.ADMIN }, superAdminPrivateKey);
        await userRes.update({ password: hash, isVerified: true });
        const updatedUser = await userRes.save();
        res.json({ success: true, data: { token, user: updatedUser } });
    } catch (error) {
        return res.json({ success: false, message: error?.message || "Something went wrong, Try again later!" })
    }
}

const registerSendOtp = async (req, res, next) => {
    try {
        const { email, name } = req.body;
        const _userRes = await models.superAdmin.findOne({ where: { email } });
        if (_userRes) { // user alread there
            return res.json({
                success: false,
                message: "User already registered, Please try to login!"
            })
        };
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 15);
        const otpCode = generateOTP();
        // creating new user
        const _saveNow = await models.superAdmin.create({
            username: name,
            email: email,
            otpExpiration: expirationTime,
            otpCode: otpCode
        });
        await _saveNow.toJSON();
        sendOtpToMail({ email, otp: otpCode }); // asyncronously || need to make it syncronously
        res.json({ success: true, data: {}, message: "OTP sent" })
    } catch (error) {
        return res.json({
            success: false,
            message: error?.message || "Something went wrong!"
        })
    }
}

const login = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        const userRes = await models.superAdmin.findOne({
            where: {
                email
            },
        });

        // check otp expiration
        if (!userRes) {
            return res.json({ success: false, message: 'No user found!' })
        }
        const hashedPW = userRes.getDataValue('password')

        const isPWCorrect = bcrypt.compareSync(password, hashedPW);

        if (!isPWCorrect) {
            return res.json({ success: false, message: "Password not match!" })
        };

        const token = jsonwebtoken.sign({ email, role: _roles.ADMIN }, superAdminPrivateKey);
        return res.json({ success: true, data: { token, user: userRes.toJSON() } })
    } catch (error) {
        return res.json({ success: false, message: error?.message || 'Something went wrong, Please try again later!' })
    }
}

const loggedIn = async (req, res, next) => {
    try {
        const { token } = req.body;
        const { email } = jsonwebtoken.verify(token, superAdminPrivateKey)
        const _res = await models.superAdmin.findOne({
            where: {
                email
            },
            attributes: ['id', 'username', 'email', 'isVerified', 'updatedAt', 'profileLogo']
        });
        return res.status(200).json({ success: true, data: { user: _res.toJSON() } });
    } catch (error) {
        return res.status(401).json({ success: false, message: error?.message || 'Something went wrong!' });
    }
}


Router.post('/logged-in', loggedIn);
Router.post('/login', login);

Router.post('/register-sendotp', registerSendOtp);
Router.post('/register-confirm', registerConfirm);


module.exports = Router;