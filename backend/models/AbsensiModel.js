const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AbsensiSchema = new Schema({
  pengguna: { type: mongoose.Schema.Types.ObjectId, ref: "Pengguna" },
  tgl_absensi: { type: Date, required: true },
  status_kehadiran: { type: String, required: true }, //hadir, sakit, izin
  status_keterlambatan:{ type: String }, //-, terlambat, tidak terlambat,
  tgl_input: { type: Date, required: true },
  tgl_ubah: { type: Date },
  keterangan: { type: String, required: true },
  foto: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Absensi", AbsensiSchema);