'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('student', {
      student_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fio: { type: Sequelize.STRING, allowNull: false },
      group_number: { type: Sequelize.STRING },
      min_cost: { type: Sequelize.INTEGER, defaultValue: 1 },
      max_cost: { type: Sequelize.INTEGER, defaultValue: 10 },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('student');
  }
};
