const express = require('express');
const router = express.Router();
const jabatanController = require('../controllers/jabatanController');

//untuk autentikasi
const verifyToken = require('../middleware/auth');

/**
 * Routing untuk Halaman Pengaturan
 */

router.get('/', verifyToken, jabatanController.jabatan);
router.get('/hapus/:id', verifyToken, jabatanController.hapusJabatan);
router.post('/tambah', verifyToken, jabatanController.tambah_jabatan);
router.post('/ubah', verifyToken, jabatanController.ubah_jabatan);

router.post('/getubah', verifyToken, jabatanController.ambil_data_jabatan);

module.exports = router;