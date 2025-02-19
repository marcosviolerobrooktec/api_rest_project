'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;
    const hashedPasswords = await Promise.all([
      bcrypt.hash('12345678', saltRounds),
      bcrypt.hash('2342156143', saltRounds),
      bcrypt.hash('2467243623', saltRounds)
    ]);
    await queryInterface.bulkInsert('User', [
      {
        email: 'example@example.com',
        password: hashedPasswords[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'anotheruser@example.com',
        password: hashedPasswords[1],
        createdAt: new Date(),
        updatedAt: new Date(),
        age: 18,
      },
      {
        email: 'otheruser@example.com',
        password: hashedPasswords[2],
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
