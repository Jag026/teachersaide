const express = require('express')
const { fetchAi } = require('../../utils/fetchAi');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Lessonplan } = require('../../db/models');

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
    '/get-lessonplan',
    async (req, res) => {
      const { grade, subject } = req.body;
      const lessonplan = await fetchAi(JSON.stringify(grade), JSON.stringify(subject))
      return res.json({
        lessonplan
      });
    }
  );

  router.get(
    '/get-lessonplan',
    async (req, res) => {
      const { planBody} = req.body;
      const lessonplan = await fetchAi('A lesson plan for a 5th grade english teacher')
      return res.json(
        JSON.stringify(lessonplan)
      );
    }
  );
module.exports = router;