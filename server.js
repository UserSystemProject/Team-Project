const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 5000;
const url = require("url");

//! Setting
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

//! Database connection
const mongoose = require("mongoose");
const dataBaseName = process.env.dataBaseHiddenName;
const dataBaseLink = process.env.dataBaseHiddenLink + dataBaseName;
mongoose
  .connect(dataBaseLink, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(() => console.log("DataBase connection is failed"));

//! Adding models
const User = require("./models/User");
const Product = require("./models/Product");
//! Home
app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Home Page" });
});

//! Login (Read of cRud)
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  User.findOne(
    { email: req.body.email, password: req.body.password },
    (err, user) => {
      if (user == null) {
        res.redirect(
          url.format({
            pathname: "/login",
            query: {
              message: "E-mail or Password is wrong, please check it!",
              falseEntered: false,
            },
          })
        );
      } else if (!Object.keys(user) == 0) {
        res.redirect("/product");
      }
    }
  );
});

//! Product
app.get("/product", (req, res) => {
  Product.find((err, product) => {
    res.render("product", { product });
  });
});

app.post("/product", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save().then(() => {
    res.redirect("/product");
  });
});

//! register (Create of Crud)
app.get("/register", (req, res) => {
  res.render("signUpForm");
});
app.post("/register", (req, res) => {
  const newUser = new User(req.body);
  console.log(newUser);
  newUser.save(() => {
    res.redirect("/login");
  });
});
//! 404 error
app.get("*", (req, res) => {
  res.render("404error");
});

//! Listen
app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
});
