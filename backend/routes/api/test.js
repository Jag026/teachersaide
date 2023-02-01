const express = require('express')
const { fetchAiTest } = require('../../utils/fetchAi');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Test } = require('../../db/models');

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
    const { testBody } = req.body;
    const test = await Test.addTest({ userId, testBody });
    
    return res.json({
      test
    });
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