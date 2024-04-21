const express = require('express');
const router = express.Router();
const kegiatanController = require('../controllers/kegiatanController');

//untuk autentikasi
const verifyToken = require('../middleware/auth');
const verifyTokenAdmin = require('../middleware/authAdmin');
/**
 * Routing untuk Halaman Pengaturan
 */

router.get('/kegiatan', verifyToken, kegiatanController.kegiatan);
router.post('/kegiatan/tambah', verifyToken, kegiatanController.tambah_kegiatan);
router.get('/laporan_kegiatan', verifyTokenAdmin, kegiatanController.laporan_kegiatan);
router.post('/laporan_kegiatan/cari', verifyTokenAdmin, kegiatanController.cari_kegiatan);
router.post('/laporan_kegiatan/reset', verifyTokenAdmin, kegiatanController.reset_filter_kegiatan);


module.exports = router;