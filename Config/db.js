require("dotenv").config();
const mongoose = require("mongoose");

const dataBaseName = process.env.dataBaseHiddenName;
const dataBaseLink = process.env.dataBaseHiddenLink + dataBaseName;
const connectDB = async () => {
  try {
    await mongoose.connect(dataBaseLink, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    process.exit(1);
  }
};

module.exports = connectDB;
