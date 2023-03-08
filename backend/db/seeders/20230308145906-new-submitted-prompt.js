'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const submittedPrompts = await queryInterface.bulkInsert('SubmittedPrompts', [
      {
        prompt: 'Create a worksheet over acids and bases reactions in chemistry.',
        response: 'Acid and base reactions are a response of adding two substances with different phs.........',
        userId: 12,
        promptToken: 'agarhw4tqwhrwethq4t24rehqw4t2q4yq3yhw4hjnts',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SubmittedPrompts', null, {});
  }
};