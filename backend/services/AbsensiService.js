const AbsensiModel = require("../models/AbsensiModel.js");
const moment = require("moment");

async function tampilData(body = {}) {
  var list = [];
  try {
    const { id_pengguna, tgl_awal, tgl_akhir } = body;

    var filter = {};

    if(id_pengguna){
      filter['pengguna'] = id_pengguna;
    }

    if (tgl_awal && tgl_akhir) {
      filter["tgl_absensi"] = {
        $gte: moment(tgl_awal).startOf('day').format(),
        $lte: moment(tgl_akhir).endOf('day').format(),
      };
    }

    const result = await AbsensiModel.find(filter)
    .populate('pengguna')
    .sort({ tgl_absensi: 1 });

    list = result;
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await AbsensiModel.findByIdAndDelete(id)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function tambahData(req) {
  const { status_kehadiran, keterangan, foto } = req.body;

  var id_pengguna = "";
  if (req && req.cookies && req.cookies.id_pengguna) {
    id_pengguna = req.cookies.id_pengguna;
  }

  //cek data yang kosong
  if (!status_kehadiran || !keterangan) {
    throw "Silahkan lengkapi data!";
  }

  var status_keterlambatan = "";

  //cek jam kantor
  if (status_kehadiran == "Hadir") {
    if (moment().format("HH:mm") > "07:00") {
      status_keterlambatan = "Terlambat";
    } else {
      status_keterlambatan = "Tidak Terlambat";
    }
  }

  var data_baru = {
    pengguna: id_pengguna,
    tgl_absensi: new Date().toLocaleString(),
    status_kehadiran,
    status_keterlambatan,
    keterangan,
    foto,
  };

  //cari data absen pengguna terakhir

  try {
    const searchDateStart = new Date();
    searchDateStart.setHours(0, 0, 0, 0); // Set the time to the start of the day (midnight)
    const searchDateEnd = new Date();
    searchDateEnd.setHours(23, 59, 59, 999); // Set the time to the end of the day (just before midnight)

    var absensi_terakhir = await AbsensiModel.findOne({
      pengguna: id_pengguna,
      tgl_absensi: {
        $gte: searchDateStart, // Greater than or equal to start of search date
        $lte: searchDateEnd, // Less than or equal to end of search date
      },
    });

    if (absensi_terakhir) {
      data_baru["tgl_ubah"] = new Date().toLocaleString();
      await AbsensiModel.findByIdAndUpdate(absensi_terakhir["_id"], data_baru);
    } else {
      data_baru["tgl_input"] = new Date().toLocaleString();
      await AbsensiModel.create(data_baru);
    }

    return "Tambah data berhasil!";
  } catch (e) {
    throw e.message;
  }
}

// cari data berdasarkan id
async function cariDataBerdasarkanId(id) {
  var list = null;
  await JabatanModel.findById(id)
    .then((result) => {
      list = result;
    })
    .catch((e) => {
      throw e.message;
    });
  return list;
}

module.exports = {
  tampilData,
  hapusData,
  tambahData,
  cariDataBerdasarkanId,
};
