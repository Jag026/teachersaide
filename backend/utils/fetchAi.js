const { Configuration, OpenAIApi } = require("openai")
const api_key = require('../config/index.js');

const fetchAi = async(text) => {
const configuration = new Configuration({
    apiKey: api_key,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${text}`,
    max_tokens: 4000,
    temperature: .5,
  })
  //console.log(response.data.choices[0].text);  
  return response.data.choices[0].text;
}

module.exports = { fetchAi };