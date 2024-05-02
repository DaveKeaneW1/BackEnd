const mongoose = require("mongoose");

const JabatanModel = require("../models/JabatanModel.js");
const JabatanService = require("../services/JabatanService");
const { sample_jabatan, sample_pengguna } = require("../sample_data/data.js");
const PenggunaModel = require("../models/PenggunaModel.js");
const bcrypt = require("bcryptjs");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);

    setupInitialData();
  } catch (error) {
    console.log(error);
  }
};

const setupInitialData = async () => {
  const count = await JabatanModel.countDocuments();

  if (count == 0) {
    await JabatanModel.insertMany(sample_jabatan);

    const countPengguna = await PenggunaModel.countDocuments();

    if (countPengguna == 0) {
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
    }
  }
};

module.exports = connectDB;
