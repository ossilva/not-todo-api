const express = require("express");
const Cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const post = require("./routes/post");
const images = require("./routes/images");
const s3 = require("./routes/s3");
const { allowed_url } = require("./config/config.js");

const app = express();

app.use(
  Cors({
    origin: process.origin === "DEV" ? "http://localhost" : allowed_url
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", user);
app.use("/api/post", post);
app.use("/api/images", images);
app.use("/api/s3", s3);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to requests on port: ${port}`));
