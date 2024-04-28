const PenggunaService = require("../services/PenggunaService");


function hapusSemuaCookie(req, res) {
  for (const [name, value] of Object.entries(req.cookies)) {
    res.clearCookie(name);
  }
}

/**
 * GET /login
 * Login
 */

exports.login = async (req, res) => {
  hapusSemuaCookie(req, res);
  res.render("login.ejs", { title: "Login", req, res });
};

/**
 * POST /cek-login
 * Cek Login : Username, Password
 */

exports.cek_login = async (req, res) => {
  try {
    const result = await PenggunaService.login(req);
    if (result) {
      let options = {
        maxAge: 1000 * 60 * 60 * 24 * 7, // would expire in 1 week
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true,
        sameSite: "None",
      };

      res.cookie("token", result.token, options);
      res.cookie("nama_pengguna", result.nama);
      res.cookie("id_pengguna", result.id);
      var jabatan = "";
      
      if(result.jabatan){
        if(result.jabatan.nama){
          jabatan = result.jabatan.nama;
        }

        if(result.jabatan.id){
          res.cookie("jabatan_id", result.jabatan.id);
        }
      }

      res.cookie("jabatan", jabatan);
      res.cookie("admin", result.level_pengguna === "Admin" ? 1 : 0);

      req.session.alert_message = {
        "message": "Login berhasil.",
        "type": "success",
      };

      if(result.level_pengguna === "Admin"){
        res.redirect("/");
      }else{
        res.redirect("/absensi");
      }
      
    }
  } catch (e) {

    var error = "Server error."
    if (e) {
      error = e;
    } 

    req.session.alert_message = {
      "message": error,
      "type": "error",
    };
    res.redirect("/login");
  }
};

/**
 * GET /
 * Logout
 */

exports.logout = async (req, res) => {
  hapusSemuaCookie(req, res);
  res.redirect("/login");
};

/**
 * GET /
 */

exports.cek_hak_akses = async (req, res) => {
  if (req && req.cookies && req.cookies.admin == "1") {
    res.redirect("/pengguna");
  }else{
    res.redirect("/absensi");
  }
};

/**
 * GET /profil
 *
 */

exports.profil = async (req, res) => {
  var id_pengguna = "";
  if (req && req.cookies && req.cookies.id_pengguna) {
    id_pengguna = req.cookies.id_pengguna;
  }

  var data_pengguna = null;
  try {
    const result = await PenggunaService.cariDataBerdasarkanId(id_pengguna);
    
    if (result) {
      data_pengguna = result;
    }
  } catch (e) {
    var message = "Terjadi kesalahan.";
    if (e) {
      message = e;
    }
  }

  res.render("profil.ejs", {
    title: "Profil",
    page: req.originalUrl,
    req,
    res,
    data_pengguna
  });
};

/**
 * POST /
 * ubah-profil
 */

exports.ubah_profil = async (req, res) => {
  try {
    var id_pengguna = "";
    if (req && req.cookies) {
      if (req.cookies.id_pengguna) {
        id_pengguna = req.cookies.id_pengguna;
      }
    }
    const result = await PenggunaService.ubahProfil(req, id_pengguna);
    if (result) {
      let options = {
        maxAge: 1000 * 60 * 60 * 24 * 7, // would expire in 1 week
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true,
        sameSite: "None",
      };

      res.cookie("token", result.token, options);
      res.cookie("nama_pengguna", result.nama);
      res.cookie("id_pengguna", result.id);
      var jabatan = "";
      
      if(result.jabatan){
        if(result.jabatan.nama){
          jabatan = result.jabatan.nama;
        }

        if(result.jabatan.id){
          res.cookie("jabatan_id", result.jabatan.id);
        }
      }

      res.cookie("jabatan", jabatan);
      res.cookie("admin", result.level_pengguna === "Admin" ? 1 : 0);

      req.session.alert_message = {
        "message": "Data profil berhasil diubah.",
        "type": "success",
      };
    }
  } catch (e) {
    if (e) {
      req.session.alert_message = {
        "message": e,
        "type": "error",
      };
    } else {
      req.session.alert_message = {
        "message": "Gagal mengubah profil",
        "type": "error",
      };
    }
  }
  res.redirect("/profil");
};