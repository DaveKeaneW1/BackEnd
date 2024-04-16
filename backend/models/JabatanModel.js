const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const JabatanSchema = new Schema({
  nama: { type: String, required: true }
});

module.exports = mongoose.model("Jabatan", JabatanSchema);