'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
    toSafeObject() {
      const { id, email, token } = this; // context will be the User instance
      return { id, email, token };
    }

  static async addReset({ email, token }) {

      const passwordReset = await PasswordReset.create({
        email,
        token
      });
      return await PasswordReset.scope('currentReset').findByPk(passwordReset.id);
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
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
    modelName: "PasswordReset",
    defaultScope: {
      attributes: {
      }
    },
    scopes: {
      currentReset: {
      },
    }
  }
 );
  return PasswordReset;
};