const express = require('express')
const { Op } = require('sequelize');
const { fetchAi, fetchAiTeks, fetchAiLab, fetchAiWorksheet } = require('../../utils/fetchAi');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const jwt = require('jsonwebtoken');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Lessonplan } = require('../../db/models');
const { Userprompt } = require('../../db/models');
const { SubmittedPrompts } = require('../../db/models');

const { jwtConfig } = require('../../config');

const { secret, expiresIn } = jwtConfig;

const router = express.Router();

  router.get(
    '/get-submitted-prompts',
    async (req, res) => {
      try {
        const submittedPrompts = await SubmittedPrompts.findAll({ 
            attributes: ['response'],
            where: { 
              id: { [Op.gt]: 22 } 
            },
            order: [['createdAt', 'DESC']]
          });
        return res.json({ submittedPrompts })
      } catch (error) {
      return res.status(500).json({
        error: "Could not fetch worksheet. Please try again later."
      });
    }
    }
  );


module.exports = router;