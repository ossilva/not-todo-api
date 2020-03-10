const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const S3 = require("aws-sdk/clients/s3");

const router = express.Router();

router.get("/test", authenticate, async (req, res) => {
  try {
    const s3 = res.locals.s3;
    const bucketParam = { Bucket: process.env.BUCKET };
    const testImg = s3.getSignedUrl("getObject", {
      ...bucketParam,
      Key: "cat.jpg"
    });
    // const testImg = (await s3.getObject({ ...bucketParam, Key: 'cat.jpg' }).promise())
    res.json({ src: testImg });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "This user has no posts added" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      _creator: res.user._id
    });
    const doc = await post.save();

    res.status(200).json(doc);
  } catch (err) {
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.get("/all", authenticate, async (req, res) => {
  try {
    const s3 = res.locals.s3;
    const bucketParam = { Bucket: process.env.BUCKET };
    const imagesContent = (await s3.listObjectsV2(bucketParam).promise())
      .Contents;
    console.log(imagesContent);
    const images = imagesContent.map(({ Key, LastModified }) => ({
      Key,
      LastModified
    }));
    const imgUrlPromises = images
      .map(imgObj => imgObj.Key)
      .map(Key => {
        return s3.getSignedUrlPromise("getObject", { ...bucketParam, Key });
      });
    const imgUrls = await Promise.all(imgUrlPromises);
    console.log(imgUrls);
    images.forEach((imgObj, i) => {
      imgObj.url = imgUrls[i];
    });
    res.status(200).json(images);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "This user has no posts added" });
  }
});

module.exports = router;
