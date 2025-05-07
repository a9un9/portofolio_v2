// routes/pendidikanRoutes.js
const express = require('express');
const router = express.Router();
const pendidikanController = require('../controllers/pendidikanController');
const authenticateToken = require('../middleware/authenticateToken');
const { validatePendidikan } = require('../middleware/validatePendidikan');

// Rute untuk mengambil semua data pendidikan
router.get('/', authenticateToken, pendidikanController.getPendidikan);

// Rute untuk menambah data pendidikan baru
router.post('/', authenticateToken, validatePendidikan, pendidikanController.createPendidikan);

// Rute untuk memperbarui data pendidikan
router.put('/:id', authenticateToken, validatePendidikan, pendidikanController.updatePendidikan);

// Rute untuk menghapus data pendidikan (soft delete)
router.delete('/:id', authenticateToken, pendidikanController.deletePendidikan);

router.get('/client', pendidikanController.getClientPendidikan);


module.exports = router;
