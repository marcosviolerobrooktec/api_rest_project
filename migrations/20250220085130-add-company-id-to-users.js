'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('User', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'companyId');
  }
};
