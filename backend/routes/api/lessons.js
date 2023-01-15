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
      const lessonplan = await fetchAi('A lessonplan for a 5th grade science teacher.')
      return res.json({
        lessonplan
      });
    }
  );
module.exports = router;