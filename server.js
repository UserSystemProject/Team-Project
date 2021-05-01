const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 5000;
const url = require("url");
//! Mongoose Connection
const connectDB = require("./Config/db");
connectDB();
//! Setting
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
//! Adding models
const User = require("./models/User");
const Product = require("./models/Product");

//! Routes
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/SingUpRouter");
const loginRouter = require("./routes/loginRouter");
//? Home
app.use("/", indexRouter);
//? Register
app.use("/register", signUpRouter);
//? Login
app.use("/login", loginRouter);
//! Product User
// r
// app.get("/login/productuser", (req, res) => {
//   const userName = req.query.userName;
//   Product.find((err, product) => {
//     User.find((err, user) => {
//       res.render("productuser", { product, user, userName });
//     });
//   });
// });
// c
// app.post("/login/productuser", (req, res) => {
//   const newProduct = new Product(req.body);
//   newProduct.save().then(() => {
//     res.redirect("/login/productuser");
//   });
// });
//! updating manually
// app.get("/login/product/update/:id", (req, res) => {
//   const updateProduct = req.params.id;
//   Product.findByIdAndUpdate(
//     updateProduct,
//     { title: "updating" },
//     (err, doc) => {
//       console.log("Product updated:", doc);
//       res.redirect("/login/productuser");
//     }
//   );
// });
//! 404 error
app.get("*", (req, res) => {
  res.render("404error");
});
//! Listen
app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
});
