'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lessonplan extends Model {

    toSafeObject() {
      const { id, userId, planBody } = this; // context will be the User instance
      return { id, userId, planBody };
    }

    static getCurrentLessonplanById(id) {
      return Lessonplan.scope("currentLessonplan").findByPk(id);
    }

    static async addLessonplan({ userId, planBody }) {

      const lessonplan = await Lessonplan.create({
        userId: userId,
        planBody
      });
      return await Lessonplan.scope('currentLessonplan').findByPk(lessonplan.id);
    }

    static associate(models) {
      // define association here
    }
  };
  
  Lessonplan.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      planBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Lessonplan",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentLessonplan: {
        },
      }
    }
  );

  Lessonplan.associate = function (models) {
    Lessonplan.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };
  return Lessonplan;;
};