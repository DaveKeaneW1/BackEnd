const PenggunaService = require("../services/PenggunaService");
const JabatanService = require("../services/JabatanService");

/**
 * GET /pengguna
 *
 */

exports.pengguna = async (req, res) => {
  var list_pengguna = [];
  var list_jabatan = [];

  try {
    const result = await PenggunaService.tampilData(req);
    if (result) list_pengguna = result;

    const result_jabatan = await JabatanService.tampilData();
    if (result_jabatan) list_jabatan = result_jabatan;

  } catch (e) {
    error = e;
  }

  res.render("pengguna.ejs", {
    title: "Daftar Pengguna",
    page: req.originalUrl,
    req,
    res,
    list_pengguna,
    list_jabatan
  });
};

/**
 * GET /pengguna/hapus/:id
 *
 */

exports.hapusPengguna = async (req, res) => {
  const id = req.params.id;

  try {
    await PenggunaService.hapusData(id);
    req.session.alert_message = {
      "message": "Data berhasil dihapus.",
      "type": "success",
    };
  } catch (e) {
    error = e;
    req.session.alert_message = {
      "message": "Gagal menghapus data.",
      "type": "error",
    };
  }

  res.redirect("/pengguna");
};


/**
 * POST /pengguna/tambah
 *
 */

exports.tambah_pengguna = async (req, res) => {
  try {
    const result = await PenggunaService.tambahData(req);
    if (result) {
      req.session.alert_message = {
        "message": "Tambah Data Berhasil.",
        "type": "success",
      };
      res.redirect("/pengguna");
    }
  } catch (e) {
    var message = "Terjadi kesalahan dalam menambah data.";
    if (e) {
      message = e;
    }
    req.session.alert_message = {
      "message": message,
      "type": "error",
    };
    res.redirect("/pengguna");
  }
};


/**
 * POST /pengguna/ubah
 *
 */

exports.ubah_pengguna = async (req, res) => {
  try {
    const result = await PenggunaService.ubahData(req.body.id, req);
    if (result) {
      req.session.alert_message = {
        "message": "Ubah Data Berhasil.",
        "type": "success",
      };
      res.redirect("/pengguna");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }

    req.session.alert_message = {
      "message": message,
      "type": "error",
    };

    res.redirect("/pengguna/" + req.body.id);
  }
};

exports.ambil_data_pengguna = async (req, res) => {
  try {
    const result = await PenggunaService.cariDataBerdasarkanId(req.body.id);
    
    if (result) {
      res.json(result);
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};