const homePage = (req, res) => {
  // const user = { name: "Murat" };
  // req.session.user = user;
  // if (req.session.refresh) {
  //   req.session.refresh++;
  //   res.send("The website is visited for:" + req.session.refresh);
  // } else {
  //   req.session.refresh = 1;
  //   res.send("The website is visited for:" + req.session.refresh);
  // }
  res.render("home", { pageTitle: "Home Page" });
};

module.exports = { homePage };
