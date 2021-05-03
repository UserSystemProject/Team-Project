const homePage = (req, res) => {
  res.render("home", { pageTitle: "Home Page" });
};

module.exports = { homePage };
