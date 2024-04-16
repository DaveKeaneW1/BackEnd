const JabatanModel = require("../models/JabatanModel.js");

async function tampilData(body = {}) {
  var list = [];
  try {
    const { cari } = body;

    var filter = {};

    if (cari) {
      const regex = new RegExp(cari, "i");
      filter["nama"] = { $regex: regex };
    }

    const result = await JabatanModel.find(filter).sort({ nama: -1 });

    list = result;
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await JabatanModel.findByIdAndDelete(id)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function tambahData(req) {
  const { nama } = req.body;

  //cek data yang kosong
  if (!nama) {
    throw "Silahkan lengkapi data!";
  }

  var data_baru = {
    nama
  };

  try {
    await JabatanModel.create(data_baru);
    return "Tambah data berhasil!";
  } catch (e) {
    throw e.message;
  }
}

// ubah data
async function ubahData(id, req) {
  const { nama } = req.body;

  //cek data yang kosong
  if (!nama) {
    throw "Silahkan lengkapi data!";
  }

  var jabatan = null;
  await JabatanModel.findById(id)
    .then((result) => {
      jabatan = result;
    })
    .catch((e) => {
      throw e.message;
    });

  if (jabatan == null) {
    throw "Jabatan tidak ditemukan!";
  }

  var data_baru = {
    nama,
  };

  var list = null;
  await JabatanModel.findByIdAndUpdate(id, data_baru)
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
  ubahData,
};
