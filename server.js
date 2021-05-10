const express = require("express");
const app = express();
const PORT = 8000;
const session = require("express-session");

//! Register helper
const hbs = require("hbs");
hbs.registerHelper("ifEqual", (arg1, arg2, options) => {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

//! Mongoose Connection
const connectDB = require("./Config/db");
connectDB();
//! Setting
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

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
    secret: "I am a spy",
    cookie: {
      // cookie maxAge defines time limit which data keeps saved
      maxAge: 1000 * 60 * 10,
      // expires: new Date()
    },
  })
);
//! Routes
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/SingUpRouter");
const loginRouter = require("./routes/loginRouter");
//* faker
const faker = require("faker");
app.get("/test/fakedata", (req, res) => {
  const fakeUserData = {
    name: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
    profile_pic: faker.image.avatar(),
  };
  console.log(fakeUserData);
  res.render("home");
});

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
