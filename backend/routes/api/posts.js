const express = require('express')
const { fetchAiTest } = require('../../utils/fetchAi');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Blogpost } = require('../../db/models');
const { post_secret } = require('../../config/index.js');

const router = express.Router();

// Add Test
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

  router.post(
    '/get-test',
    async (req, res) => {
      const { grade, subject, numberOfQuestions } = req.body;
      const test = await fetchAiTest(`Create a formatted test for a ${grade} grade class over ${subject} that has ${numberOfQuestions} questions.`)
      return res.json({
         test 
    });
    }
  );

  router.get(
    '/get-test',
    async (req, res) => {
      const { testBody} = req.body;
      const test = await fetchAiTest(`Create a formatted test for a 9th grade english class over Hamlet that has 4 writing questions, include an answer key at the end.`)
      return res.json(
        test
      );
    }
  );
  
  //get tests for user
  router.get(
    '/',
    async (req, res) => {
      const { token } = req.cookies;
      const splitJwt = token.split('.');
      const payload = splitJwt[1];
      const strPayload = Buffer.from(payload, 'base64').toString()
      const parsedPayload = JSON.parse(strPayload);
      const userId = parsedPayload["data"].id
      const tests = await Test.findAll({ 
        where: { userId: userId },
        order: [['createdAt', 'DESC']]
      });
      
      return res.json({
        tests
      });
    }
  );

module.exports = router;