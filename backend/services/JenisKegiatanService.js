const JenisKegiatanModel = require("../models/JenisKegiatanModel.js");

async function tampilData(body = {}) {
  var list = [];
  try {
    const { cari, jabatan } = body;

    var filter = {};

    if (cari) {
      const regex = new RegExp(cari, "i");
      filter["nama"] = { $regex: regex };
    }

    if (jabatan) {
      filter["jabatan"] = jabatan;
    }

    const result = await JenisKegiatanModel
    .find(filter).sort({ nama: -1 })
    .populate('jabatan')
    ;

    list = result;
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await JenisKegiatanModel.findByIdAndDelete(id)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function tambahData(req) {
  const { nama, jabatan } = req.body;

  //cek data yang kosong
  if (!nama || !jabatan) {
    throw "Silahkan lengkapi data!";
  }

  var data_baru = {
    nama,
    jabatan
  };

  try {
    await JenisKegiatanModel.create(data_baru);
    return "Tambah data berhasil!";
  } catch (e) {
    throw e.message;
  }
}

// ubah data
async function ubahData(id, req) {
  const { nama, jabatan } = req.body;

  //cek data yang kosong
  if (!nama || !jabatan) {
    throw "Silahkan lengkapi data!";
  }

  var data = null;
  await JenisKegiatanModel.findById(id)
    .then((result) => {
      data = result;
    })
    .catch((e) => {
      throw e.message;
    });

  if (data == null) {
    throw "Data tidak ditemukan!";
  }

  var data_baru = {
    nama,
    jabatan
  };

  var list = null;
  await JenisKegiatanModel.findByIdAndUpdate(id, data_baru)
    .then((result) => {
      list = result;
    })
    .catch((e) => {
      throw e.message;
    });
  return list;
}

// cari data berdasarkan id
async function cariDataBerdasarkanId(id) {
  var list = null;
  await JenisKegiatanModel.findById(id)
    .populate('jabatan')
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
  ubahData,
};
