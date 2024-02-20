const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
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

// Register user
authRouter.post('/register', async (req, res) => {
  try {
    const { username, password, contact_number, email_id } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      contact_number,
      email_id,
    });

    // Send email notification
    await transporter.sendMail({
      from: 'sturdybruder@gmail.com',
      to: email_id,
      subject: 'Registration Successful',
      text: `Hi ${username}, congratulations! You have successfully registered in telemetry Insighthub.`,
    }, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // Handle email sending error
        return res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        // If email sent successfully, respond with the newly created user
        res.json(newUser);
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login user
authRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ user_id: user.user_id, username: user.username }, 'your_secret_key');
    res.json({ token, user });
    console.log(token, "token");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {authRouter};
