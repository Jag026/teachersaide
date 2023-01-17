const { Configuration, OpenAIApi } = require("openai")
const { api_key } = require('../config/index.js');

const fetchAi = async(grade, subject) => {
const configuration = new Configuration({
    apiKey: api_key,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `A detailed lesson plan for a ${grade} grade ${subject} teacher.`,
    max_tokens: 4000,
    temperature: .5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  return response.data.choices[0].text;
}

module.exports = { fetchAi };