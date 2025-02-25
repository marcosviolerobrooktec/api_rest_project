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
        id: 1,
        email: 'user1@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 25,
        name: "User1",
        companyId: companyIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: 'user2@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 30,
        name: "User2",
        companyId: companyIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        email: 'user3@example.com',
        password: await bcrypt.hash('password123', 10),
        age: 28,
        name: "User3",
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
