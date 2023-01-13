'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lessonplans = await queryInterface.bulkInsert('Lessonplans', [
      {
        userId: 10,
        planBody: `Lesson Title: The Cold War: Causes and Consequences
        Objective: Students will be able to explain the causes of the Cold War and its impact on world events.
        Materials: Textbook, handouts, internet access
        Introduction (10 minutes):
        * Begin the class by asking students what they know about the Cold War.
        * Provide a brief overview of the Cold War, including the major events and key players.
        Direct Instruction (25 minutes):
        * Use the textbook and handouts to provide more detailed information about the causes of the Cold War, including the differences between the United States and Soviet Union in terms of ideology, economy, and military power.
        * Discuss the key events of the Cold War, including the Cuban Missile Crisis, the Korean War, and the Vietnam War.
        * Explain the role of key leaders such as JFK, Stalin, and Mao Zedong in shaping the Cold War.
        Guided Practice (20 minutes):
        * Divide the class into small groups and assign each group a specific event or leader related to the Cold War.
        * Have each group research their assigned topic and prepare a presentation to share with the class.
        Independent Practice (15 minutes):
        * Assign a writing prompt for students to complete as homework, asking them to explain the impact of the Cold War on world events and how it shaped the world we live in today.
        Closure (10 minutes):
        * Review key concepts and events covered during the lesson.
        * Collect the writing assignments and provide feedback.
        * Encourage students to continue researching and learning more about the Cold War on their own.
        `,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Lessonplans', null, {});
  }
};
