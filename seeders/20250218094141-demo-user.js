'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        email: 'example@example.com',
        password: '12345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'anotheruser@example.com',
        password: '2342156143',
        createdAt: new Date(),
        updatedAt: new Date(),
        age: 18,
      },
      {
        email: 'otheruser@example.com',
        password: '2467243623',
        createdAt: new Date(),
        updatedAt: new Date(),
        age: 22,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
