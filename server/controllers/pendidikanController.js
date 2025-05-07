// controllers/pendidikanController.js
const Pendidikan = require('../models/Pendidikan');  // Assuming you have a model defined

// GET - Ambil data untuk client
exports.getClientPendidikan = async (req, res) => {
  try {
    // Fetch data for client, no need for user_id filtering if public
    
    const data = await Pendidikan.findAll({
      order: [['gelar', 'DESC']] // opsional: untuk mengurutkan data terbaru duluan
    });

    // If no data found, return a 404
    if (!data) {
      return res.status(404).json({ message: 'Data kosong' });
    }

    // Send the data as response
    res.json(data);
  } catch (err) {
    // If an error occurs, send an error response
    res.status(500).json({ message: err.message });
  }
};

// Get all pendidikan with optional limit
exports.getPendidikan = async (req, res) => {
  try {
    const userId = req.user.id; // Ambil user_id dari token atau sesi
    
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    const pendidikan = await Pendidikan.findAll({
      where: { user_id: userId }, // Filter berdasarkan user_id
      limit, // akan diabaikan jika undefined
      order: [['gelar', 'DESC']] // opsional: untuk mengurutkan data terbaru duluan
    });

    // Jika data pendidikan ditemukan, kirimkan dalam response
    res.json(pendidikan);
  } catch (error) {
    console.error('Error fetching pendidikan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pendidikan' });
  }
};

// Create new pendidikan
exports.createPendidikan = async (req, res) => {
  try {
    const { nama_sekolah, jurusan, gelar, tahun_masuk, tahun_lulus } = req.body;

    // Ambil user_id dari token (middleware authenticateToken harus dipasang di rute)
    const user_id = req.user.id;

    const newPendidikan = await Pendidikan.create({
      nama_sekolah,
      jurusan,
      gelar,
      tahun_masuk,
      tahun_lulus,
      user_id: user_id,
      created_by: req.user.username, // Optional: catat siapa yang membuat
    });

    res.status(201).json(newPendidikan);
  } catch (error) {
    console.error('Error creating pendidikan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan data pendidikan' });
  }
};

// Update pendidikan
exports.updatePendidikan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_sekolah, jurusan, gelar, tahun_masuk, tahun_lulus } = req.body;

    // Cari data pendidikan berdasarkan id
    const pendidikan = await Pendidikan.findByPk(id);

    // Jika data tidak ditemukan, kirimkan respons error
    if (!pendidikan) {
      return res.status(404).json({ message: 'Pendidikan tidak ditemukan' });
    }

    // Update properti yang ada
    pendidikan.nama_sekolah = nama_sekolah || pendidikan.nama_sekolah;
    pendidikan.jurusan = jurusan || pendidikan.jurusan;
    pendidikan.gelar = gelar || pendidikan.gelar;
    pendidikan.tahun_masuk = tahun_masuk || pendidikan.tahun_masuk;
    pendidikan.tahun_lulus = tahun_lulus || pendidikan.tahun_lulus;
    pendidikan.updated_by = req.user.username;

    // Simpan perubahan
    await pendidikan.save();

    // Kembalikan respons jika berhasil
    res.json({
      message: 'Data pendidikan berhasil diperbarui',
      data: pendidikan,
    });
  } catch (error) {
    console.error('Error updating pendidikan:', error.message);  // Log pesan error
    res.status(500).json({ message: `Terjadi kesalahan saat memperbarui data pendidikan: ${error.message}` });
  }
};

// Soft delete pendidikan
exports.deletePendidikan = async (req, res) => {
  try {
    const id = req.params.id;

    const pendidikan = await Pendidikan.findByPk(id);
    if (!pendidikan || pendidikan.deleted_at) {
      return res.status(404).json({ message: 'Data kosong' });
    }

    await pendidikan.update({ deleted_at: new Date() });

    res.json({ message: 'Data berhasil dihapus (soft delete)' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus data pendidikan' });
  }
};
