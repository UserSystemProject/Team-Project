const express = require("express");
const app = express();
const PORT = 8000;
const session = require("express-session");
//! Mongoose Connection
const connectDB = require("./Config/db");
connectDB();
//! Setting
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

// custom helper
const hbs = require("hbs");

hbs.registerHelper("capital", (username) => {
  return username.toUpperCase();
});
hbs.registerHelper("ifEquals", (arg1, arg2, option) => {
  return arg1 == arg2 ? option.fn(this) : option.inverse(this);
});
hbs.registerHelper("discount", (price) => {
  return price / 0, 5;
});
hbs.registerHelper("lower", (usernameOne) => {
  return usernameOne.toLowerCase();
});

//! Express sessions
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.MY_SECRET, // signature
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);
//! Routes
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/SingUpRouter");
const loginRouter = require("./routes/loginRouter");
//* Home
app.use("/", indexRouter);
//* Register
app.use("/register", signUpRouter);
//* Login
app.use("/login", loginRouter);
//! 404 error
app.get("*", (req, res) => {
  res.render("404error");
});
//! Listen
app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
});
