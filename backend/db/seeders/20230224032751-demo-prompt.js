'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lessonplans = await queryInterface.bulkInsert('Userprompts', [
      {
        prompt: `Students will be able to explain the causes of the Cold War and its impact on world events.
        Materials: Textbook, handouts, internet access`,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Userprompts', null, {});
  }
};