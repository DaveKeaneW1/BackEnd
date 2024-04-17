const express = require('express');
const router = express.Router();
const penggunaController = require('../controllers/penggunaController');

//untuk autentikasi
const verifyToken = require('../middleware/auth');

/**
 * Routing untuk Halaman Pengaturan
 */

router.get('/', verifyToken, penggunaController.pengguna);
router.get('/hapus/:id', verifyToken, penggunaController.hapusPengguna);
router.post('/tambah', verifyToken, penggunaController.tambah_pengguna);
router.post('/ubah', verifyToken, penggunaController.ubah_pengguna);

router.post('/getubah', verifyToken, penggunaController.ambil_data_pengguna);

module.exports = router;