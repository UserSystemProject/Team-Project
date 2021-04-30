const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 5000;
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

//! Listen
app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
});
// Home
app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Home Page" });
});

// Login

// Adding modal

const url = require("url");

//log in to be desplay
//import my model User log in

const myUser = require("./models/User");

app.get("/login", (req, res) => {
  //res.render("login");
  myUser.find((err, info) => {
    const character = req.query;
    res.render("login", { info, character });
  });
});

app.post("/login", (req, res) => {
  // console.log("Data is received from user:", req.body);
  const newUser = new myUser(req.body);
  console.log(newUser);
  newUser.save().then(() => {
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
});

// Reset Password

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
