const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const JenisKegiatanSchema = new Schema({
  nama: { type: String, required: true },
  jabatan: { type: mongoose.Schema.Types.ObjectId, ref: "Jabatan" },
}, { timestamps: true });

module.exports = mongoose.model("Jenis_Kegiatan", JenisKegiatanSchema);