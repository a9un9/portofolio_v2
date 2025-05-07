const TentangKami = require('../models/TentangKami');
const User = require('../models/User');

// GET - Ambil data untuk client
exports.getClientTentangKami = async (req, res) => {
  try {
    // Fetch data for client, no need for user_id filtering if public
    const data = await TentangKami.findOne(); // Or another logic if you need specific filtering

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

// GET - Ambil data berdasarkan user_id
exports.getTentangKami = async (req, res) => {
  try {
    const userId = req.user.id; // Ambil user_id dari token atau sesi

    // Mencari data berdasarkan user_id
    const data = await TentangKami.findOne({ where: { user_id: userId } });

    // Jika data tidak ditemukan, kirimkan respons 404
    if (!data) {
      return res.status(404).json({ message: 'Data kosong' });
    }

    // Kirimkan data yang ditemukan
    res.json(data);
  } catch (err) {
    // Jika ada error, kirimkan error dengan status 500
    res.status(500).json({ message: err.message });
  }
};

// POST - Tambah data baru
exports.createTentangKami = async (req, res) => {
  try {
    const { deskripsi } = req.body;
    const user_id = req.user.id; // Ambil user_id dari token

    // Validasi deskripsi
    if (!deskripsi || deskripsi.trim() === '') {
      return res.status(400).json({ message: 'Deskripsi tidak boleh kosong' });
    }

    // Cari user berdasarkan ID
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const created_by = user.username;

    // Simpan ke database
    const data = await TentangKami.create({
      deskripsi,
      user_id,
      created_by,
      created_at: new Date(),
      updated_at: null
    });

    res.status(201).json(data); // status 201 untuk created
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data' });
  }
};
  
// PUT - Update data
exports.updateTentangKami = async (req, res) => {
    try {
      const { deskripsi } = req.body;
      const user_id = req.user.id; // Ambil user_id dari token

      let data = await TentangKami.findOne(); // Mencari data pertama
  
      // Pastikan jika data ada, maka lakukan update
      if (data) {

        // Ambil data user setelah diperbarui
        const user = await User.findOne({
          where: { id: user_id }
        });
  
        const updated_by = user.username;
  
        data = await data.update({ deskripsi, updated_by, updated_at: new Date(), created_at: null }); // Update deskripsi dan updated_by
        return res.json(data); // Kirimkan response data setelah update
      } else {
        return res.status(404).json({ message: 'Data Tentang Kami tidak ditemukan' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };