const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/", loginController.loginForm);
router.post("/", loginController.loginWithUser);
//! Login Admin
router.get("/productadmin", loginController.adminLoggedIn);
//! createUserAdmin
router.post("/productadmin", loginController.createNewUser);
//! Update User Admin

//! DeleteUser Admin
router.get("/productadmin/delete/:id", loginController.deleteUser);
//! Login User
router.get("/productuser", loginController.loginUser);
//! Add Product User
router.post("/productuser", loginController.addProduct);

//! Update Product User
router.get("/productuser/update/:id", loginController.updateProduct1);

//! UpdateDDDD Product User
router.post("/productuser/update/:id", loginController.updatedProduct);

//! Delete Product User
router.get("/productuser/delete/:id", loginController.deleteProduct);
module.exports = router;
