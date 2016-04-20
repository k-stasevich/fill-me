'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('lab_list', {
      lab_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fk_course_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'course', key: 'course_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      lab_name: { type: Sequelize.STRING, allowNull: false }
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('lab_list');
  }
};
