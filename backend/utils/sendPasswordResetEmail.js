const sgMail = require('@sendgrid/mail');
const { send_email } = require('../config/index.js');

// Set up SendGrid API key
sgMail.setApiKey(send_email);

// Function to send password reset email
async function sendPasswordResetEmail(email, token) {
  const encodedToken = encodeURIComponent(token);
  const url = `https://www.teachersaide.io/update-password/${encodedToken}`;

  const message = {
    to: email,
    from: 'teacher@teachersaide.io',
    subject: 'Password Reset Request',
    text: `To reset your password, please click on the following link: ${url}`,
    html: `<p>To reset your password, please click on the following link:</p><p><a href=${url}>Reset Password</a></p>`,
  };
  try {
    await sgMail.send(message);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending password reset email to ${email}:`, error);
  }
}

module.exports = { sendPasswordResetEmail };