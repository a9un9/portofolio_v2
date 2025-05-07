const express = require('express');
const router = express.Router();
const teknisController = require('../controllers/teknisController');
const authenticateToken = require('../middleware/authenticateToken');

// GET semua teknis
router.get('/', authenticateToken, teknisController.getTeknis);

// POST teknis baru
router.post('/', authenticateToken, teknisController.createTeknis);

// PUT update teknis
router.put('/:id', authenticateToken, teknisController.updateTeknis);

// DELETE teknis
router.delete('/:id', authenticateToken, teknisController.deleteTeknis);

module.exports = router;
