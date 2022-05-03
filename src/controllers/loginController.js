const Login = require("../models/UsersModel");

exports.index = (req, res) => {
    if(req.session.user){
        res.redirect('/')
    }
  res.render("login");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);

    const reg = await login.register();

    if (!reg) {
      req.flash("errors", login.errors);

      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", "Cadastro foi concluído com sucesso.");

    req.session.save(function () {
      return res.redirect("back");
    });
  } catch (error) {
      return res.render('404');
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);

    const loginSuccess = await login.login();
  
    if (!loginSuccess) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        res.redirect("back");
        return;
      });
      return;
    }
    req.flash("success", "Login efetuado com sucesso.");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (error) {
      res.render('404');
  }
};

exports.logout = (req,res) => {
    

    
  req.session.destroy();
    
  res.redirect('/');

}
