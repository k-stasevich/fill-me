'use strict';

module.exports = function(sequelize, DataTypes) {
  const course = sequelize.define('course', {
    courseId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'COURSE_ID' },
    courseType: { type: DataTypes.STRING, field: 'COURSE_TYPE' },
    courseTypeTransl: { type: DataTypes.STRING, field: 'COURSE_TYPE_TRANSL'},
    password: { type: DataTypes.STRING, field: 'PASSWORD' },
    percentForSuccess: { type: DataTypes.INTEGER, field: 'PERCENT_FOR_SUCCESS' },
    timeForExecuting: { type: DataTypes.INTEGER, field: 'TIME_FOR_EXECUTING' },
    maxNumberOfAttemps: { type: DataTypes.INTEGER, field: 'MAX_NUMBER_OF_ATTEMPS' },
    minCostToLadder: { type: DataTypes.INTEGER, field: 'MIN_COST_TO_LADDER' },
    permitToUseMinRule: { type: DataTypes.INTEGER, field: 'PERMIT_TO_USE_MIN_RULE' },
    permitToCleverCount: { type: DataTypes.INTEGER, field: 'PERMIT_TO_CLEVER_COUNT' }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(model) {
        course.hasMany(model.lab, { foreignKey: 'fk_course_id' });
      }
    }
  });

  return course;
};
