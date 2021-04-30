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
//! product admin
// r
app.get("/productadmin", (req, res) => {
  Product.find((err, product) => {
    User.find((err, user) => {
      console.log(user, product);
      res.render("productadmin", { products: product, users: user });
    });
  });
});
// c
app.post("/productadmin", (req, res) => {
  const newUser = new User(req.body);
  newUser.save().then(() => {
    res.redirect("/productadmin");
  });
});
//! Product User
// r
app.get("/productuser", (req, res) => {
  Product.find((err, product) => {
    User.find((err, user) => {
      res.render("productuser", { product, user });
    });
  });
});
// c
app.post("/productuser", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save().then(() => {
    res.redirect("/productuser");
  });
});
//! updating manually
app.get("product/update/:id", (req, res) => {
  const updateProduct = req.params.id;
  Product.findByIdAndUpdate(
    updateProduct,
    { title: "updating" },
    (err, doc) => {
      res.redirect("/product");
    }
  );
});
//! Login (Read of cRud)
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  User.findOne(
    { email: req.body.email, password: req.body.password },
    (err, user) => {
      console.log(user);
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
        if (user.role == "administrator") {
          res.redirect("/productadmin");
        } else {
          res.redirect("/productuser");
        }
      }
    }
  );
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
