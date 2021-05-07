//! MiddleWare for checking if there is session
function checkLogin(req, res, next) {
  if (!req.session.loginUser) {
    // if there is no session/logged in user, go next
    return next();
  } else {
    // if there is user logged in got to profile
    if (req.session.loginUser.role == "administrator") {
      res.redirect("/login/productadmin");
    } else if (req.session.loginUser.role == "employee") {
      res.redirect("/login/productuser");
    }
  }
}
function checkLogOut(req, res, next) {
  if (!req.session.loginUser) {
    return next();
  } else {
    // if session is not deleted we delete it with middleware
    delete req.session.loginUser;
    return next();
  }
}

//? they should be combined
//! check it
// function userRole(req, res, next) {
//   const userRole = "administrator";
//   if (!req.session.loginUser && userRole == "administrator") {
//     return next();
//   } else {
//     res.redirect("/login");
//   }
// }
function rejectProduct(req, res, next) {
  if (req.session.loginUser) return next();
  res.redirect("/login");
}
module.exports = { checkLogOut, checkLogin, rejectProduct };
