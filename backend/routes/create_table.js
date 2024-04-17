const express = require('express');
const router = express.Router();
const createTableController = require('../controllers/createTableController');

// create table baru
router.get('/jabatan', createTableController.jabatan);
router.get('/pengguna', createTableController.pengguna);

module.exports = router;