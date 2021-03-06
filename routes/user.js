const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const { genToken, validatePassphrase } = require("../util/cipherAWS");

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
    res.status(400).json({ error: "failed to authenticate" });
  }
});

module.exports = router;
