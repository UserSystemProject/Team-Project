const express = require("express");
const app = express();
const PORT = 5000;
const session = require("express-session");
//! Mongoose Connection
const connectDB = require("./Config/db");
connectDB();
//! Setting
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
//! Express sessions
app.use(
  session({
    secret: "I am a spy", // signature
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
