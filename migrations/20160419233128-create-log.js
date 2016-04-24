'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('log', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fk_student_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'student', key: 'student_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      time_begin: { type: Sequelize.DATE },
      time_finish: { type: Sequelize.DATE },
      result: { type: Sequelize.STRING },
      fk_lab_id: {
        type: Sequelize.INTEGER, allowNull: false, references: { model: 'lab', key: 'lab_id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
      },
      pc_ip: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('log');
  }
};
