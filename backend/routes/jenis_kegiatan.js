const express = require('express');
const router = express.Router();
const jenisKegiatanController = require('../controllers/jenisKegiatanController');

//untuk autentikasi
const verifyTokenAdmin = require('../middleware/authAdmin');

/**
 * Routing untuk Halaman Pengaturan
 */

router.get('/', verifyTokenAdmin, jenisKegiatanController.jenisKegiatan);
router.get('/hapus/:id', verifyTokenAdmin, jenisKegiatanController.hapusJenisKegiatan);
router.post('/tambah', verifyTokenAdmin, jenisKegiatanController.tambah_jenis_kegiatan);
router.post('/ubah', verifyTokenAdmin, jenisKegiatanController.ubah_jenis_kegiatan);

router.post('/getubah', verifyTokenAdmin, jenisKegiatanController.ambil_data_jenis_kegiatan);

module.exports = router;