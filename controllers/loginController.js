const User = require("../models/User");
const Product = require("../models/Product");
const url = require("url");
const loginForm = (req, res) => {
  const messages = req.query;
  res.render("login", { messages });
};
const loginWithUser = (req, res) => {
  User.findOne(
    { email: req.body.email, password: req.body.password },
    (err, user) => {
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
};
//! Login Admin
const adminLoggedIn = (req, res) => {
  const userQuery = req.query;
  Product.find((err, product) => {
    User.find((err, user) => {
      res.render("productadmin", {
        products: product,
        users: user,
        userQuery,
      });
    });
  });
};
//! CreateUser Admin
const createNewUser = (req, res) => {
  const newUser = new User(req.body);
  newUser.save().then(() => {
    res.redirect("/login/productadmin");
  });
};
//! DeleteUser Admin
const deleteUser = (req, res) => {
  const deleteUserId = req.params.id;
  User.findByIdAndDelete(deleteUserId, (err, doc) => {
    console.log("User deleted:", doc);
    res.redirect(
      url.format({
        pathname: "/login/productadmin",
        query: {
          deleteMessage: `User Account: ${doc.name} has been successfully deleted`,
          deleted: true,
        },
      })
    );
  });
};
//! Login User
const loginUser = (req, res) => {
  const userQuery = req.query;
  Product.find((err, product) => {
    User.find((err, user) => {
      res.render("productuser", { product, user, userQuery });
    });
  });
};
//! User Add Product
const addProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save().then(() => {
    res.redirect("/login/productuser");
  });
};
//! Update Product User
const updateProduct = (req, res) => {
  const updateProduct = req.params.id;
  Product.findByIdAndUpdate(
    updateProduct,
    { title: "updating" },
    (err, doc) => {
      console.log("Product updated:", doc);
      res.redirect("/login/productuser");
    }
  );
};
//! Delete Product
const deleteProduct = (req, res) => {
  const deleteProductId = req.params.id;
  Product.findByIdAndDelete(deleteProductId, (err, doc) => {
    console.log("Product deleted:", doc);
    res.redirect(
      url.format({
        pathname: "/login/productuser",
        query: {
          deleteMessage: `Product Deleted: ${doc.title} has been successfully deleted`,
          deleted: true,
        },
      })
    );
  });
};
module.exports = {
  loginForm,
  loginWithUser,
  adminLoggedIn,
  createNewUser,
  deleteUser,
  loginUser,
  addProduct,
  updateProduct,
  deleteProduct,
};
