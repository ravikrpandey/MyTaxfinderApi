const nodemailer = require('nodemailer');
const { sendIdAndPassword } = require('./email-templates');

// Create a transporter object using SMTP transport 

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.office365.com",
    port: 587,
    secure: false, // use TLS
    auth: {
        user: 'donotreply@vizabiliti.com',
        pass: 'Viza#1234'
    }
});

// Function to send an email
function sendOtpToMail({ email, otp }) {
    // Email content
    const mailOptions = {
        from: 'donotreply@vizabiliti.com',
        to: email,
        subject: 'Vizabiliti Login Code',
        text: `Code : ${otp}` // You can also use 'html' for HTML content
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function sendIDandPasswordToMail({ name, email, password }) {
    // Email content
    const mailOptions = {
        from: 'donotreply@vizabiliti.com',
        to: email,
        subject: 'Vizabiliti Role Based Credentials',
        html: sendIdAndPassword(name, email, password)
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function contactFormMailToVisitor({ name, email, password }) {
    // Email content
    const mailOptions = {
        from: 'donotreply@vizabiliti.com',
        to: email,
        subject: 'Vizabiliti Role Based Credentials',
        html: sendIdAndPassword(name, email, password)
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendOtpToMail,
    sendIDandPasswordToMail,
    contactFormMailToVisitor
}

// usage
// sendOtpToMail({ email: 'rahulkashyap@elitemindz.co', otp: '1111111' });