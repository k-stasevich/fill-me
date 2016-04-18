'use strict';

module.exports = function(sequelize, DataTypes) {
  const settings = sequelize.define('settings', {
    percent_for_success: { type: DataTypes.INTEGER },
    time_for_executing: { type: DataTypes.INTEGER },
    max_number_of_attemps: { type: DataTypes.INTEGER },
    number_of_questions: { type: DataTypes.INTEGER }
  }, {
    freezeTableName: true
  });

  return settings;
};
