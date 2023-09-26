const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
});

exports.sendFile = async (key, buffer, contentType) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }

  const command = new PutObjectCommand(params);
  await s3.send(command);
};

exports.makeTempImgUrl = async (img) => {
  const getObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: img
  }

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });

  return url;
}

exports.deleteFile = async(img) => {
  const getObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: img
  }

  const command = new DeleteObjectCommand(getObjectParams);
  await s3.send(command);
}

