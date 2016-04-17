'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('settings', {
      course_id: { type: Sequelize.INTEGER, , autoIncrement: true },
      percent_for_success: { type: Sequelize.INTEGER },
      time_for_executing: { type: Sequelize.INTEGER },
      max_number_of_attemps: { type: Sequelize.INTEGER },
      number_of_questions: { type: Sequelize.INTEGER }
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('settings');
  }
};
