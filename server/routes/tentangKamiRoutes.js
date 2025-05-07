const express = require('express');
const router = express.Router();
const tentangKamiController = require('../controllers/tentangKamiController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, tentangKamiController.getTentangKami);
router.post('/', authenticateToken, tentangKamiController.createTentangKami);
router.put('/', authenticateToken, tentangKamiController.updateTentangKami);

router.get('/client', tentangKamiController.getClientTentangKami);

module.exports = router;
