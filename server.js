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

//! Home
app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Home Page" });
});
//! product admin
// r
app.get("/login/productadmin", (req, res) => {
  const userName = req.query.userName;
  Product.find((err, product) => {
    User.find((err, user) => {
      // console.log(user, product);
      res.render("productadmin", { products: product, users: user, userName });
    });
  });
});
// c
app.post("/login/productadmin", (req, res) => {
  const newUser = new User(req.body);
  newUser.save().then(() => {
    res.redirect("/productadmin");
  });
});
// d
app.get("/users/delete/:id", (req, res) => {
  const deleteUserId = req.params.id;
  User.findByIdAndDelete(deleteUserId, (err, doc) => {
    console.log("User deleted:", doc);
    res.redirect(
      url.format({
        pathname: "/login/productadmin",
      })
    );
  });
});
//! Product User
// r
app.get("/login/productuser", (req, res) => {
  console.log(req.query.userName);
  const userName = req.query.userName;
  Product.find((err, product) => {
    User.find((err, user) => {
      res.render("productuser", { product, user, userName });
    });
  });
});
// c
app.post("/login/productuser", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save().then(() => {
    res.redirect("/productuser");
  });
});
//! updating manually
app.get("/login/product/update/:id", (req, res) => {
  const updateProduct = req.params.id;
  Product.findByIdAndUpdate(
    updateProduct,
    { title: "updating" },
    (err, doc) => {
      console.log("Product updated:", doc);
      res.redirect("/product");
    }
  );
});
//! Login (Read of cRud)
app.get("/login", (req, res) => {
  const messages = req.query;
  res.render("login", { messages });
});
app.post("/login", (req, res) => {
  User.findOne(
    { email: req.body.email, password: req.body.password },
    (err, user) => {
      // console.log(user);
      if (user == null) {
        res.redirect(
          url.format({
            pathname: "/login",
            query: {
              failMessage: "E-mail or Password is wrong, please check it!",
              falseEntered: true,
            },
          })
        );
      } else if (!Object.keys(user) == 0) {
        if (user.role == "administrator") {
          console.log(user.name);
          res.redirect(
            url.format({
              pathname: "/login/productadmin",
              query: { userName: user.name },
            })
          );
        } else {
          console.log(user.name);
          res.redirect(
            url.format({
              pathname: "/login/productuser",
              query: { userName: user.name },
            })
          );
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
