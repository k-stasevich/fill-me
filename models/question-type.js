'use strict';

module.exports = function(sequelize, DataTypes) {
  const questionType = sequelize.define('questionType', {
    type_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'TYPE_ID' },
    name: { type: DataTypes.STRING, field: 'NAME' }
  }, {
    freezeTableName: true,
    tableName: 'QUESTION_TYPE',
    classMethods: {
      associate: function(model) {

      }
    }
  });

  return questionType;
};
