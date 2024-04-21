const sample_pengguna = [
  {
    nama: "Administrator",
    username: "admin",
    password: "admin",
    status: "aktif",
    level_pengguna: "Admin",
    jabatan: "",
  },
];

const sample_jabatan = [
  { nama: "Admin" },
  { nama: "HRD" },
  { nama: "IT Support" },
];

const sample_jenis_kegiatan = [
  {
    nama: "Menambah Pengguna",
    nama_jabatan: "Admin"
  },
  {
    nama: "Mengecek Kegiatan",
    nama_jabatan: "Admin"
  },
  {
    nama: "Menambah Pengguna",
    nama_jabatan: "IT Support"
  },
  {
    nama: "Mengecek Kegiatan",
    nama_jabatan: "IT Support"
  },
  {
    nama: "Wawancara dengan pelamar",
    nama_jabatan: "HRD"
  }
];

module.exports = { sample_jabatan, sample_pengguna, sample_jenis_kegiatan };