const url = require("url");
const bcrypt = require("bcrypt");
const faker = require("faker");
const signUpForm = (req, res) => {
  const message = req.query;
  res.render("signUpForm", { message });
};

const User = require("../models/User");
const signUpPost = (req, res) => {
  //* Test Faker.js
  let newUserData = req.body;
  //! Encoding password
  // how many times hash it => saltRounds
  const saltRounds = 10;
  // bcrypt.genSalt(saltRounds,(err,salt)=>{
  // })
  bcrypt.hash(newUserData.password, saltRounds, (err, hashedPassword) => {
    // old password value = hashed password
    newUserData.password = hashedPassword;
  });
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
