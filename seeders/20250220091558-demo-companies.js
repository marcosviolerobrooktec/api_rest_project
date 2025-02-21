'use strict';

const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFDB33"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Companies', [
      {
        name: 'Company One',
        color: colors[Math.floor(Math.random() * colors.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Company Two',
        color: colors[Math.floor(Math.random() * colors.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Company Three',
        color: colors[Math.floor(Math.random() * colors.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
  }
};
