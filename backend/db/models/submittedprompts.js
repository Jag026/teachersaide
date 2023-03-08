'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubmittedPrompts extends Model {
    toSafeObject() {
      const { id, prompt, response, userId, promptToken } = this; // context will be the SubmittedPrompt instance
      return { id, prompt, response, userId, promptToken };
    }

    static getCurrentSubmittedPromptsById(id) {
      return SubmittedPrompts.scope("currentSubmittedPrompts").findByPk(id);
    }


    static async add({ prompt, response, userId, promptToken }) {
      console.log(`${prompt}, ${response}, ${userId}, ${promptToken}`);
      const submittedPrompt = await SubmittedPrompts.create({
        prompt, response, userId, promptToken
      });
      return await SubmittedPrompts.scope('currentSubmittedPrompts').findByPk(submittedPrompt.id);
    }
    
    static associate(models) {
      // define association here
    }
  };
  
  SubmittedPrompts.init(
    {
      prompt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      response: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      promptToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "SubmittedPrompts",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentSubmittedPrompts: {
          attributes: {}
        },
      }
    }
  );
  return SubmittedPrompts;
};