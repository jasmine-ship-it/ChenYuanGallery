const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to ChenYuan's Art Gallery!");
      res.redirect("/gallery");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  // req.session.reload(function (err) {
  // 	if (err) {
  // 		return next(err);
  // 	}
  // })
  const redirectUrl = req.session.returnTo || "/gallery";
  // const referer = req.header('Referer') || '/'
  console.log("***************");
  console.log("this is the final return to url", req.session);
  // console.log({ referer })
  console.log("this is the final original url", req.originalUrl);
  console.log("this is the latest session id", req.session.id);
  console.log("***************");
  delete req.session.returnTo;
  res.redirect("redirectUrl");
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/gallery");
  });
};
