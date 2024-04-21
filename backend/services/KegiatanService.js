const KegiatanModel = require("../models/KegiatanModel.js");
const moment = require("moment");

async function tampilData(body = {}) {
  var list = [];
  try {
    const { id_pengguna, tgl_awal, tgl_akhir } = body;

    var filter = {};

    if (id_pengguna) {
      filter["pengguna"] = id_pengguna;
    }

    if (tgl_awal && tgl_akhir) {
      filter["tgl_kegiatan"] = {
        $gte: moment(tgl_awal).startOf("day").format(),
        $lte: moment(tgl_akhir).endOf("day").format(),
      };
    }

    const result = await KegiatanModel.find(filter)
      .populate("pengguna")
      .populate("jenis_kegiatan")
      .sort({ tgl_kegiatan: 1 });

    list = result;
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await KegiatanModel.findByIdAndDelete(id)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function tambahData(req) {
  const { jenis_kegiatan, waktu_mulai, waktu_selesai, keterangan } = req.body;

  var id_pengguna = "";
  if (req && req.cookies && req.cookies.id_pengguna) {
    id_pengguna = req.cookies.id_pengguna;
  }

  //cek data yang kosong
  if (!jenis_kegiatan || !waktu_mulai || !waktu_selesai) {
    throw "Silahkan lengkapi data!";
  }

  var data_baru = {
    pengguna: id_pengguna,
    tgl_kegiatan: new Date().toLocaleString(),
    jenis_kegiatan: jenis_kegiatan != "lainnya" ? jenis_kegiatan: null,
    waktu_mulai,
    waktu_selesai,
    keterangan,
  };

  //cari data kegiatan pengguna terakhir

  try {
    const searchDateStart = new Date();
    searchDateStart.setHours(0, 0, 0, 0); // Set the time to the start of the day (midnight)
    const searchDateEnd = new Date();
    searchDateEnd.setHours(23, 59, 59, 999); // Set the time to the end of the day (just before midnight)

    var kegiatan_terakhir = await KegiatanModel.findOne({
      pengguna: id_pengguna,
      tgl_kegiatan: {
        $gte: searchDateStart, // Greater than or equal to start of search date
        $lte: searchDateEnd, // Less than or equal to end of search date
      },
    });

    var buatDataBaru = true;

    if (kegiatan_terakhir) {
      if (kegiatan_terakhir.waktu_mulai == data_baru.waktu_mulai) {
        buatDataBaru = false;
        data_baru["tgl_ubah"] = new Date().toLocaleString();
        await KegiatanModel.findByIdAndUpdate(
          kegiatan_terakhir["_id"],
          data_baru
        );
      }
    }

    if (buatDataBaru) {
      data_baru["tgl_input"] = new Date().toLocaleString();
      await KegiatanModel.create(data_baru);
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
