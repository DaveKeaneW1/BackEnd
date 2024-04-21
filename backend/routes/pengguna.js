const express = require('express');
const router = express.Router();
const penggunaController = require('../controllers/penggunaController');

//untuk autentikasi
const verifyTokenAdmin = require('../middleware/authAdmin');

/**
 * Routing untuk Halaman Pengaturan
 */

router.get('/', verifyTokenAdmin, penggunaController.pengguna);
router.get('/hapus/:id', verifyTokenAdmin, penggunaController.hapusPengguna);
router.post('/tambah', verifyTokenAdmin, penggunaController.tambah_pengguna);
router.post('/ubah', verifyTokenAdmin, penggunaController.ubah_pengguna);

router.post('/getubah', verifyTokenAdmin, penggunaController.ambil_data_pengguna);

module.exports = router;