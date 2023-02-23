const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, makeLowercase } = require('../../utils/auth');
const request = require('request');
const sgMail = require('@sendgrid/mail');

const { User } = require('../../db/models');
const { captcha_secret } = require('../../config/index.js');
const { send_email } = require('../../config/index.js');

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

    router.post(
      '/',
      validateSignup,
      async (req, res) => {
        let { recaptchaResponse, first_name, last_name, email, password, username } = req.body;
        const secretKey = captcha_secret;
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
      
        request(verificationUrl, async (error, response, body) => {
          body = JSON.parse(body);
          if (body.success !== undefined && !body.success) {
            return res.status(400).json({ message: 'reCAPTCHA verification failed' });
          }
          
          email = await makeLowercase(email);
          username = await makeLowercase(username);
          console.log(email)
          console.log(username)
          const user = await User.signup({ first_name, last_name, email, username, password });
          
          sgMail.setApiKey(send_email);
          const msg = {
            to: email,
            from: 'teacher@teachersaide.io',
            subject: 'Welcome to Teachersaide.io',
            text: 'Thanks for registering an account! This application is still in beta, so please send us an email at teacher@teachersaide.io if you find a bug or have questions.'
          };
          sgMail.send(msg);

          await setTokenCookie(res, user);
          
          return res.json({
            user
          });
        });
      }
    );
    
    //pass recaptcha_site_key to frontend
    router.get('/site-key', (req, res) => {
      return res.json({ captcha_site_key });
    });

module.exports = router;