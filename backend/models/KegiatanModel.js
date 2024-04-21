const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const KegiatanSchema = new Schema(
  {
    pengguna: { type: mongoose.Schema.Types.ObjectId, ref: "Pengguna" },
    jenis_kegiatan: { type: mongoose.Schema.Types.ObjectId, ref: "Jenis_Kegiatan" },
    tgl_kegiatan: { type: Date, required: true },
    waktu_mulai: { type: String },
    waktu_selesai: { type: String },
    tgl_input: { type: Date, required: true },
    tgl_ubah: { type: Date },
    keterangan: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Kegiatan", KegiatanSchema);
