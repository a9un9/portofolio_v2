// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan koneksi sudah benar

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
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
    allowNull: true, // Kolom ini akan digunakan untuk soft delete
  },
}, {
  tableName: 'users',
  timestamps: true,      // Ini akan otomatis membuat kolom `created_at` dan `updated_at`
  paranoid: true,        // Enable soft delete menggunakan `deleted_at`
  underscored: true,     // Gunakan snake_case untuk created_at, updated_at, deleted_at
});

module.exports = User;
