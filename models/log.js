'use strict';

module.exports = function(sequelize, DataTypes) {
  const log = sequelize.define('log', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID' },
    timeBegin: { type: DataTypes.DATE, field: 'TIME_BEGIN' },
    timeFinish: { type: DataTypes.DATE, field: 'TIME_FINISH' },
    result: { type: DataTypes.STRING, field: 'RESULT' },
    pcip: { type: DataTypes.STRING, field: 'PC_IP' }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(model) {
        log.belongsTo(model.student, { foreignKey: 'fk_student_id' });
        log.belongsTo(model.lab, { foreignKey: 'fk_lab_id' });
      }
    }
  });

  return log;
};
