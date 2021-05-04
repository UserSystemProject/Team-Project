const url = require("url");
const signUpForm = (req, res) => {
  const message = req.query;
  res.render("signUpForm", { message });
};
const User = require("../models/User");
const signUpPost = (req, res) => {
  const newUserData = req.body;
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user === null) {
      const newUser = new User(newUserData);
      console.log("New user created:", newUser);
      newUser.save(() => {
        res.redirect("/login");
      });
    } else {
      res.redirect(
        url.format({
          pathname: "/register",
          query: {
            takenMessage: "This E-mail address is already taken!",
            isMailTaken: true,
          },
        })
      );
    }
  });
};

module.exports = { signUpForm, signUpPost };
