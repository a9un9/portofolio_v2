'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pendidikans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_sekolah: {
        type: Sequelize.STRING,
        allowNull: false,  // Nama sekolah wajib diisi
      },
      jurusan: {
        type: Sequelize.STRING,
        allowNull: true,   // Kolom jurusan bisa NULL
      },
      gelar: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tahun_masuk: {
        type: Sequelize.DOUBLE,
        allowNull: true,   // Kolom tahun masuk bisa NULL
      },
      tahun_lulus: {
        type: Sequelize.DOUBLE,
        allowNull: true,   // Kolom tahun lulus bisa NULL
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',   // Referensi ke tabel 'users'
          key: 'id',        // Menggunakan kolom 'id' sebagai foreign key
        },
        onDelete: 'CASCADE',   // Jika user dihapus, pendidikan terkait juga dihapus
        onUpdate: 'CASCADE',    // Jika id user diupdate, perbarui user_id
        allowNull: false,      // Kolom ini tidak boleh NULL
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: true,   // Kolom ini bisa NULL
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true,   // Kolom ini bisa NULL
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
    await queryInterface.dropTable('pendidikans');
  }
};
