const express = require("express");
const app = express();
const colors = require("colors");
const Connect = require("./Database/connect");
const UserRoutes = require("./Routes/UserRoutes");
const PostRoutes = require("./Routes/PostRoutes");
const FollowRoutes = require("./Routes/FollowerRoutes");
require("dotenv").config();
//db connection
Connect();
app.use(express.json());
app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/follow", FollowRoutes);

app.listen(5000, () => {
  console.log("Successfully connected to port 5000".bgWhite);
});
