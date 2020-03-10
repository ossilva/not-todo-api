const express = require('express');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { authenticate } = require('../middleware/authenticate');
const S3 = require('aws-sdk/clients/s3');

const router = express.Router();

router.get('/test', authenticate,  async (req, res) => {
	try {
		const s3 = res.locals.s3
		const bucketParam = { Bucket: process.env.BUCKET }
		const testImg = s3.getSignedUrl( 'getObject', { ...bucketParam, Key: 'cat.jpg' })
		// const testImg = (await s3.getObject({ ...bucketParam, Key: 'cat.jpg' }).promise())
		res.json({ src: testImg })
	} catch (err) {
		console.log(err)
		res.status(400).json({ error: 'This user has no posts added' });
	}
})

router.post('/', authenticate, async (req, res) => {
	try {
		const post = new Post({
			title: req.body.title,
			_creator: res.user._id
		});
		const doc = await post.save();

		res.status(200).json(doc);
	} catch (err) {
		res.status(400).send({ error: 'Something went wrong' });
	}
});

router.get('/all', authenticate, async (req, res) => {
	try {
		const s3 = res.locals.s3
		const bucketParam = { Bucket: process.env.BUCKET }
		const imagesContent = (await s3.listObjectsV2(bucketParam).promise()).Contents
		console.log(imagesContent)
		const images = imagesContent.map(({ Key, LastModified, Metadata }) => (
                { Key, LastModified, Metadata }
            ))
		const imgUrlPromises = images.map(imgObj => imgObj.Key).map(Key => {
			return (
				s3.getSignedUrlPromise( 'getObject', { ...bucketParam, Key })
			)
		})
		const imgUrls = await Promise.all(imgUrlPromises)
		images.forEach((imgObj, i) => {
            if (imgObj.Metadata) {
                        imgObj.img_width = imgObj.Metadata['x-amz-meta-img_width']
                        imgObj.img_height = imgObj.Metadata['x-amz-meta-img_height']
            }
			imgObj.url = imgUrls[i]
        })
        console.log(images)
		res.status(200).json(images);
	} catch (err) {
		console.log(err)
		res.status(400).json({ error: 'This user has no posts added' });
	}
});

// router.get('/all', authenticate, async (req, res) => {
// 	try {
// 		const s3 = req.locals.s3
// 		const bucketParam = { Bucket: process.env.BUCKET }
// 		const imagesContent = (await s3.listObjectsV2(bucketParam)).content
// 		const images = imagesContent.content.map(({ Key, LastModified }))
// 		res.status(200).json(images);
// 	} catch (err) {
// 		res.status(400).json({ error: 'This user has no posts added' });
// 	}
// });

// router.get('/:id', authenticate, async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		if (!ObjectID.isValid(id)) {
// 			return res.status(404).json({ error: 'Invalid ID' });
// 		}
// 		const post = await Post.findOne({ _id: id, _creator: res.user._id });
// 		res.status(200).json(post);
// 	} catch (err) {
// 		res.status(400).json({ error: 'Unable to find that post' });
// 	}
// });

// router.delete('/:id', authenticate, async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		if (!ObjectID.isValid(id)) {
// 			return res.status(404).send('Invalid ID');
// 		}

// 		const post = await Post.findOneAndRemove({
// 			_id: id,
// 			_creator: res.user._id
// 		});

// 		if (!post) {
// 			return res.status(400).json({ error: 'Unable to delete that post' });
// 		}

// 		res.status(200).json({ error: 'Post has been removed successfully!' });
// 	} catch (err) {
// 		res.status(400).send({ error: 'Something went wrong' });
// 	}
// });

// router.patch('/:id', authenticate, async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const body = _.pick(req.body, ['title', 'isDone']);

// 		if (!ObjectID.isValid(id)) {
// 			return res.status(404).json({ error: 'Invalid ID' });
// 		}
// 		const post = await Post.findOneAndUpdate(
// 			{
// 				_id: id,
// 				_creator: res.user._id
// 			},
// 			{ $set: body },
// 			{ new: true }
// 		);

// 		if (!post) {
// 			return res.status(404).json({ error: 'Unable to update that post' });
// 		}

// 		res.status(200).json(post);
// 	} catch (err) {
// 		res.status(400).send({ error: 'Something went wrong' });
// 	}
// });

module.exports = router;
