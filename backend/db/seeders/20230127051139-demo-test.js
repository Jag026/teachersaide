'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tests = await queryInterface.bulkInsert('Tests', [
      {
        userId: 1,
        testBody: `
        Grade 5 Science Test
        
        
        
        Multiple Choice
        
        
        
        1. Which of the following is not a type of energy?
        
        a) Mechanical
        
        b) Nuclear
        
        c) Chemical
        
        d) Musical
        
        
        
        2. Which of these is a characteristic of liquids?
        
        a) High viscosity
        
        b) Low density
        
        c) High melting point
        
        d) Low boiling point
        
        
        
        3. What is the primary source of energy for the Earth?
        
        a) Coal
        
        b) Oil
        
        c) Sun
        
        d) Wind
        
        
        
        4. What is the name of the scientific study of living organisms?
        
        a) Chemistry
        
        b) Biology
        
        c) Physics
        
        d) Astronomy
        
        
        
        True/False
        
        
        
        5. All living organisms are made up of cells.
        
        a) True
        
        b) False
        
        
        
        6. Plants need sunlight to produce food.
        
        a) True
        
        b) False
        
        
        
        7. Heat energy is converted to electrical energy.
        
        a) True
        
        b) False
        
        
        
        Matching
        
        
        
        8. Match the following terms with their definitions:
        
        i. Photosynthesis
        
        ii. Chemical reaction
        
        iii. Conduction
        
        
        
        A) The transfer of heat through a material
        
        B) The process of plants using sunlight to create food
        
        C) A process where substances interact to create new substances
        
        
        
        A) i. B) ii. C) iii.
        `,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tests', null, {});
  }
};
