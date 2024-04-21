const express = require('express');
const router = express.Router();
const autentikasiController = require('../controllers/autentikasiController');


/**
 * Routing untuk Auntentikasi
 */

router.get('/', autentikasiController.cek_hak_akses);
router.get('/logout', autentikasiController.logout);
router.get('/login', autentikasiController.login);
router.post('/cek-login', autentikasiController.cek_login);

module.exports = router;