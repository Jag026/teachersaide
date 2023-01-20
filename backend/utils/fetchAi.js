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
    prompt: `A detailed lesson plan for a ${grade} grade ${subject} teacher that's a minimum of 2500 words.`,
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
      prompt: `Create a formatted test for a ${grade} class over ${subject} that has ${numberOfQuestions}`,
      max_tokens: 875,
      temperature: .78,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    return response.data.choices[0].text;
  }

module.exports = { fetchAi, fetchAiTest };