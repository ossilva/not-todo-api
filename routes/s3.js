const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const S3 = require('aws-sdk/clients/s3');

const router = express.Router();

router.post('/:fname', authenticate, (req, res) => {
    const s3 = res.locals.s3
    const aux = req.body.aux
    const bucketParam = { Bucket: process.env.BUCKET };
    s3.createPresignedPost({
         ...bucketParam,
         Fields: {key: req.params.fname, ...aux}
    }, (err, data) => {
        console.log(data)
        res.send(data)
    }
    );
})


module.exports = router;
