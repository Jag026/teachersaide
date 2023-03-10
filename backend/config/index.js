module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE,
    api_key: process.env.API_KEY,
    post_secret: process.env.POST_SECRET,
    captcha_secret: process.env.CAPTCHA_SECRET,
    send_email: process.env.SEND_EMAIL,
    jwtConfig: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  };