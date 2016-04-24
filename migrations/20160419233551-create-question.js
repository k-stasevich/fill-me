'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('question', {
      question_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fk_question_type_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'question_type', key: 'type_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      cost: { type: Sequelize.INTEGER, allowNull: false },
      fk_course_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'course', key: 'course_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      adviser: { type: Sequelize.STRING },
      fk_lab_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'lab', key: 'lab_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      answer1: { type: Sequelize.STRING },
      answer2: { type: Sequelize.STRING },
      answer3: { type: Sequelize.STRING },
      answer4: { type: Sequelize.STRING },
      answer5: { type: Sequelize.STRING },
      answer: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('question');
  }
};
