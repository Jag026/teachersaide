'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const blogposts = await queryInterface.bulkInsert('Blogposts', [
      {
        userId: 1,
        slug: 'why-you-should-use-teachersAIde', 
        title: 'why-you-should-use-teachersAIde',
        description: 'Post over why you should use teachersAide', 
        content: 'A long post on why you should use teachersAide', 
        ogTitle: 'Teachersaide', 
        ogDescription: 'Post over why you should use teachersAide', 
        ogImage: 'www.wwww.com', 
        canonicalUrl: 'https://www.teachersaide.io', 
        author: 'Drew', 
        categories: 'Technology', 
        featuredImage: 'wwww.coolphote.teachersaide.io', 
        tags: 'first post',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Blogposts', null, {});
  }
};
