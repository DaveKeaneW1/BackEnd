const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PenggunaSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nama: { type: String, required: true },
  level_pengguna: { type: String, required: true },
  jabatan: { type: mongoose.Schema.Types.ObjectId, ref: "Jabatan" },
});

module.exports = mongoose.model('Pengguna', PenggunaSchema);