'use strict';

module.exports = function(sequelize, DataTypes) {
  const question = sequelize.define('question', {
    questionId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'QUESTION_ID' },
    cost: { type: DataTypes.INTEGER, allowNull: false, field: 'COST' },
    adviser: { type: DataTypes.STRING, field: 'ADVISER' },
    answer1: { type: DataTypes.STRING, field: 'ANSWER1' },
    answer2: { type: DataTypes.STRING, field: 'ANSWER2' },
    answer3: { type: DataTypes.STRING, field: 'ANSWER3' },
    answer4: { type: DataTypes.STRING, field: 'ANSWER4' },
    answer5: { type: DataTypes.STRING, field: 'ANSWER5' },
    answer: { type: DataTypes.STRING, field: 'ANSWER' }
  }, {
    freezeTableName: true,
    tableName: 'QUESTION',
    classMethods: {
      associate: function(model) {
        question.belongsTo(model.questionType, { foreignKey: 'fk_question_type_id' });
        question.belongsTo(model.course, { foreignKey: 'fk_course_id'});
        question.belongsTo(model.lab, { foreignKey: 'fk_lab_id' });
      }
    }
  });

  return question;
};
