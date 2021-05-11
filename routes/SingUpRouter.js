const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");
router.get("/", signUpController.signUpForm);
//! Multer setting
const multer = require("multer");
// const upload = multer({
//   dest: "public/fileUpload/image",
// });
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/fileUpload/image");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage,
});
router.post("/", upload.single("pictureName"), signUpController.signUpPost);
module.exports = router;
