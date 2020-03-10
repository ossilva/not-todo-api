const express = require('express');
const _ = require('lodash');
const { authenticate } = require('../middleware/authenticate');
const { genToken, validateToken, validatePassphrase } = require('../util/cipherAWS')

const router = express.Router();

// router.post('/register', async (req, res) => {
// 	try {
// 		const body = _.pick(req.body, ['username', 'email', 'password']);
// 		const user = new User(body);
// 		await user.save();
// 		const token = await user.generateAuthToken();
// 		res.json({ user, token });
// 	} catch (err) {
// 		res.status(400).json({ error: 'Something went wrong' });
// 	}
// });

router.get('/verify', authenticate, async (_req, res) => {
	try {
		res.json({ token: res.token });
	} catch (err) {
		res.status(404).json({ error: 'could not verify passphrase' });
	}
});

router.post('/login', async (req, res) => {
	try {
		// const body = { password: req.body.password }
		await validatePassphrase(req.body.password) 
		const token = genToken(req.body.password)
		res.json({ token });
	} catch (err) {
		console.log(err)
		res.status(400).json({ error: 'Incorrect passphrase' });
	}
});


// router.delete('/logout', authenticate, async (_req, res) => {
// 	try {
// 		res.status(200).json({ message: 'logged out' });
// 	} catch (err) {
// 		res.status(502).json({ error: 'could not log you out' });
// 	}
// });

module.exports = router;
