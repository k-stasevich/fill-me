'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('question_list', {
      question_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fk_type_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'types_list', key: 'type_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      cost: { type: Sequelize.INTEGER, allowNull: false },
      fk_course_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'course', key: 'course_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      adviser: { type: Sequelize.STRING },
      fk_lab_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'lab_list', key: 'lab_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      answer1: { type: Sequelize.STRING },
      answer2: { type: Sequelize.STRING },
      answer3: { type: Sequelize.STRING },
      answer4: { type: Sequelize.STRING },
      answer5: { type: Sequelize.STRING },
      answer: { type: Sequelize.STRING }
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('question_list');
  }
};
