const bcrypt = require("bcryptjs");

const JabatanModel = require("../models/JabatanModel.js");
const PenggunaModel = require("../models/PenggunaModel.js");

const JabatanService = require("../services/JabatanService");

const { sample_jabatan, sample_pengguna, sample_jenis_kegiatan } = require("../sample_data/data.js");
const JenisKegiatanModel = require("../models/JenisKegiatanModel.js");
const JenisKegiatanService = require("../services/JenisKegiatanService");

//create table jabatan
exports.jabatan = async (req, res) => {
  try {
    const count = await JabatanModel.countDocuments();

    if (count > 0) {
      return res.send("Tabel jabatan sudah terbentuk!");
    }

    await JabatanModel.insertMany(sample_jabatan);
    return res.send("Tabel jabatan berhasil dibuat!");
  } catch (e) {
    console.log("jabatan error ", e);
    return res.status(500).send(e.message);
  }
};

//create table pengguna
exports.pengguna = async (req, res) => {
  try {
    const count = await PenggunaModel.countDocuments();

    if (count > 0) {
      return res.send("Tabel pengguna sudah terbentuk!");
    }

    var data_jabatan = await JabatanService.tampilData();

    var index = 0;
    for (const pengguna of sample_pengguna) {
      pengguna["jabatan"] = data_jabatan[index]["_id"];

      const encryptedPassword = await bcrypt.hash(pengguna["password"], 10);
      pengguna["password"] = encryptedPassword;

      const doc = new PenggunaModel(pengguna);
      await doc.save();

      index++;
    }

    return res.send("Tabel pengguna berhasil dibuat!");
  } catch (e) {
    console.log("pengguna error ", e);
    return res.status(500).send(e.message);
  }
};

//create table jenis kegiatan
exports.jenis_kegiatan = async (req, res) => {
  try {
    const count = await JenisKegiatanModel.countDocuments();

    if (count > 0) {
      res.send("Tabel jenis kegiatan sudah terbentuk!");
      return;
    }

    for (const docData of sample_jenis_kegiatan) {
      const highestDoc = await JenisKegiatanModel.findOne({nama: docData.nama_jabatan}).sort({ _id: -1 });
      if (highestDoc) {
        docData.jabatan = highestDoc._id;
      }

      const doc = new JenisKegiatanModel(docData);
      await doc.save();
    }

    res.send("Tabel jenis kegiatan berhasil dibuat!");
  } catch (e) {
    console.log("Jenis kegiatan error ", e);
    return res.status(500).send(e.message);
  }
};
