const express = require('express')
const { fetchAiTest } = require('../../utils/fetchAi');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { PasswordReset } = require('../../db/models');
const { User } = require('../../db/models');

const crypto = require('crypto');
const { send_email } = require('../../config/index.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(send_email);

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const router = express.Router();

const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: 'teacher@teachersaide.io',
    subject,
    text,
  };

  await sgMail.send(msg);
};

// Route to generate reset password token and send email
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    console.log(email)
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate token
    const token = crypto.randomBytes(20).toString('hex');

    // Store token in database
    await PasswordReset.create({ email, token, timestamp: new Date().getTime() });

    // Send email with token
    await sendEmail(user.email, 'Reset your password', `Click the link to reset your password: http://localhost:3000/api/resetpassword/reset-password/${token}`);
    
    res.json({ message: 'Reset password email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update password with token
router.post('/update-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const passwordReset = await PasswordReset.findOne({ where: { token } });

    if (!passwordReset || passwordReset.isExpired()) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findOne({ where: { email: passwordReset.email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's password
    user.hashedPassword
    await user.update({ password });

    // Delete token from database
    await passwordReset.destroy();

    res.json({ message: 'Password updated' });
        } catch (error) {
            console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
    });

  
module.exports = router;