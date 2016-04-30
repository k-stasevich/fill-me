'use strict';

module.exports = function(sequelize, DataTypes) {
  const lab = sequelize.define('lab', {
    labId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'LAB_ID' },
    name: { type: DataTypes.STRING, field: 'NAME' },
    number: { type: DataTypes.INTEGER, field: 'NUMBER' }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(model) {
        lab.belongsTo(model.course, { foreignKey: 'fk_course_id' });
      }
    }
  });

  return lab;
};
