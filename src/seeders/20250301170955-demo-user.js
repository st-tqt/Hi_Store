'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'John Doe1',
        password: '123',
        username: 'faker1',
      },
      {
        email: 'John Doe2',
        password: '123',
        username: 'faker2',
      },
      {
        email: 'John Doe3',
        password: '123',
        username: 'faker3',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
