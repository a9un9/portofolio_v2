// migrations/20230426-create-teknis.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tekniss', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nama_keahlian: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      level_keahlian: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Nama tabel User yang digunakan dalam relasi
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deleted_at: {
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tekniss');
  }
};
