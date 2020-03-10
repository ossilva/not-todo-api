const { openS3ForToken } = require("../util/cipherAWS");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("x-auth");
    res.locals.s3 = await openS3ForToken(token);
    res.token = token;
    return next();
  } catch (err) {
    console.log(err);
    res.status(401).send();
  }
};

module.exports = { authenticate };
