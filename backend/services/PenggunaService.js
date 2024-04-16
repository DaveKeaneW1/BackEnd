const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PenggunaModel = require("../models/PenggunaModel.js");

async function login(req) {
  const { username, password } = req.body;
  //cek data yang kosong
  if (!username || !password) {
    throw "Silahkan lengkapi data!";
  }

  const user = await PenggunaModel.findOne({ username }).populate('jabatan');
  if (user && (await bcrypt.compare(password, user.password))) {
    return generateTokenResponse(user);
  } else {
    throw "Username atau password tidak valid";
  }
}

// tampilkan data
async function tampilData() {
  var list = [];
  try {
    var filter = { };
    const result = await PenggunaModel.find(filter).populate("jabatan").sort({ nama: 1});

    list = result;
  } catch (e) {
    throw e.message;
  }

  return list;
}

// hapus data
async function hapusData(id) {
  await PenggunaModel.findByIdAndDelete(id)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e.message;
    });
}

// tambah data
async function tambahData(req) {
  const { nama, username, password, level_pengguna, jabatan } = req.body;

  //cek data yang kosong
  if (!nama || !username || !password || !level_pengguna || !jabatan) {
    throw "Silahkan lengkapi data!";
  }

  const pengguna = await PenggunaModel.findOne({ username });
  if (pengguna) {
    throw "Username sudah digunakan!";
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  var data_baru = {
    nama,
    username,
    password: encryptedPassword,
    level_pengguna,
    jabatan
  };

  if (pengguna && (await bcrypt.compare(password, pengguna.password))) {
  } else {
  }

  try {
    await PenggunaModel.create(data_baru);
    return "Tambah data berhasil!";
  } catch (e) {
    throw e.message;
  }
}

// ubah data
async function ubahData(id, req) {
  const { nama, username, password, level_pengguna, jabatan } = req.body;

  //cek data yang kosong
  if (!nama || !username || !level_pengguna || !jabatan) {
    throw "Silahkan lengkapi data!";
  }

  var pengguna = null;
  await PenggunaModel.findById(id)
    .then((result) => {
      pengguna = result;
    })
    .catch((e) => {
      throw e.message;
    });

  if (pengguna == null) {
    throw "Pengguna tidak ditemukan!";
  }

  const cek_pengguna = await PenggunaModel.findOne({
    username,
    _id: { $ne: id },
  });

  if (cek_pengguna) {
    throw "Username sudah digunakan!";
  }

  var data_baru = {
    nama,
    username,
    level_pengguna,
    jabatan
  };

  if (await bcrypt.compare(password, pengguna.password)) {
  } else if (password) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    data_baru["password"] = encryptedPassword;
  }

  var list = null;
  await PenggunaModel.findByIdAndUpdate(id, data_baru)
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
  await PenggunaModel.findById(id).populate('jabatan')
    .then((result) => {
      list = result;
    })
    .catch((e) => {
      throw e.message;
    });
  return list;
}

// Generate token baru saat autentikasi pengguna
const generateTokenResponse = (pengguna) => {
  const token = jwt.sign(
    {
      id: pengguna.id,
      email: pengguna.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: pengguna.id,
    nama: pengguna.nama,
    username: pengguna.username,
    token: token,
    level_pengguna: pengguna.level_pengguna,
    jabatan: pengguna.jabatan
  };
};

module.exports = {
  login,
  tampilData,
  hapusData,
  tambahData,
  cariDataBerdasarkanId,
  ubahData,
};
