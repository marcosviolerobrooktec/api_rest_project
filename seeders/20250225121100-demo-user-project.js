'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserProject', [
      { userId: 1, projectId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, projectId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, projectId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, projectId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, projectId: 4, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, projectId: 1, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserProject', null, {});
  }
};
