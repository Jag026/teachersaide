const express = require('express')
const { fetchAiTest } = require('../../utils/fetchAi');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const router = express.Router();

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
      const { planBody} = req.body;
      const test = await fetchAiTest(`Create a formatted test for a 9th grade english class over Hamlet that has 4 writing questions, include an answer key at the end.`)
      return res.json(
        test
      );
    }
  );
  
module.exports = router;