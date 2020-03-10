const express = require("express");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

router.get("/all", authenticate, async (req, res) => {
  try {
    const s3 = res.locals.s3;
    const getObjUrls = keyList => {
      return keyList.map(Key => {
        return s3.getSignedUrlPromise("getObject", { ...bucketParam, Key });
      });
    };
    const getObjMeta = keyList => {
      return keyList.map(Key => {
        return s3.headObject({ ...bucketParam, Key }).promise();
      });
    };
    const bucketParam = { Bucket: process.env.BUCKET };
    const getData = await s3.listObjectsV2(bucketParam).promise();
    const imagesContent = getData.Contents;
    const images = imagesContent.map(({ Key, LastModified, Metadata }) => ({
      Key,
      LastModified,
      Metadata
    }));
    const keyList = images.map(imgObj => imgObj.Key);
    const imgUrlPromises = getObjUrls(keyList);
    const imgMetaPromises = getObjMeta(keyList);
    const imgUrlsProm = Promise.all(imgUrlPromises);
    const imgMetaProm = Promise.all(imgMetaPromises);
    const [imgUrls, imgMeta] = await Promise.all([imgUrlsProm, imgMetaProm]);
    const sameLength = arr =>
      arr.map(x => x.length).reduce((a, b) => (a === b ? b : null));
    if (!sameLength([images, keyList, imgUrls, imgMeta])) {
      throw Error("data for some keys not retrieved");
    }
    images.forEach((imgObj, i) => {
      if (imgMeta[i].Metadata) {
        imgObj.img_width = imgMeta[i].Metadata["img_width"];
        imgObj.img_height = imgMeta[i].Metadata["img_height"];
        imgObj.tags = imgMeta[i].Metadata["tag_string"] || "";
      }
      imgObj.url = imgUrls[i];
    });
    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Could not retrieve images" });
  }
});

module.exports = router;
