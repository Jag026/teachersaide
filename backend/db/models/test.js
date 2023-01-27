'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Test extends Model {

    toSafeObject() {
      const { id, userId, testBody } = this; // context will be the User instance
      return { id, userId, testBody };
    }

    static getCurrentTestById(id) {
      return Test.scope("currentLessonplan").findByPk(id);
    }

    static async addTest({ userId, testBody }) {

      const test = await Test.create({
        userId: userId,
        testBody
      });
      return await Test.scope('currentTest').findByPk(test.id);
    }

    static associate(models) {
      // define association here
    }
  };
  
  Test.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      testBody: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 8000]
        }

      },
    },
    {
      sequelize,
      modelName: "Test",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentTest: {
        },
      }
    }
  );

  Test.associate = function (models) {
    Test.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };
  return Test;;
};