'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('students_list', {
      student_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fio: { type: Sequelize.STRING, allowNull: false },
      grout_number: { type: Sequelize.STRING },
      min_cost: { type: Sequelize.INTEGER },
      max_cost: { type: Sequelize.INTEGER }
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('students_list');
  }
};
