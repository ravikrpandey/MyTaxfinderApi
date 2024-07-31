const Router = require("express").Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { Op, INTEGER } = require("sequelize");

const { generateOTP } = require("../../../../utils/commons");
const { sendOtpToMail } = require("../../services/node-mailer/index");
const { clientAdminPrivateKey } = require('../../../../utils/consts');
const roles = require('../../../../utils/roles');
// const { user_tracking}

// const { getAdminModels } = require('../../models/getConnection');
// const { masters } = require("../../models/__titles");
// const { initializeSequelize } = require('../../services/mariadb/vizabliti-admin-clients/initialize-database');
const models = require("../../models");

const registerConfirm = async (req, res, next) => {
    try {
        const { password, email, otp } = req.body;
        const userRes = await models.clientUsers.findOne({
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
        const token = jsonwebtoken.sign({ email, role: roles.CLIENT_USER }, clientAdminPrivateKey);

        await userRes.update({
            password: hash,
            isVerified: true
        });

        const updatedUser = await userRes.save();
        res.json({
            success: true,
            data: {
                token,
                user: {
                    ...updatedUser.toJSON(),
                    'user-type': 'client-admin'
                }
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error?.message || "Something went wrong, Try again later!" })
    }
}

const registerSendOtp = async (req, res, next) => {
    try {
        const { email, firstName, lastName } = req.body;

        const _userRes = await models.clientUsers.findOne({ where: { email } });
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
        const _saveNow = await models.clientUsers.create({
            firstName,
            lastName,
            email: email,
            otpExpiration: expirationTime,
            otpCode: otpCode
        });
        await _saveNow.toJSON();
        sendOtpToMail({ email, otp: otpCode }); // asyncronously || need to make it syncronously
        res.json({ success: true, data: { otpCode }, message: "OTP sent" })
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

        const userRes = await models.clientUsers.findOne({
            where: {
                email
            },
        });

        if (!userRes) {
            return res.json({ success: false, message: 'No user found!' })
        }
        if(userRes.getDataValue('status') == 'inactive') {
            return res.json({ success: false, message: 'User is inactive!, Please contact Admin' })
        }

        const hashedPW = userRes.getDataValue('password');

        // users sets password for first time
        if (hashedPW === null) {
            const _otp = userRes.getDataValue('otpCode')
            if (_otp != password) {
                return res.json({ success: false, message: "Login Code Not Match!" });
            }

            return res.json({
                success: false,
                message: 'No password set',
                data: {
                    email,
                    operation: 'set-operation'
                }
            })
        }

        const isPWCorrect = bcrypt.compareSync(password, hashedPW);

        if (!isPWCorrect) return res.json({ success: false, message: "Password not match!" })

        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 15);
        const otpCode = generateOTP();
        await userRes.update({
            otpExpiration: expirationTime,
            otpCode: otpCode
        });

        sendOtpToMail({ email, otp: otpCode }); // need to make it syncronously
        await userRes.save();
        return res.json({ success: true, message: 'OTP sent!', data: { otpCode } })
    } catch (error) {
        return res.json({ success: false, message: error?.message || 'Something went wrong, Please try again later!' })
    }
}

const getFinalLogin = async (req, res, next) => {
    try {
        const { otp, email } = req.body;
        const userRes = await models.clientUsers.findOne({
            where: {
                email,
                otpCode: otp,
                otpExpiration: {
                    [Op.gte]: new Date()
                },
            },
        });

        if (!userRes) {
            return res.json({ success: false, message: 'Wrong OTP!' })
        }

        const token = jsonwebtoken.sign({ email, role: roles.CLIENT_USER }, clientAdminPrivateKey);

        if (userRes.getDataValue('createdBy') == null) {
            // client admin  

            // recording login time for client admin
            await models.meta_data_management.login_tracking.create({ user_id: userRes.getDataValue('id') })

            return res.json({
                success: true, data: {
                    token,
                    user: {
                        ...userRes.toJSON(),
                        'user-type': 'client-admin'
                    }
                }
            })
        };

        const clientUser = await models.through.client_role_mapping.findOne({
            where: {
                clientUserId: userRes.getDataValue('id')
            },
            include: [
                {
                    model: models.meta_data_management.user_type,
                    as: 'roleType', // Specify the alias for the association if you have one
                    attributes: ['id', 'title'], // Specify the columns you want to retrieve from the user_type table
                },
            ],

        })
        const companyLogo = await models.clientUsers.findOne({ where: { id: userRes.getDataValue('topParentId'), } });


        console.log('clientUser', userRes.getDataValue('id'))
        // recording login time for client user
        await models.meta_data_management.login_tracking.create({ user_id: userRes.getDataValue('id') })

        return res.json({
            success: true, data: {
                token, user: {
                    ...userRes.toJSON(),
                    companyLogo: companyLogo.getDataValue('companyLogo'),
                    'user-type': clientUser.roleType.toJSON()
                }
            }
        })


    } catch (error) {
        return res.json({ success: false, message: error?.message || 'Something went wrong, Please try again later!' })
    }
}

const loggedIn = async (req, res, next) => {
    try {
        const { token } = req.body;
        const { email } = jsonwebtoken.verify(token, clientAdminPrivateKey)
        const userRes = await models.clientUsers.findOne({
            where: {
                email
            },
            attributes: ['id', 'firstName', 'lastName', 'email', 'contactPreFix', 'contactNo', 'isVerified', 'managementMode', 'kycState', 'companyName', 'companyLogo', 'createdAt', 'updatedAt', 'createdBy', 'profileImage', 'registrationState']
        });
        if (userRes.getDataValue('createdBy') == null) {
            // client admin  
            return res.json({
                success: true, data: {
                    user: {
                        ...userRes.toJSON(),
                        'user-type': 'client-admin'
                    }
                }
            })
        };
        // client user
        const clientUser = await models.through.client_role_mapping.findOne({
            where: {
                clientUserId: userRes.getDataValue('id')
            },
            include: [
                {
                    model: models.meta_data_management.user_type,
                    as: 'roleType', // Specify the alias for the association if you have one
                    attributes: ['id', 'title'], // Specify the columns you want to retrieve from the user_type table
                },
            ],

        })
        return res.status(200).json({
            success: true, data: {
                user: {
                    ...userRes.toJSON(),
                    'user-type': clientUser.roleType.toJSON()
                }
            }
        });
    } catch (error) {
        return res.status(401).json({ success: false, message: error?.message || 'Something went wrong!' });
    }
}

// reset password
const resetSendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userRes = await models.clientUsers.findOne({ where: { email } });
        if (!userRes) {
            return res.json({ success: false, message: 'No user found!' })
        };

        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 15);
        const otpCode = generateOTP();
        await userRes.update({
            otpExpiration: expirationTime,
            otpCode: otpCode
        });

        sendOtpToMail({ email, otp: otpCode }); //  need to make it syncronously
        await userRes.save();
        return res.json({ success: true, message: 'OTP sent!', data: { otpCode } })
    } catch (error) {
        return res.json({ success: false, message: error?.message || 'Something went wrong, Please try again later!' })
    }
}


