require("dotenv").config();
const crypto = require("crypto");
const S3 = require("aws-sdk/clients/s3");

const credsEnc = process.env.CREDS_ENCRYPTED;

const decipherCreds = passphrase => {
  const key = crypto.scryptSync(passphrase, "sal", 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv("aes-192-cbc", key, iv);
  let decrypted = decipher.update(credsEnc, "hex", "utf8");
  decrypted += decipher.final("utf8");
  const creds = JSON.parse(decrypted);
  return {
    accessKeyId: creds.id,
    secretAccessKey: creds.secret
  };
};

const genToken = passphrase => {
  try {
    const cipher = crypto.createCipher("aes-192-cbc", credsEnc);
    let token = cipher.update(new Date().getTime().toString(), "utf8", "hex");
    token += cipher.update(";" + passphrase, "utf8", "hex");
    token += cipher.final("hex");
    return token;
  } catch (error) {
    throw Error(
      `CREDS environment variable not compatible with algorithm
            ${error}`
    );
  }
};

const decipherToken = token => {
  try {
    const decipher = crypto.createDecipher("aes-192-cbc", credsEnc);
    let decrypted = decipher.update(token, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    throw Error(
      `Could not decipher token
            ${error}`
    );
  }
};

const validateTokenTime = tokenDecrypted => {
  try {
    const [unixT, _pw] = tokenDecrypted.split(";");
    const tDiff = new Date().getTime() - Number(unixT);
    const tDiffDays = tDiff / (3 * 86400000);
    return tDiffDays < 1; // 3 days in unix ms is token validty
  } catch (error) {
    throw error;
  }
};

const getS3ForPass = async passphrase => {
  const options = { Bucket: process.env.BUCKET };
  const region = process.env.BUCKET_REGION;
  const signatureVersion = process.env.SIGN_V;
  const creds = decipherCreds(passphrase);
  try {
    const s3 = new S3({
      params: { ...creds },
      region,
      signatureVersion,
      s3ForcePathStyle: "true"
    });
    const bucketHead = s3.headBucket({ ...options });
    await bucketHead.promise();
    return s3;
  } catch (error) {
    throw Error(`AWS error:
        ${error}`);
  }
};

const validateTokenCipher = async tokenDecrypted => {
  const [_unixT, passphrase] = tokenDecrypted.split(";");
  return Boolean(await getS3ForPass(passphrase));
};

const validateToken = async token => {
  const decrypted = decipherToken(token);
  const s3 =
    validateTokenTime(decrypted) && (await validateTokenCipher(decrypted));

  if (!s3) {
    throw Error("Could not authenticate token");
  }
  return true;
};

const openS3ForToken = async token => {
  const decrypted = decipherToken(token);
  const [_unixT, passphrase] = decrypted.split(";");

  return validateTokenTime(decrypted) && (await getS3ForPass(passphrase));
};

module.exports = {
  genToken,
  validateToken,
  validateTokenCipher,
  validatePassphrase: getS3ForPass,
  openS3ForToken
};
