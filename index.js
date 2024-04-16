require("dotenv").config();
const express = require("express");
const connectDB = require("./backend/config/db");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const toastr = require("express-toastr");

const app = express();
const port = process.env.PORT || 3000;

//connect to database
connectDB();

app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

//static files
app.use(express.static("public"));

//flash messages
app.use(flash());

//use cookie-parser middleware to parse the cookeis
app.use(cookieParser());

//express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //1 minggu
    },
  })
);

//use toastr
app.use(toastr());

app.use(function (req, res, next) {
  res.locals.toasts = req.toastr.render();
  next();
});

app.set("view engine", "ejs");

//create table
app.use("/create_table", require("./backend/routes/create_table"));

app.get("/", (req, res) => {
  res.redirect("/pengguna");
});

app.use("/", require("./backend/routes/index"));
app.use("/pengguna", require("./backend/routes/pengguna"));
app.use("/jabatan", require("./backend/routes/jabatan"));


// app.get("/absensi", (req, res) => {
//   res.render("absensi.ejs", { title: "Daftar Absensi", page: req.url });
// });

// //jika tekan tombol tambah dan menambah data absensi baru -> arahkan ke halaman absensi
// app.post("/tambah_absensi", (req, res) => {
//   res.redirect("/jabatan");
// });

// app.get("/laporan_absensi", (req, res) => {
//   res.render("laporan_absensi.ejs", { title: "Laporan Absensi", page: req.url });
// });
// app.post("/cari_tanggal", (req, res) => {
//   res.redirect("/laporan_absensi");
// });

// app.post("/reset_filter", (req, res) => {
//   res.redirect("/laporan_absensi");
// });


app.listen(port, () => {
  console.log(`Webserver app listening on port ${port}`);
});
