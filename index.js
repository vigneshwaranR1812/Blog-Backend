const express = require("express");
const app = express();
const colors = require("colors");
const Connect = require("./Database/connect");
require("dotenv").config();
//db connection
Connect();

app.listen(5000, () => {
  console.log("Successfully connected to port 5000".bgWhite);
});
