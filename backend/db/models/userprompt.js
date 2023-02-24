'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Userprompt extends Model {
    toSafeObject() {
      const { id, prompt, userId } = this; // context will be the User instance
      return { id, prompt, userId };
    }

    static getCurrentUserById(id) {
      return Userprompt.scope("currentUserprompt").findByPk(id);
    }

    static async addUserprompt({ prompt, userId }) {
      const userprompt = await Userprompt.create({
        prompt, 
        userId 
      });
      return await Userprompt.scope('currentUserprompt').findByPk(userprompt.id);
    }
    
    static associate(models) {
      // define association here
    }
  };
  
  Userprompt.init(
    {
      prompt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Userprompt",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUserprompt: {
          attributes: { exclude: ["userId"] }
        },
        addUserprompt: {
          attributes: {}
        }
      }
    }
  );
  return Userprompt;
};