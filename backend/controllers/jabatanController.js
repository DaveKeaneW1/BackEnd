const JabatanService = require("../services/JabatanService");

/**
 * GET /pengguna
 *
 */

exports.jabatan = async (req, res) => {
  var list_jabatan = [];

  try {
    const result_jabatan = await JabatanService.tampilData();
    if (result_jabatan) list_jabatan = result_jabatan;

  } catch (e) {
    error = e;
  }

  res.render("jabatan.ejs", {
    title: "Daftar Jabatan",
    page: req.originalUrl,
    req,
    res,
    list_jabatan
  });
};

/**
 * GET /pengguna/hapus/:id
 *
 */

exports.hapusJabatan = async (req, res) => {
  const id = req.params.id;

  try {
    await JabatanService.hapusData(id);
    req.toastr.success("Data berhasil dihapus", "", {
      timeOut: 2000,
      closeButton: true,
    });
  } catch (e) {
    error = e;
    req.toastr.error("Gagal menghapus data", "", {
      timeOut: 2000,
      closeButton: true,
    });
  }

  res.redirect("/jabatan");
};


/**
 * POST /jabatan/tambah
 *
 */

exports.tambah_jabatan = async (req, res) => {
  try {
    const result = await JabatanService.tambahData(req);
    if (result) {
      req.toastr.success("Tambah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/jabatan");
    }
  } catch (e) {
    var message = "Terjadi kesalahan dalam menambah data.";
    if (e) {
      message = e;
    }
    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/jabatan");
  }
};


/**
 * POST /jabatan/ubah
 *
 */

exports.ubah_jabatan = async (req, res) => {
  try {
    const result = await JabatanService.ubahData(req.body.id, req);
    if (result) {
      req.toastr.success("Ubah Data Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/jabatan");
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }

    req.toastr.error(message, "", {
      timeOut: 2000,
      closeButton: true,
    });
    res.redirect("/jabatan/" + req.body.id);
  }
};

exports.ambil_data_jabatan = async (req, res) => {
  try {
    const result = await JabatanService.cariDataBerdasarkanId(req.body.id);
    
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