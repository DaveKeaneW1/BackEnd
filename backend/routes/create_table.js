const express = require('express');
const router = express.Router();
const createTableController = require('../controllers/createTableController');

// create table baru
router.get('/jabatan', createTableController.jabatan);
router.get('/pengguna', createTableController.pengguna);
router.get('/jenis_kegiatan', createTableController.jenis_kegiatan);

module.exports = router;