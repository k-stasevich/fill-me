'use strict';

module.exports = function(sequelize, DataTypes) {
  const course = sequelize.define('course', {
    courseId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'COURSE_ID' },
    courseType: { type: DataTypes.STRING, field: 'COURSE_TYPE' },
    password: { type: DataTypes.STRING, field: 'PASSWORD' },
    percentForSuccess: { type: DataTypes.INTEGER, field: 'PERCENT_FOR_SUCCESS' },
    timeForExecuting: { type: DataTypes.INTEGER, field: 'TIME_FOR_EXECUTING' },
    maxNumberOfAttemps: { type: DataTypes.INTEGER, field: 'MAX_NUMBER_OF_ATTEMPS' },
    numberOfQuestions: { type: DataTypes.INTEGER, field: 'NUMBER_OF_QUESTIONS' }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(model) {
        course.hasMany(model.lab);
      }
    }
  });

  return course;
};
