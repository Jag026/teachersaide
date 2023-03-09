const express = require('express')
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
        let lessonplan = await fetchAi(grade, subject);
        lessonplan = lessonplan['content'];
        //Code to update the lesson plan to add a worksheet
        // let returnedLessonplan = await fetchAi(grade, subject);
        // let returnedWorksheet = await fetchAiWorksheet(grade, subject, 'acids and bases', 'read along', '[practice problems, unscramble words]');
        // const lessonplan = returnedLessonplan['content'] + '\n' + `\n` + returnedWorksheet['content'];

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
    '/get-worksheet',
    async (req, res) => {
      try {
      const { grade, subject, topic, worksheetType, selectedOptions } = req.body;
      let worksheet = await fetchAiWorksheet(grade, subject, topic, worksheetType, selectedOptions)
      const worksheetContent = await worksheet['content']
      console.log(worksheetContent);
      return res.json({
         worksheetContent
    })
      } catch (error) {
      return res.status(500).json({
        error: "Could not fetch worksheet. Please try again later."
      });
    }
    }
  );



  router.post(
    '/get-db-worksheet', 
    (req, res, next) => {
      req.setTimeout(90000); // 5 seconds for this route
      next();
    },
    async (req, res) => {
      try {

        const userId = 1;

        const { grade, subject, topic, worksheetType, selectedOptions } = req.body;
        const prompt = await `This is the prompt: ${grade}, ${subject}, ${topic}, ${worksheetType}, ${selectedOptions}`;


        // Generate JWT token and store in cookie
        const promptToken = jwt.sign({ prompt }, secret);
        res.cookie('promptToken', promptToken, { httpOnly: true });

        // Store lesson plan in database
        let worksheet = await fetchAiWorksheet(grade, subject, topic, worksheetType, selectedOptions)
        console.log('____________________________')
        console.log(worksheet);
        console.log('____________________________')
        const worksheetContent = await worksheet['content']
        const response = await worksheet;
        const submittedPrompt = await SubmittedPrompts.add({ prompt, response, userId, promptToken });

        // Set cookie with lesson plan ID
        res.cookie('submittedPromptId', submittedPrompt.id.toString(), { httpOnly: true });
  
        // Return success message
        return res.status(200).json({ message: 'Prompt generated successfully.' });
      } catch (error) {
        return res.status(500).json({
          error: "Could not fetch prompt. Please try again later."
        });
      }
    }
  );
  
  router.get(
    '/get-submittedPromptId',
    async (req, res) => {
      try {
        // Retrieve lesson plan ID from cookie
        const submittedPromptId = req.cookies.submittedPromptId;

        // Retrieve lesson plan from database
        const submittedPrompt = await SubmittedPrompts.getCurrentSubmittedPromptsById(submittedPromptId);
        if (!submittedPrompt) {
          return res.status(404).json({ error: 'Requested document could not be found.' });
        }
        
        // Return lesson plan content
        const response = await submittedPrompt
        console.log(response)
        return res.json({ response });
      } catch (error) {
        return res.status(500).json({
          error: "Could not retrieve lesson plan. Please try again later."
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