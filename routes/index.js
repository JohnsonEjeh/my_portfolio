// File name: index.js
// Name: Johnson Ejeh
// StudentID: 300865958
// Date: Septem 27th 2023


const express = require('express');
const app = express.Router();
require('dotenv').config()

// Configure body parsing middleware globally
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/about', (req, res, next) => {
  res.render('about');
});

app.get('/projects', (req, res, next) => {
  res.render('projects');
});

app.get('/services', (req, res, next) => {
  res.render('services');
});

app.get('/contact', (req, res, next) => {
  res.render('contact');
});

app.post('/contact', async (req, res, next) => { 
  try {
    
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const messageFeedback = 'Your message has been sent. Thank you!';

    const nodemailer = require('nodemailer');

    // Create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.S_EMAIL,
        pass: process.env.PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: email,
      to: process.env.R_EMAIL,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    };

    // Use 'await' to ensure the email is sent before responding
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
    res.send('OK');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});


module.exports = app;

