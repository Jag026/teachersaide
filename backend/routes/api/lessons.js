const express = require('express')
const { fetchAi, fetchAiTeks } = require('../../utils/fetchAi');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Lessonplan } = require('../../db/models');
const { Userprompt } = require('../../db/models');

const router = express.Router();

// Add Lessonplan
router.post(
    '/',
    async (req, res) => {
      const { token } = req.cookies;
      const splitJwt = token.split('.');
      const payload = splitJwt[1];
      const strPayload = Buffer.from(payload, 'base64').toString()
      const parsedPayload = JSON.parse(strPayload);
      const userId = parsedPayload["data"].id
      const { planBody} = req.body;
      const lessonplan = await Lessonplan.addLessonplan({ userId, planBody });
      return res.json({
        lessonplan
      });
    }
  );

  router.post(
    '/get-lessonplan', (req, res, next) => {
      req.setTimeout(90000); // 5 seconds for this route
      next();
    },
    async (req, res) => {
      try {
        const { grade, subject } = req.body;
        const prompt = `Create a lesson plan for a ${grade} grade science class, the topic is: ${subject}, minimum 500 tokens`
        const userId = 1;
        Userprompt.addUserprompt({ prompt, userId})
        const lessonplan = await fetchAi(grade, subject);
        return res.json({
          lessonplan
        });
      } catch (error) {
        return res.status(500).json({
          error: "Could not fetch lesson plan. Please try again later."
        });
      }
    }
  );

  router.post(
    '/get-lessonplan-tek', (req, res, next) => {
      req.setTimeout(90000); // 5 seconds for this route
      next();
    },
    async (req, res) => {
      try {
        const { grade, knowledge, skill } = req.body;
        const prompt = `Create a detailed lesson plan for a ${grade} class over the following: ${skill}.`
        const userId = 1;
        Userprompt.addUserprompt({ prompt, userId})
        const lessonplan = await fetchAiTeks(grade, knowledge, skill);
        return res.json({
          lessonplan
        });
      } catch (error) {
        return res.status(500).json({
          error: "Could not fetch lesson plan. Please try again later."
        });
      }
    }
  );

  //get lesson plans for user
  router.get(
    '/lessonplans',
    async (req, res) => {
      const { token } = req.cookies;
      const splitJwt = token.split('.');
      const payload = splitJwt[1];
      const strPayload = Buffer.from(payload, 'base64').toString()
      const parsedPayload = JSON.parse(strPayload);
      const userId = parsedPayload["data"].id
      const lessonplans = await Lessonplan.findAll({ 
        where: { userId: userId },
        order: [['createdAt', 'DESC']]
      });
      
      return res.json({
        lessonplans
      });
    }
  );


module.exports = router;