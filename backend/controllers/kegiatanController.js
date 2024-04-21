const KegiatanService = require("../services/KegiatanService");
const JenisKegiatanService = require("../services/JenisKegiatanService");
const moment = require("moment");
/**
 * GET /kegiatan
 *
 */

exports.kegiatan = async (req, res) => {
  var list_data = [];
  var list_jenis_kegiatan = [];

  try {
    var id_pengguna = "";
    var jabatan = "";

    if (req && req.cookies) {
      if(req.cookies.id_pengguna){
        id_pengguna = req.cookies.id_pengguna;
      }

      if(req.cookies.jabatan_id){
        jabatan = req.cookies.jabatan_id;
      }
      
    }

    const result = await KegiatanService.tampilData({ id_pengguna });
    if (result) list_data = result;

    const result_kegiatan = await JenisKegiatanService.tampilData({jabatan});
    if (result_kegiatan) list_jenis_kegiatan = result_kegiatan;
  } catch (e) {
    error = e;
  }

  res.render("kegiatan.ejs", {
    title: "Daftar Kegiatan",
    page: req.originalUrl,
    req,
    res,
    list_data,
    list_jenis_kegiatan
  });
};

/**
 * POST /jabatan/tambah
 *
 */

exports.tambah_kegiatan = async (req, res) => {
  try {
    const result = await KegiatanService.tambahData(req);
    if (result) {
      req.session.alert_message = {
        message: "Tambah Data Berhasil.",
        type: "success",
      };
      res.redirect("/kegiatan");
    }
  } catch (e) {
    var message = "Terjadi kesalahan dalam menambah data.";
    if (e) {
      message = e;
    }

    req.session.alert_message = {
      message: message,
      type: "error",
    };
    res.redirect("/kegiatan");
  }
};

/**
 * GET /kegiatan/laporan
 *
 */

exports.laporan_kegiatan = async (req, res) => {
  var list_data = [];

  var tgl_awal_default = moment().format();
  var tgl_akhir_default = moment().add(7, "days").format();

  var tgl_awal = tgl_awal_default;
  var tgl_akhir = tgl_akhir_default;

  if (req.cookies) {
    if (req.cookies.filter_kegiatan) {
      var filter_kegiatan = req.cookies.filter_kegiatan;

      if (filter_kegiatan.tgl_awal) {
        tgl_awal = moment(filter_kegiatan.tgl_awal, "YYYY-MM-DD").format();
      }

      if (filter_kegiatan.tgl_akhir) {
        tgl_akhir = moment(filter_kegiatan.tgl_akhir, "YYYY-MM-DD").format();
      }
    }
  }

  if (moment(tgl_akhir).isBefore(tgl_awal)) {
    tgl_awal = tgl_awal_default;
    tgl_akhir = tgl_akhir_default;
  }

  try {
    const result = await KegiatanService.tampilData({
      tgl_awal,
      tgl_akhir,
    });
    if (result) list_data = result;
  } catch (e) {
    error = e;
  }

  res.render("laporan_kegiatan.ejs", {
    title: "Laporan Kegiatan",
    page: req.originalUrl,
    req,
    res,
    list_data,
    dir: "../",
    tgl_awal: moment(tgl_awal).format("YYYY-MM-DD"),
    tgl_akhir: moment(tgl_akhir).format("YYYY-MM-DD"),
  });
};

exports.cari_kegiatan = async (req, res) => {
  const { tgl_awal, tgl_akhir } = req.body;

  var invalidDate = false;

  if (tgl_awal && tgl_akhir) {
    if (
      moment(moment(tgl_akhir, "YYYY-MM-DD").format()).isBefore(
        moment(tgl_awal, "YYYY-MM-DD").format()
      )
    ) {
      invalidDate = true;
      req.toastr.error("Tanggal akhir tidak boleh sebelum tanggal mulai.", "", {
        timeOut: 2000,
        closeButton: true,
      });
    }
  }

  if (tgl_awal && !invalidDate) {
    res.cookie("filter_kegiatan", {
      tgl_awal,
      tgl_akhir,
    });
  }
  res.redirect("/laporan_kegiatan");
};

exports.reset_filter_kegiatan = async (req, res) => {
  res.cookie("filter_kegiatan", {
    tgl_awal: "",
    tgl_akhir: "",
  });
  res.redirect("/laporan_kegiatan");
};
