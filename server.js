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
// Home
app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Home Page" });
});

//! Login (Read of cRud)
app.get("/login", (req, res) => {
  // User.find((err, info) => {
  //   const character = req.query;
  res.redirect("/product");
  // });
});
app.post("/login", (req, res) => {
  // we need to use find method here
  User.find((err, users) => {
    console.log(users);
  });
  res.redirect(
    url.format({
      pathname: "/product",
      query: {
        result: "Your Information is Stored Correctly",
        successResult: true,
      },
    })
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
//Reset Password
app.get("/resetPassword", (req, res) => {
  res.render("resetPassword");
});
app.post("/resetPassword", (req, res) => {
  console.log("Data is received from user:", req.body);
  // res.end(JSON.stringify(req.body));
});
//404 error
app.get("*", (req, res) => {
  res.render("404error");
});

//! Listen
app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
});
