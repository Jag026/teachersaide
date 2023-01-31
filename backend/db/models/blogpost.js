'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blogpost extends Model {

    toSafeObject() {
      const { id, userId, slug, title, description, content, ogTitle, ogDescription, ogImage, canonicalUrl, author, categories, featuredImage, tags } = this; // context will be the User instance
      return { id, userId, slug, title, description, content, ogTitle, ogDescription, ogImage, canonicalUrl, author, categories, featuredImage, tags };
    }

    static getCurrentBlogpostById(id) {
      return Blogpost.scope("currentBlogpost").findByPk(id);
    }

    static async addBlogpost({ userId, slug, title, description, content, ogTitle, ogDescription, ogImage, canonicalUrl, author, categories, featuredImage, tags }) {

      const blogpost = await Blogpost.create({
        userId: userId,
        slug, 
        title, 
        description, 
        content, 
        ogTitle, 
        ogDescription, 
        ogImage, 
        canonicalUrl, 
        author, 
        categories,
        featuredImage, 
        tags
      });
      return await Blogpost.scope('currentBlogpost').findByPk(blogpost.id);
    }

    static associate(models) {
      // define association here
    }
  };
  
  Blogpost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ogTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ogDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ogImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      canonicalUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      featuredImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Blogpost",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentBlogpost: {
        },
      }
    }
  );

  Blogpost.associate = function (models) {
    Blogpost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };
  return Blogpost;;
};