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
