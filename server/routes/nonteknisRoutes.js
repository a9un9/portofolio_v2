const express = require('express');
const router = express.Router();
const nonteknisController = require('../controllers/nonteknisController');
const authenticateToken = require('../middleware/authenticateToken');

// GET semua nonteknis
router.get('/', authenticateToken, nonteknisController.getNonTeknis);

// POST nonteknis baru
router.post('/', authenticateToken, nonteknisController.createNonTeknis);

// PUT update nonteknis
router.put('/:id', authenticateToken, nonteknisController.updateNonTeknis);

// DELETE nonteknis
router.delete('/:id', authenticateToken, nonteknisController.deleteNonTeknis);

module.exports = router;
