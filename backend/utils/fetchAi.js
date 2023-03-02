const { Configuration, OpenAIApi } = require("openai")
const { api_key } = require('../config/index.js');

//fetches lessplan from API endpoint
const fetchAi = async(grade, subject) => {
  const configuration = new Configuration({
    apiKey: api_key,
  });
  const openai = new OpenAIApi(configuration);
  
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
          {"role": "system", "content": `You are a ${grade} grade teacher.`},
          {"role": "user", "content": `Write a lesson plan over ${subject}. Be extremely detailed, have the objectives at the top. The plan should be a minimum of 3000 words.`},
      ],
  });
  return completion.data.choices[0].message;
}

const fetchAiTest = async(grade, subject, numberOfQuestions) => {
  const configuration = new Configuration({
      apiKey: api_key,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Create a formatted test for a ${grade} grade class over the topic of ${subject} and has ${numberOfQuestions} questions, multiple choice and an answer key`,
      max_tokens: 3000,
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
        prompt: `Create a detailed lesson plan for a ${grade} grade class, the topic is: ${skill}, minimum 3000 words. Include objectives at the top.`,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      return response.data.choices[0].text;
    }
module.exports = { fetchAi, fetchAiTest, fetchAiTeks };