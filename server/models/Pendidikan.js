// models/Pendidikan.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan koneksi sudah benar
const User = require('./User'); // Import model User untuk relasi

const Pendidikan = sequelize.define('Pendidikan', {
  nama_sekolah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jurusan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gelar: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tahun_masuk: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  tahun_lulus: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',   // Jika user dihapus, pendidikan terkait juga dihapus
    onUpdate: 'CASCADE',
    allowNull: false,      // Setiap pendidikan harus ada user terkait
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
  tableName: 'pendidikans',  // Nama tabel yang diubah menjadi 'pendidikans'
  timestamps: true,          // Secara otomatis akan menambahkan kolom `created_at` dan `updated_at`
  paranoid: true,            // Enable soft delete menggunakan `deleted_at`
  underscored: true,         // Gunakan snake_case untuk created_at, updated_at, deleted_at
});

Pendidikan.belongsTo(User, { foreignKey: 'user_id' });  // Relasi dengan User

module.exports = Pendidikan;
