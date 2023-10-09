require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose
  .connect(dbConfig.url)
  .then(function () {
    console.log("Connected to MongoDB Server");
  })
  .catch(function (err) {
    console.log(err);
  });

app.get("/testRoute", (req, res) => {
  res.send("Server is running");
});

require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/comment.route")(app);
require("./routes/post.route")(app);
require("./routes/notification.route")(app);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
