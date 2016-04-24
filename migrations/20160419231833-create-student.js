'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('student', {
      student_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fio: { type: Sequelize.STRING, allowNull: false },
      grout_number: { type: Sequelize.STRING },
      min_cost: { type: Sequelize.INTEGER },
      max_cost: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('student');
  }
};
