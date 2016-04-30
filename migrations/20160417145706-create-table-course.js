'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('course', {
      course_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      course_type: { type: Sequelize.STRING, unique: true, allowNull: false },
      course_type_transl: { type: Sequelize.STRING, unique: true, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      percent_for_success: { type: Sequelize.INTEGER, defaultValue: 80 },
      time_for_executing: { type: Sequelize.INTEGER, defaultValue: 15 },
      max_number_of_attemps: { type: Sequelize.INTEGER, defaultValue: 2 },
      number_of_questions: { type: Sequelize.INTEGER, defaultValue: 15 },
      min_cost_to_ladder: { type: Sequelize.INTEGER, defaultValue: 2 },
      permit_to_use_min_rule: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      permit_to_clever_count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('course');
  }
};
