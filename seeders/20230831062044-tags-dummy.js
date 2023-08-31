'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Tags', [
    {
      name: 'adventure',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'nature',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'city',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ])
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Tags')
  }
};
