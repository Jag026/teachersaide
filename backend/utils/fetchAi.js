const { Configuration, OpenAIApi } = require("openai")
const { api_key } = require('../config/index.js');

//fetches lessplan from API endpoint//
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

    //fetches lessplan from API endpoint
const fetchAiLab = async(grade, subject) => {
  const configuration = new Configuration({
    apiKey: api_key,
  });
  const openai = new OpenAIApi(configuration);
  
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
          {"role": "system", "content": `You are a ${grade} grade science teacher.`},
          {"role": "user", "content": `Create a detailed lab guide for students to follow. The lab should be over ${subject}, contain an expiriment with steps and a set of questions periodically through the lab. Include a chart for students to fill out. It should be a minimum of 2700 words`},
      ],
  });
  return completion.data.choices[0].message;
}

    //fetches lessplan from API endpoint
    const fetchAiWorksheet = async(grade, subject, topic, worksheetType, selectedOptions) => {
      const configuration = new Configuration({
        apiKey: api_key,
      });
      const openai = new OpenAIApi(configuration);
      
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
              {"role": "system", "content": `You are a ${grade} grade ${subject} teacher.`},
              {"role": "system", "content": `Make all worksheets as close to 3000 words as you can. It's ok to go over that amount if you have tokens to spare.`},
              {"role": "system", "content": `Only return what's on the worksheet, never any extra commentary from you and don't list a word count.`},
              {"role": "user", "content": `Create a detailed ${worksheetType} worksheet that explains ${topic}. The 2nd part of the worksheet should contain ${selectedOptions} if they are specified`},
          ],
      });
      return completion.data.choices[0].message;
    }

module.exports = { fetchAi, fetchAiTest, fetchAiTeks, fetchAiLab, fetchAiWorksheet };