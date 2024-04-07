const express = require("express");
var bodyParser = require("body-parser");

const app = express();

const port = 3002;

app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/login", (req, res) => {
  res.render("login.ejs", { title: "Login" });
});

app.post("/login-pengguna", (req, res) => {
  const { username, password } = req.body;
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.redirect("/pengguna");
});

app.get("/pengguna", (req, res) => {
  res.render("pengguna.ejs", { title: "Daftar Pengguna", page: req.url });
});

//jika tekan tombol tambah dan menambah data pengguna baru -> arahkan ke halaman pengguna
app.post("/tambah_pengguna", (req, res) => {
  res.redirect("/pengguna");
});

app.get("/jabatan", (req, res) => {
  res.render("jabatan.ejs", { title: "Daftar Jabatan", page: req.url });
});

//jika tekan tombol tambah dan menambah data jabatan baru -> arahkan ke halaman jabatan
app.post("/tambah_jabatan", (req, res) => {
  res.redirect("/jabatan");
});

app.get("/absensi", (req, res) => {
  res.render("absensi.ejs", { title: "Daftar Absensi", page: req.url });
});

//jika tekan tombol tambah dan menambah data absensi baru -> arahkan ke halaman absensi
app.post("/tambah_absensi", (req, res) => {
  res.redirect("/jabatan");
});

app.get("/laporan_absensi", (req, res) => {
  res.render("laporan_absensi.ejs", { title: "Laporan Absensi", page: req.url });
});
app.post("/cari_tanggal", (req, res) => {
  res.redirect("/laporan_absensi");
});

app.post("/reset_filter", (req, res) => {
  res.redirect("/laporan_absensi");
});


app.listen(port, () => {
  console.log(`Webserver app listening on port ${port}`);
});
