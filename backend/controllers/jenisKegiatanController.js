const JenisKegiatanService = require("../services/JenisKegiatanService");
const JabatanService = require("../services/JabatanService");

/**
 * GET /pengguna
 *
 */

exports.jenisKegiatan = async (req, res) => {
  var list_data = [];
  var list_jabatan = [];

  try {
    const result = await JenisKegiatanService.tampilData();
    if (result) list_data = result;

    const result_jabatan = await JabatanService.tampilData();
    if (result_jabatan) list_jabatan = result_jabatan;

  } catch (e) {
    error = e;
  }

  res.render("jenis_kegiatan.ejs", {
    title: "Daftar Jenis Kegiatan",
    page: req.originalUrl,
    req,
    res,
    list_data,
    list_jabatan
  });
};

/**
 * GET /pengguna/hapus/:id
 *
 */

exports.hapusJenisKegiatan = async (req, res) => {
  const id = req.params.id;

  try {
    await JenisKegiatanService.hapusData(id);
    req.session.alert_message = {
      "message": "Data berhasil dihapus",
      "type": "success",
    };
  } catch (e) {
    error = e;
    req.session.alert_message = {
      "message": "Gagal menghapus data",
      "type": "error",
    };
  }

  res.redirect("/jenis_kegiatan");
};


/**
 * POST /jenis_kegiatan/tambah
 *
 */

exports.tambah_jenis_kegiatan = async (req, res) => {
  try {
    const result = await JenisKegiatanService.tambahData(req);
    if (result) {
      req.session.alert_message = {
        "message": "Tambah Data Berhasil.",
        "type": "success",
      };
      res.redirect("/jenis_kegiatan");
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
    res.redirect("/jenis_kegiatan");
  }
};


/**
 * POST /jenis_kegiatan/ubah
 *
 */

exports.ubah_jenis_kegiatan = async (req, res) => {
  try {
    const result = await JenisKegiatanService.ubahData(req.body.id, req);
    if (result) {
      req.session.alert_message = {
        "message": "Ubah Data Berhasil.",
        "type": "success",
      };
      res.redirect("/jenis_kegiatan");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }

    req.session.alert_message = {
      "message": "Terjadi kesalahan.",
      "type": "error",
    };
    res.redirect("/jenis_kegiatan");
  }
};

exports.ambil_data_jenis_kegiatan = async (req, res) => {
  try {
    const result = await JenisKegiatanService.cariDataBerdasarkanId(req.body.id);
    
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