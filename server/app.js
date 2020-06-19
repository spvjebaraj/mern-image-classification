const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("./db/mongoose");
const userRouter = require("./routers/user");
const classificationRouter = require("./routers/classification");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(classificationRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client", "build", "index.html"));
  });
}

module.exports = app;
