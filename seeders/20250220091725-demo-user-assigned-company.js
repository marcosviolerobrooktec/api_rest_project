'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const companies = await queryInterface.sequelize.query(
      `SELECT id FROM "Companies";`
    );
    const companyIds = companies[0].map(company => company.id);

    await queryInterface.bulkInsert('User', [
      {
        email: 'example1@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 25,
        companyId: companyIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'example2@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 30,
        companyId: companyIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'example3@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 28,
        companyId: companyIds[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
