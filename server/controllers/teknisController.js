const Teknis = require('../models/Teknis');

// Ambil semua teknis (bisa dikasih filter user_id kalau mau)
exports.getTeknis = async (req, res) => {
  try {
    const teknis = await Teknis.findAll({
      where: { user_id: req.user.id } // asumsikan pakai auth, ambil teknis user login
    });
    res.json(teknis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tambah teknis baru
exports.createTeknis = async (req, res) => {
  try {
    const { nama_keahlian, level_keahlian } = req.body;
    const teknis = await Teknis.create({
      nama_keahlian,
      level_keahlian,
      user_id: req.user.id,
      created_by: req.user.username, // ambil dari user login
    });
    res.status(201).json(teknis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update teknis
exports.updateTeknis = async (req, res) => {
  try {
    const teknis = await Teknis.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });
    if (!teknis) {
      return res.status(404).json({ message: 'Teknis tidak ditemukan' });
    }

    const { nama_keahlian, level_keahlian } = req.body;

    await teknis.update({
        nama_keahlian,
        level_keahlian,
        updated_by: req.user.username,
    });

    res.json(teknis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete teknis
exports.deleteTeknis = async (req, res) => {
    try {
        const id = req.params.id;
    
        const teknis = await Teknis.findByPk(id);
        if (!teknis || teknis.deleted_at) {
          return res.status(404).json({ message: 'Data kosong' });
        }
    
        await teknis.update({ deleted_at: new Date() });
    
        res.json({ message: 'Data berhasil dihapus (soft delete)' });
    } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus data teknis' });
    }
};
