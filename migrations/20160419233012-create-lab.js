'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('lab', {
      lab_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fk_course_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'course', key: 'course_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      name: { type: Sequelize.STRING, allowNull: false },
      number: { type: Sequelize.INTEGER, allowNull: false }
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('lab');
  }
};
