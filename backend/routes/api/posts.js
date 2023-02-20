const express = require('express')
const { fetchAiTest } = require('../../utils/fetchAi');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Blogpost } = require('../../db/models');
const { post_secret } = require('../../config/index.js');

const router = express.Router();

// Add Post
router.post(
  '/',
  async (req, res) => {
    const { token } = req.cookies;
    const splitJwt = token.split('.');
    const payload = splitJwt[1];
    const strPayload = Buffer.from(payload, 'base64').toString()
    const parsedPayload = JSON.parse(strPayload);
    const userId = parsedPayload["data"].id
    const {         
        slug, 
        title, 
        description, 
        content, 
        ogTitle, 
        ogDescription, 
        ogImage, 
        canonicalUrl, 
        author, 
        categories,
        featuredImage, 
        tags,
        password } = req.body;

   if (password === post_secret) {
    const blogpost = await Blogpost.addBlogpost({ 
        userId, 
        slug, 
        title, 
        description, 
        content, 
        ogTitle, 
        ogDescription, 
        ogImage, 
        canonicalUrl, 
        author, 
        categories,
        featuredImage, 
        tags
    });
  
    return res.json({
      blogpost
    });
  } else {
    return res.json(
        'error: invalid credentials'
    );
  }
 }
);


  router.get('/latest/:slug', async (req, res) => {
    try {
      const blogpost = await Blogpost.findOne({ where: {slug: req.params.slug }});
      if (!blogpost) {
        return res.status(404).send('Blog post not found');
      }
      res.send(blogpost);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  router.get('/additional-posts', async (req, res) => {
    try {
      const additionalPosts = await Blogpost.findAll({ 
        attributes: ['title', 'canonicalUrl'],
        order: [
          ['createdAt', 'DESC']
        ],
        limit: 6
      });
      res.send(additionalPosts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  
module.exports = router;