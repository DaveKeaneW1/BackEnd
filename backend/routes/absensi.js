const express = require('express');
const router = express.Router();
const absensiController = require('../controllers/absensiController');

//untuk autentikasi
const verifyToken = require('../middleware/auth');

const upload = require('../middleware/upload');
const verifyTokenAdmin = require('../middleware/authAdmin');
/**
 * Routing untuk Halaman Pengaturan
 */

router.get('/absensi', verifyToken, absensiController.absensi);
router.post('/absensi/tambah', verifyToken, upload.single('foto'), absensiController.tambah_absensi);
router.get('/laporan_absensi', verifyTokenAdmin, absensiController.laporan_absensi);
router.post('/laporan_absensi/cari', verifyTokenAdmin, absensiController.cari_absensi);
router.post('/laporan_absensi/reset', verifyTokenAdmin, absensiController.reset_filter_absensi);


module.exports = router;