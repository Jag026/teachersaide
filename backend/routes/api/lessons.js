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
    '/get-lessonplan', (req, res, next) => {
      req.setTimeout(90000); // 5 seconds for this route
      next();
    },
    async (req, res) => {
      const { grade, subject } = req.body;
      const lessonplan = await fetchAi(grade, subject)
      return res.json({
         lessonplan 
    });
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