'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('question_log', {
      record_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fk_question_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'question', key: 'question_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      result: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('question_log');
  }
};
