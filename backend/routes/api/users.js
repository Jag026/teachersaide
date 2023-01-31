const express = require('express')
const nodemailer = require('nodemailer');
const axios = require('axios');
const { google } = require('googleapis');
const { client_secret, client_id, redirect_uri, refresh_token } = require('../../config/index.js');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { first_name, last_name, email, password, username } = req.body;
      const user = await User.signup({ first_name, last_name, email, username, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user
      });
    }
  );

  router.post('/register', (req, res) => {
    const { email } = req.body;

    // create OAuth2 client
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

    // get access token
    oAuth2Client.getAccessToken().then(response => {
        const access_token = response.token;

        // create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'teacher@teacherside.io',
                clientId: client_id,
                clientSecret: client_secret,
                refreshToken: refresh_token,
                accessToken: access_token
            }
        });

        // create email options
        const mailOptions = {
            from: 'teacher@teacherside.io',
            to: email,
            subject: 'Welcome to My App',
            text: 'Thank you for registering! Let us know if you have any questions.'
        };

        // send email
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Error sending email" });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: "Email sent successfully" });
            }
        });
    });
});

router.get('/redirect', async (req, res) => {
  const code = req.query.code;
  const result = await axios.post('https://oauth2.googleapis.com/token', {
    code: code,
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri,
    grant_type: 'authorization_code'
  });

  const accessToken = result.data.access_token;
  // Store the access token for future use.

  res.send(accessToken);
});

router.get('/', (req, res) => {
  const authorizationUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=https://www.googleapis.com/auth/gmail.readonly&response_type=code`;
  res.redirect(authorizationUri);
});

module.exports = router;