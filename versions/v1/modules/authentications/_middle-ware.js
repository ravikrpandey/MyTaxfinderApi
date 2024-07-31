// const jsonwebtoken = require("jsonwebtoken");
// const { superAdminPrivateKey, clientAdminPrivateKey } = require("../../../../utils/consts");
// const models = require("../../models/index");

// const authenticateAdmin = (allowedRoles) => {
//     // Retrieve the token from the request headers or query parameters 
//     return async (req, res, next) => {
//         const token = req.headers['mytaxfinder-admin-auth'];
//         if (!token) {
//             return res.status(401).json({ success: false, message: 'Token is missing' });
//         }

//         const { email, role } = jsonwebtoken.verify(token, superAdminPrivateKey);

//         if (!allowedRoles.includes(role)) {
//             return res.status(401).json({ success: false, message: 'Role is not defined!' });
//         };



//         if (!email) {
//             return res.status(401).json({ success: false, message: 'Un-verified token!' });
//         };

//         const _res = await models.superAdmin.findOne({ where: { email } });
//         if (!_res) {
//             return;
//         }
//         req.admin = _res.toJSON();

//         // Call the next Admin or route handler
//         next();
//     }
// };

// const authenticateClient = (allowedRoles) => {

//     return async (req, res, next) => {
//         // Retrieve the token from the request headers or query parameters
//         // if ((req.url).startsWith('/paypal/success-payment')) {
//         //     return next();
//         // }

//         const token = req.headers['mytaxfinder-user-auth'];

//         if (!token) return res.status(200).json({ success: false, message: 'Token is missing!' });

//         const { email, role } = jsonwebtoken.verify(token, clientAdminPrivateKey);

//         if (!allowedRoles.includes(role)) return res.status(200).json({ success: false, message: 'You are not authroized!' });

//         if (!email) return res.status(200).json({ success: false, message: 'In Valid Token!' });

//         const userRes = await models.clientUsers.findOne({ where: { email } });

//         if (!userRes) return res.status(200).json({ success: false, message: 'User not found!' });

//         if (userRes.getDataValue('createdBy') == null) {
//             req.user = { ...userRes.toJSON(), token, 'user-type': 'client-admin' }
//             next();
//         } else {
//             const clientUser = await models.through.client_role_mapping.findOne({
//                 where: {
//                     clientUserId: userRes.getDataValue('id')
//                 },
//                 include: [
//                     {
//                         model: models.meta_data_management.user_type,
//                         as: 'roleType', // Specify the alias for the association if you have one
//                         attributes: ['id', 'title'], // Specify the columns you want to retrieve from the user_type table
//                     },
//                 ],

//             })
//             req.user = { ...userRes.toJSON(), token, 'user-type': clientUser?.roleType.toJSON() }
//             next();
//         }
//     };
// }


// module.exports = {
//     authenticateAdmin,
//     authenticateClient
// } 