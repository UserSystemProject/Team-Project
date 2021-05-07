const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");
const auth = require("../Config/auth");

router.get("/", auth.checkLogin, loginController.loginForm);
router.post("/", loginController.loginWithUser);
router.get("/logout", auth.checkLogOut, (req, res) => {
  // redirect to login page
  res.redirect("/login");
});
router.get("/loginplease", (req, res) => {
  res.render("loginPlease");
});
//! Login Admin "R"
router.get("/productadmin", auth.rejectProduct, loginController.adminLoggedIn);

//! createUserAdmin "C"
router.post("/productadmin", auth.rejectProduct, loginController.createNewUser);
//! Update User Admin "U"
router.get(
  "/productadmin/update/:id",
  auth.rejectProduct,
  loginController.updateUser1
);
//! updated user by admin "U"
router.post(
  "/productadmin/update/:id",
  auth.rejectProduct,
  loginController.updatedUser
);
//! DeleteUser Admin "D"
router.get(
  "/productadmin/delete/:id",
  auth.rejectProduct,
  loginController.deleteUser
);
//! Login User "R"
router.get("/productuser", auth.rejectProduct, loginController.loginUser);
//! Add Product User "C"
router.post("/productuser", auth.rejectProduct, loginController.addProduct);
//! Update Product User "U"
router.get(
  "/productuser/update/:id",
  auth.rejectProduct,
  loginController.updateProduct1
);
//! UpdateD Product User "U"
router.post(
  "/productuser/update/:id",
  auth.rejectProduct,
  loginController.updatedProduct
);
//! Delete Product User "D"
router.get(
  "/productuser/delete/:id",
  auth.rejectProduct,
  loginController.deleteProduct
);
module.exports = router;
