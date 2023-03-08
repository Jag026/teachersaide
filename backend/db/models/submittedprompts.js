'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubmittedPrompts extends Model {
    toSafeObject() {
      const { id, email, token } = this; // context will be the User instance
      return { id, email, token };
    }

  static async addSubmittedPrompt({ prompt, response, userId, token }) {

      const submittedPrompt = await SubmittedPrompts.create({
        prompt, 
        response, 
        userId, 
        promptToken
      });
      return await submittedPrompt.scope('currentSubmittedPrompt').findByPk(submittedPrompt.id);
    }
    
    static associate(models) {
      // define association here
    }
  };
  
  PasswordReset.init(
    {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SubmittedPrompts",
    defaultScope: {
      attributes: {
      }
    },
    scopes: {
      currentSubmittedPrompt: {
      },
    }
  }
 );
  return SubmittedPrompts;
};