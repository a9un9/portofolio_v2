const NonTeknis = require('../models/NonTeknis');

// Ambil semua non_teknis (bisa dikasih filter user_id kalau mau)
exports.getNonTeknis = async (req, res) => {
  try {
    const non_teknis = await NonTeknis.findAll({
      where: { user_id: req.user.id } // asumsikan pakai auth, ambil non_teknis user login
    });
    res.json(non_teknis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tambah non_teknis baru
exports.createNonTeknis = async (req, res) => {
  try {
    const { nama_keahlian, level_keahlian } = req.body;
    const non_teknis = await NonTeknis.create({
      nama_keahlian,
      level_keahlian,
      user_id: req.user.id,
      created_by: req.user.username, // ambil dari user login
    });
    res.status(201).json(non_teknis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update non_teknis
exports.updateNonTeknis = async (req, res) => {
  try {
    const non_teknis = await NonTeknis.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });
    if (!non_teknis) {
      return res.status(404).json({ message: 'NonTeknis tidak ditemukan' });
    }

    const { nama_keahlian, level_keahlian } = req.body;

    await non_teknis.update({
        nama_keahlian,
        level_keahlian,
        updated_by: req.user.username,
    });

    res.json(non_teknis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete non_teknis
exports.deleteNonTeknis = async (req, res) => {
    try {
        const id = req.params.id;
    
        const non_teknis = await NonTeknis.findByPk(id);
        if (!non_teknis || non_teknis.deleted_at) {
          return res.status(404).json({ message: 'Data kosong' });
        }
    
        await non_teknis.update({ deleted_at: new Date() });
    
        res.json({ message: 'Data berhasil dihapus (soft delete)' });
    } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus data non_teknis' });
    }
};
