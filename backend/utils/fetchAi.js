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
    prompt: `Create a lesson plan for a ${grade} grade science class, the topic is: ${subject}, minimum 500 tokens`,
    temperature: 0.28,
    max_tokens: 1107,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1.01,
  });
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

  const fetchAiTeks = async(grade, knowledge, skill) => {
    const configuration = new Configuration({
        apiKey: api_key,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create a detailed lesson plan for a ${grade} class over the following: ${skill}.`,
        max_tokens: 2000,
        temperature: .99,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      return response.data.choices[0].text;
    }
module.exports = { fetchAi, fetchAiTest, fetchAiTeks };