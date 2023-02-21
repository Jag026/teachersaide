const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { send_email } = require('../../config/index.js');


const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

//User Session
// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

router.get(
  '/send-email',
  restoreUser,
  (req, res) => {
    const email = require('@sendgrid/mail');
    email.setApiKey(send_email);
    
    const msg = {
      to: '',
      from: 'teacher@teachersaide.io',
      subject: 'Welcome to Teachersaide.io!',
      text: 'Thank you for signing up this app, its one of the greatest apps known to mankind.!'
    };
    
    email.send(msg)
      .then(() => console.log('Email sent'))
      .catch((error) => console.error(error));
      return res.json('success')
  }
);

module.exports = router;