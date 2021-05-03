const signUpForm = (req, res) => {
  res.render("signUpForm");
};
const User = require("../models/User");
const signUpPost = (req, res) => {
  const newUser = new User(req.body);
  console.log("New user created:", newUser);
  newUser.save(() => {
    res.redirect("/login");
  });
};

module.exports = { signUpForm, signUpPost };
