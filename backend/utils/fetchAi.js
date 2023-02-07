const { Configuration, OpenAIApi } = require("openai")
const { api_key } = require('../config/index.js');

//fetches lessplan from API endpoint
const fetchAi = async(grade, subject) => {
const configuration = new Configuration({
    apiKey: api_key,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `create a lesson plan for a ${grade} grade class over ${subject}`,
    max_tokens: 875,
    temperature: .78,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  return response.data.choices[0].text;
}

const fetchAiTest = async(grade, subject, numberOfQuestions) => {
  const configuration = new Configuration({
      apiKey: api_key,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Create a formatted test for a ${grade} grade class over the topic of ${subject} and has ${numberOfQuestions} questions, multiple choice and an answer key`,
      max_tokens: 1000,
      temperature: .78,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    return response.data.choices[0].text;
  }

module.exports = { fetchAi, fetchAiTest };