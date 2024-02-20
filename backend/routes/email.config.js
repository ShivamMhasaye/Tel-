const nodemailer = require('nodemailer');

// Create a Nodemailer transporter with your SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'sturdybruder@gmail.com',
    pass: 'nluu ntxr jxlh dsbg'
  }
});

module.exports = { transporter };
