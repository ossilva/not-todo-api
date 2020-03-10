const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const s3Zip = require("s3-zip");

const router = express.Router();

router.post("/file/:fname", authenticate, (req, res) => {
  const s3 = res.locals.s3;
  const aux = req.body.aux;
  const bucketParam = { Bucket: process.env.BUCKET };
  s3.createPresignedPost(
    {
      ...bucketParam,
      Fields: { key: req.params.fname, ...aux }
    },
    (err, data) => {
      res.send(data);
    }
  );
});

router.post("/zip", authenticate, (req, res) => {
  const s3 = res.locals.s3;
  const dlKeys = req.body;
  res.set({
    "Content-Type": "application/zip"
  });
  s3Zip.archive({ s3, bucket: process.env.BUCKET }, ".", dlKeys).pipe(res);
});

module.exports = router;
