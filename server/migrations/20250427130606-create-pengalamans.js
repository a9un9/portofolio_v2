'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pengalamans', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nama_perusahaan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tempat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      posisi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tahun_masuk: {
        allowNull: false,
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      tahun_keluar: {
        allowNull: false,
        type: 'TIMESTAMP WITHOUT TIME ZONE',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      tipe_pengalaman: {
        type: Sequelize.INTEGER,  // Change from DataTypes.INTEGER to Sequelize.INTEGER
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
        // kalau mau tambah relasi foreign key ke tabel users tinggal tambahin:
        // references: { model: 'users', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pengalamans');
  }
};
