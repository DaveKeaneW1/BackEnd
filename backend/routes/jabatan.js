const express = require('express');
const router = express.Router();
const jabatanController = require('../controllers/jabatanController');

//untuk autentikasi
const verifyTokenAdmin = require('../middleware/authAdmin');

/**
 * Routing untuk Halaman Pengaturan
 */

router.get('/', verifyTokenAdmin, jabatanController.jabatan);
router.get('/hapus/:id', verifyTokenAdmin, jabatanController.hapusJabatan);
router.post('/tambah', verifyTokenAdmin, jabatanController.tambah_jabatan);
router.post('/ubah', verifyTokenAdmin, jabatanController.ubah_jabatan);

router.post('/getubah', verifyTokenAdmin, jabatanController.ambil_data_jabatan);

module.exports = router;