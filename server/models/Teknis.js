// models/Teknis.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan koneksi sudah benar
const User = require('./User'); // Import model User untuk relasi

const Teknis = sequelize.define('Teknis', {
  nama_keahlian: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level_keahlian: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    allowNull: true, // Relasi ke User, bisa NULL jika tidak ada user terkait
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
    allowNull: true, // Kolom ini digunakan untuk soft delete
  },
}, {
  tableName: 'tekniss',
  timestamps: false,      // Secara otomatis akan menambahkan kolom `created_at` dan `updated_at`
  paranoid: true,        // Enable soft delete menggunakan `deleted_at`
  underscored: true,     // Gunakan snake_case untuk created_at, updated_at, deleted_at
});

Teknis.belongsTo(User, { foreignKey: 'user_id' });  // Relasi dengan User

module.exports = Teknis;
