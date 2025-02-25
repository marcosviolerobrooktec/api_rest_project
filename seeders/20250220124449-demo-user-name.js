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
        email: 'example4@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 25,
        name: "Example4",
        companyId: companyIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'example5@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 30,
        name: "Example2",
        companyId: companyIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'example6@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 28,
        name: "Example3",
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

