const AbsensiService = require("../services/AbsensiService");
const moment = require("moment");
/**
 * GET /absensi
 *
 */

exports.absensi = async (req, res) => {
  var list_data = [];

  try {
    var id_pengguna = "";
    if (req && req.cookies && req.cookies.id_pengguna) {
      id_pengguna = req.cookies.id_pengguna;
    }

    const result = await AbsensiService.tampilData({ id_pengguna });
    if (result) list_data = result;
  } catch (e) {
    error = e;
  }

  res.render("absensi.ejs", {
    title: "Daftar Absensi",
    page: req.originalUrl,
    req,
    res,
    list_data,
  });
};

/**
 * POST /jabatan/tambah
 *
 */

exports.tambah_absensi = async (req, res) => {
  try {
    const result = await AbsensiService.tambahData(req);
    if (result) {
      req.session.alert_message = {
        message: "Tambah Data Berhasil.",
        type: "success",
      };
      res.redirect("/absensi");
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
    res.redirect("/absensi");
  }
};

/**
 * GET /absensi/laporan
 *
 */

exports.laporan_absensi = async (req, res) => {
  var list_data = [];

  var tgl_awal_default = moment().format();
  var tgl_akhir_default = moment().add(7, "days").format();

  var tgl_awal = tgl_awal_default;
  var tgl_akhir = tgl_akhir_default;

  if (req.cookies) {
    if (req.cookies.filter_absensi) {
      var filter_absensi = req.cookies.filter_absensi;

      if (filter_absensi.tgl_awal) {
        tgl_awal = moment(filter_absensi.tgl_awal, "YYYY-MM-DD").format();
      }

      if (filter_absensi.tgl_akhir) {
        tgl_akhir = moment(filter_absensi.tgl_akhir, "YYYY-MM-DD").format();
      }
    }
  }

  if (moment(tgl_akhir).isBefore(tgl_awal)) {
    tgl_awal = tgl_awal_default;
    tgl_akhir = tgl_akhir_default;
  }

  try {
    const result = await AbsensiService.tampilData({
      tgl_awal,
      tgl_akhir,
    });
    if (result) list_data = result;
  } catch (e) {
    error = e;
  }

  res.render("laporan_absensi.ejs", {
    title: "Laporan Absensi",
    page: req.originalUrl,
    req,
    res,
    list_data,
    dir: "../",
    tgl_awal: moment(tgl_awal).format("YYYY-MM-DD"),
    tgl_akhir: moment(tgl_akhir).format("YYYY-MM-DD"),
  });
};

exports.cari_absensi = async (req, res) => {
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
    res.cookie("filter_absensi", {
      tgl_awal,
      tgl_akhir,
    });
  }
  res.redirect("/laporan_absensi");
};

exports.reset_filter_absensi = async (req, res) => {
  res.cookie("filter_absensi", {
    tgl_awal: "",
    tgl_akhir: "",
  });
  res.redirect("/laporan_absensi");
};
