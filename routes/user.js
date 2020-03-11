const express = require("express");
<<<<<<< HEAD
=======
const _ = require("lodash");
>>>>>>> e67e3ce59c2af9f441f2ee922a99611fc4324757
const { authenticate } = require("../middleware/authenticate");
const {
  genToken,
  validateToken,
  validatePassphrase
} = require("../util/cipherAWS");

const router = express.Router();

router.get("/verify", authenticate, async (_req, res) => {
  try {
    res.json({ token: res.token });
  } catch (err) {
    res.status(404).json({ error: "could not verify passphrase" });
  }
});

router.post("/login", async (req, res) => {
  try {
    // const body = { password: req.body.password }
    await validatePassphrase(req.body.password);
    const token = genToken(req.body.password);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Incorrect passphrase" });
  }
});

module.exports = router;
