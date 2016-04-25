'use strict';

module.exports = function(sequelize, DataTypes) {
  const student = sequelize.define('student', {
    studentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'STUDENT_ID' },
    fio: { type: DataTypes.STRING, field: 'FIO' },
    groupNumber: { type: DataTypes.STRING, field: 'GROUP_NUMBER' },
    minCost: { type: DataTypes.INTEGER, field: 'MIN_COST' },
    maxCost: { type: DataTypes.INTEGER, field: 'MAX_COST' }
  }, {
    freezeTableName: true
  });

  return student;
};
