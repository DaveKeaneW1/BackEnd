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
  const login_message = await req.flash("login_status");
  var message = "";

  if(login_message){
    if(login_message.length > 0){
      message = login_message[0];
    }
  }
  res.render("login.ejs", { title: "Login", message, req, res });
};

/**
 * POST /cek-login
 * Cek Login : Username, Password
 */

exports.cek_login = async (req, res) => {
  try {
    const result = await PenggunaService.login(req);
    if (result) {
      req.flash("login_status", "Login Berhasil");
      let options = {
        maxAge: 1000 * 60 * 60 * 24 * 7, // would expire in 1 week
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true,
        sameSite: "None",
      };

      res.cookie("token", result.token, options);
      res.cookie("nama_pengguna", result.nama);
      res.cookie("id_pengguna", result._id);
      var jabatan = "";
      
      if(result.jabatan){
        if(result.jabatan.nama){
          jabatan = result.jabatan.nama;
        }
      }
      
      res.cookie("jabatan", jabatan);
      res.cookie("admin", result.level_pengguna === 1 ? 1 : 0);

      req.toastr.success("Login Berhasil", "", {
        timeOut: 2000,
        closeButton: true,
      });
      res.redirect("/");
    }
  } catch (e) {
    if (e) {
      req.flash("login_status", e);
    } else {
      req.flash("login_status", "Server error");

    }
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