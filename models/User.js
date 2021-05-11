const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  country: String,
  address: String,
  salary: Number,
  role: String,
  pictureName: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
