const express = require("express");
const app = express.Router();

app.set(express.static(`${__dirname}/public`));

app.listen(5000, () => {
  console.log("Server is running on PORT:" + 5000);
});
