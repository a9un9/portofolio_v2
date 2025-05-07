const express = require('express');
const router = express.Router();
const pengalamanController = require('../controllers/pengalamanController');
const authenticateToken = require('../middleware/authenticateToken');

// GET semua pengalaman
router.get('/', authenticateToken, pengalamanController.getPengalaman);

// POST pengalaman baru
router.post('/', authenticateToken, pengalamanController.createPengalaman);

// PUT update pengalaman
router.put('/:id', authenticateToken, pengalamanController.updatePengalaman);

// DELETE pengalaman
router.delete('/:id', authenticateToken, pengalamanController.deletePengalaman);

router.get('/client', pengalamanController.getClientPengalaman);

module.exports = router;
