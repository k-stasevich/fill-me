'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('question_type', {
      type_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING }
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('question_type');
  }
};
