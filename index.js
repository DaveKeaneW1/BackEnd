require("dotenv").config();
const express = require("express");
const connectDB = require("./backend/config/db");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const toastr = require("express-toastr");
const bodyParser = require('body-parser');
const upload = require("./backend/middleware/upload");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

//connect to database
connectDB();

app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

//static files
app.use(express.static("public"));
app.use('/uploads', express.static("uploads"));

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

// app.get("/", (req, res) => {
//   res.redirect("/pengguna");
// });

app.use("/", require("./backend/routes/index"));
app.use("/pengguna", require("./backend/routes/pengguna"));
app.use("/jabatan", require("./backend/routes/jabatan"));
app.use("/jenis_kegiatan", require("./backend/routes/jenis_kegiatan"));
app.use("/", require("./backend/routes/absensi"));
app.use("/", require("./backend/routes/kegiatan"));

// POST route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  // 'image' should match the name attribute of the input field in the form

  // Extract base64 data from the request body
  const base64Data = req.body.foto.replace(/^data:image\/\w+;base64,/, '');

  // Decode base64 data
  const decodedImage = Buffer.from(base64Data, 'base64');

  // Generate a unique filename (you can customize this as needed)
  const filename = 'uploaded_image_' + Date.now() + '.jpg';

  // Write the decoded image data to a file
  fs.writeFile('uploads/' + filename, decodedImage, (err) => {
    if (err) {
      console.error('Error saving image:', err);
      res.status(500).send('Error saving image');
    } else {
      console.log('Image saved as:', filename);
      res.send('uploads/' + filename);
    }
  });
});

// app.get("/notfound", (req, res) => {
//   res.status(404).render("notfound.ejs", { title: "Not Found" });
// });

//redirect ke halaman /notfound jika halaman tidak ditemukan
// app.get("*", (req, res) => {
//   res.redirect("/notfound")
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
