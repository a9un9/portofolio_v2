const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import model User untuk relasi

const Pengalaman = sequelize.define('Pengalaman', {
  nama_perusahaan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tempat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  posisi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tahun_masuk: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tahun_keluar: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tipe_pengalaman: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',   // Jika user dihapus, pengalaman terkait juga dihapus
    onUpdate: 'CASCADE',
    allowNull: false,      // Setiap pengalaman harus ada user terkait
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updated_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true, // Kolom ini untuk soft delete
  },
}, {
    tableName: 'pengalamans',  // Nama tabel yang diubah menjadi 'pengalamans'
    timestamps: true,          // Secara otomatis akan menambahkan kolom `created_at` dan `updated_at`
    paranoid: true,            // Enable soft delete menggunakan `deleted_at`
    underscored: true,         // Gunakan snake_case untuk created_at, updated_at, deleted_at
});

Pengalaman.belongsTo(User, { foreignKey: 'user_id' });  // Relasi dengan User

module.exports = Pengalaman;
  
