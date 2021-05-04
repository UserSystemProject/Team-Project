const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

function checkLogin(req, res, next) {
  if (!req.session.loginUser) {
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
router.get("/", checkLogin, loginController.loginForm);
router.post("/", loginController.loginWithUser);
//! Login Admin "R"
router.get("/productadmin", loginController.adminLoggedIn);

//! createUserAdmin "C"
router.post("/productadmin", loginController.createNewUser);
//! Update User Admin "U"
router.get("/productadmin/update/:id", loginController.updateUser1);
//! updated user by admin "U"
router.post("/productadmin/update/:id", loginController.updatedUser);
//! DeleteUser Admin "D"
router.get("/productadmin/delete/:id", loginController.deleteUser);
//! Login User "R"
router.get("/productuser", loginController.loginUser);
//! Add Product User "C"
router.post("/productuser", loginController.addProduct);
//! Update Product User "U"
router.get("/productuser/update/:id", loginController.updateProduct1);
//! UpdateD Product User "U"
router.post("/productuser/update/:id", loginController.updatedProduct);
//! Delete Product User "D"
router.get("/productuser/delete/:id", loginController.deleteProduct);
module.exports = router;
