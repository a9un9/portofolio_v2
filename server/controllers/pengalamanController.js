const Pengalaman = require('../models/Pengalaman');

// GET - Ambil data untuk client
exports.getClientPengalaman = async (req, res) => {
  try {
    // Fetch data for client, no need for user_id filtering if public
    
    const data = await Pengalaman.findAll({
      order: [['tahun_masuk', 'DESC']] // opsional: untuk mengurutkan data terbaru duluan
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

// Ambil semua pengalaman (bisa dikasih filter user_id kalau mau)
exports.getPengalaman = async (req, res) => {
  try {
    const pengalaman = await Pengalaman.findAll({
      where: { user_id: req.user.id }, // asumsikan pakai auth, ambil pengalaman user login
      order: [['id', 'DESC']]    });
    res.json(pengalaman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tambah pengalaman baru
exports.createPengalaman = async (req, res) => {
  try {
    const { nama_perusahaan, tempat, posisi, tahun_masuk, tahun_keluar, deskripsi, tipe_pengalaman } = req.body;
    const pengalaman = await Pengalaman.create({
      nama_perusahaan,
      tempat,
      posisi,
      tahun_masuk,
      tahun_keluar: tahun_keluar || null, // Jika tidak ada nilai tahun_keluar, set null
      deskripsi,
      tipe_pengalaman,
      user_id: req.user.id,
      created_by: req.user.username, // ambil dari user login
    });
    res.status(201).json(pengalaman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pengalaman
exports.updatePengalaman = async (req, res) => {
  try {
    const pengalaman = await Pengalaman.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });
    if (!pengalaman) {
      return res.status(404).json({ message: 'Pengalaman tidak ditemukan' });
    }

    const { nama_perusahaan, tempat, posisi, tahun_masuk, tahun_keluar, deskripsi, tipe_pengalaman } = req.body;

    await pengalaman.update({
      nama_perusahaan,
      tempat,
      posisi,
      tahun_masuk,
      tahun_keluar,
      deskripsi,
      tipe_pengalaman,
      updated_by: req.user.username,
    });

    res.json(pengalaman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete pengalaman
exports.deletePengalaman = async (req, res) => {
    try {
        const id = req.params.id;
    
        const pengalaman = await Pengalaman.findByPk(id);
        if (!pengalaman || pengalaman.deleted_at) {
          return res.status(404).json({ message: 'Data kosong' });
        }
    
        await pengalaman.update({ deleted_at: new Date() });
    
        res.json({ message: 'Data berhasil dihapus (soft delete)' });
    } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus data pengalaman' });
    }
};
