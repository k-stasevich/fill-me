'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('course', {
      course_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      course_type: { type: Sequelize.STRING, unique: true, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      percent_for_success: { type: Sequelize.INTEGER, defaultValue: 80},
      time_for_executing: { type: Sequelize.INTEGER, defaultValue: 15},
      max_number_of_attemps: { type: Sequelize.INTEGER, defaultValue: 2 },
      number_of_questions: { type: Sequelize.INTEGER, defaultValue: 15 },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('course');
  }
};