const resetConfirmPassword = async (req, res, next) => {
    try {
        const { email, otp, password } = req.body;
        const userRes = await models.clientUsers.findOne({
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
        const token = jsonwebtoken.sign({ email, role: roles.CLIENT_USER }, clientAdminPrivateKey);
        await userRes.update({ password: hash });
        const updatedUser = await userRes.save();

        if (userRes.getDataValue('createdBy') == null) {
            // client admin  
            return res.json({
                success: true, data: {
                    token,
                    user: {
                        ...updatedUser.toJSON(),
                        'user-type': 'client-admin'
                    }
                }
            })
        };

        const clientUserRole = await models.through.client_role_mapping.findOne({
            where: {
                clientUserId: userRes.getDataValue('id')
            },
            include: [
                {
                    model: models.meta_data_management.user_type,
                    as: 'roleType', // Specify the alias for the association if you have one
                    attributes: ['id', 'title'], // Specify the columns you want to retrieve from the user_type table
                },
            ]
        });

        return res.json({
            success: true, data: {
                token,
                user: {
                    ...updatedUser.toJSON(),
                    'user-type': clientUserRole.roleType.toJSON()
                }
            }
        })
    } catch (error) {
        return res.json({ success: false, message: error?.message || 'Something went wrong, Please try again later!' })
    }
}

Router.post('/register-sendotp', registerSendOtp);
Router.post('/register-confirm', registerConfirm);

Router.post('/login', login);
Router.post('/confirm-login', getFinalLogin);
Router.post('/logged-in', loggedIn);

Router.post('/reset-sendotp', resetSendOtp);
Router.post('/reset-confirm', resetConfirmPassword);


module.exports = Router;