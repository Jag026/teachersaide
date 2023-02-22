const express = require('express')
const { fetchAiTest } = require('../../utils/fetchAi');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const jwt = require('jsonwebtoken');
const { PasswordReset } = require('../../db/models');
const { sendPasswordResetEmail } = require('../../utils/sendPasswordResetEmail.js');
const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
const { jwtConfig } = require('../../config');

const { secret, expiresIn } = jwtConfig;
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const router = express.Router();

// Define routes
router.post('/request-reset', async (req, res) => {
  try {
    // Get email from request body
    const { email } = req.body;

    // Find user with given email
    const user = await User.findOne({ where: { email } });
    console.log(user.email)

    // If user with given email doesn't exist, return error message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate password reset token and store it in database
    const token = await bcrypt.hash(user.email + Date.now(), 10);
    const passwordReset = await PasswordReset.addReset({
      email: user.email,
      token,
    });

    // Send password reset email to user
    await sendPasswordResetEmail(user.email, token);

    // Return success message
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    // Get token and new password from request body
    const { token, password } = req.body;

    // Find password reset record with given token
    const passwordReset = await PasswordReset.findOne({ where: { token } });

    // If password reset record doesn't exist, return error message
    if (!passwordReset) {
      return res.status(404).json({ message: 'Password reset token invalid or expired' });
    }

    // Check if token has expired (in this example, tokens are considered expired after 24 hours)
    const now = new Date();
    const createdAt = new Date(passwordReset.createdAt);
    const diffInMs = now.getTime() - createdAt.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours > 24) {
      await passwordReset.destroy();
      return res.status(404).json({ message: 'Password reset token invalid or expired' });
    }

    // Find user with email associated with token
    const user = await User.findOne({ where: { email: passwordReset.email } });

    // If user doesn't exist, return error message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password and update user record
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ hashedPassword: hashedPassword });

    // Delete password reset record from database
    await passwordReset.destroy();

    // Generate JWT for user
    const tokenPayload = { id: user.id, email: user.email };
    const jwtSecret = secret;
    const jwtOptions = { expiresIn: '24h' };
    const authToken = jwt.sign(tokenPayload, jwtSecret, jwtOptions);

      // Return JWT to client
      res.json({ token: authToken });
      } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
      }
      });
  
module.exports = router;