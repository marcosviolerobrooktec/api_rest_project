'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Projects', [
      { name: 'Proyecto A', description: 'Descripción A', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Proyecto B', description: 'Descripción B', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Proyecto C', description: 'Descripción C', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Proyecto D', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};
