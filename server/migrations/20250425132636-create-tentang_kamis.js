'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tentang_kamis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: false, // Deskripsi wajib diisi
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',   // Referensi ke tabel 'users'
          key: 'id',        // Menggunakan kolom 'id' sebagai foreign key
        },
        onDelete: 'SET NULL',   // Jika user dihapus, set user_id menjadi NULL
        onUpdate: 'CASCADE',    // Jika id user diupdate, perbarui user_id
        allowNull: true,        // Kolom ini bisa NULL jika tidak ada user yang terkait
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
    await queryInterface.dropTable('tentang_kamis');
  }
};
