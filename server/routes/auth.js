const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { register, login, updateUserData, getUserData, getClientUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');
const User = require('../models/User'); // Pastikan model User sudah diimport

// Rute untuk register dan login
router.post('/register', register);
router.post('/login', login);

// Rute untuk mendapatkan data pengguna berdasarkan token
router.get('/user', authenticateToken, getUserData);

// Rute untuk mengupdate data pengguna
router.put('/user', authenticateToken, updateUserData);

router.get('/user/client', getClientUser);

// Set up penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    // Jika folder 'uploads' belum ada, buat folder tersebut
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname); // Tambahkan ekstensi file asli
    cb(null, 'profile_' + uniqueSuffix);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Batasi ukuran file maksimum (5MB)
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('File type must be JPG, JPEG, or PNG'));
    }
  }
});

// Endpoint untuk memperbarui data pengguna dan foto
router.put('/update-foto-profile', authenticateToken, upload.single('photo'), async (req, res) => {
  try {
    const { name, email, username } = req.body;
    const userId = req.user.id;  // ID dari user yang sudah didefinisikan dalam req.user oleh authenticateToken

    // Jika ada file foto, perbarui path foto
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Ambil data user setelah diperbarui
    const user = await User.findOne({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Update data user, termasuk kolom updated_by
    const [updatedCount] = await User.update(
      {
        name,
        email,
        username,
        photo: photoUrl,  // Hanya update foto jika ada file baru
        updated_by: user.username,  // Menambahkan updated_by
      },
      {
        where: { id: userId }
      }
    );

    // Cek apakah user ditemukan dan diperbarui
    if (updatedCount === 0) {
      return res.status(400).json({ message: 'Tidak ada perubahan pada data' });
    }

    // Ambil kembali data user yang sudah diperbarui
    const updatedUser = await User.findOne({
      where: { id: userId }
    });

    // Kembalikan data user yang sudah diperbarui termasuk foto
    res.json({
      message: 'Profil berhasil diperbarui',
      user: updatedUser,
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui profil', error: error.message });
  }
});

module.exports = router;
