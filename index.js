const express = require("express");
const Cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const post = require("./routes/post");
const images = require("./routes/images");
const s3 = require("./routes/s3");

const app = express();

app.use(Cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/api/user", user);
app.use("/api/post", post);
app.use("/api/images", images);
app.use("/api/s3", s3);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to requests on port: ${port}`));
