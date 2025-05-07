const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Menyusun rute
const authRoutes = require('./routes/auth');
const tentangKamiRoutes = require('./routes/tentangKamiRoutes');
const pendidikanRoutes = require('./routes/pendidikanRoutes');
const pengalamanRoutes = require('./routes/pengalamanRoutes');
const teknisRoutes = require('./routes/teknisRoutes');
const nonteknisRoutes = require('./routes/nonteknisRoutes');

// Inisialisasi aplikasi Express
const app = express();

// Menggunakan middleware untuk CORS
app.use(cors());

// Menggunakan middleware untuk parse body JSON
app.use(express.json());

// Menyajikan file statis dari folder uploads
app.use('/uploads', express.static('uploads'));

// Menyusun rute aplikasi
app.use('/api/auth', authRoutes); // Rute untuk autentikasi
app.use('/api/tentang-kami', tentangKamiRoutes); // Rute untuk tentang kami
app.use('/api/pendidikan', pendidikanRoutes); // Rute untuk pendidikan
app.use('/api/pengalaman', pengalamanRoutes);
app.use('/api/teknis', teknisRoutes);
app.use('/api/non-teknis', nonteknisRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Untuk keperluan debugging
  res.status(500).json({ message: 'Something went wrong!' }); // Pesan error
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
