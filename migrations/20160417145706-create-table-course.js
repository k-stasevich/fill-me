'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('course', {
      course_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      course_type: { type: Sequelize.STRING, unique: true, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false }
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('course');
  }
};
