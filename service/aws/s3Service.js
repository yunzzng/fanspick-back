const AWS = require('aws-sdk');
const {
  VITE_ACCESS_KEY_ID,
  VITE_SECRET_ACCESS_KEY,
  VITE_REGION,
} = require('../../consts/app');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: VITE_ACCESS_KEY_ID,
  secretAccessKey: VITE_SECRET_ACCESS_KEY,
  region: VITE_REGION,
});

/* 단일 이미지 등록할때 url생성 */
const createPresignedUrl = async () => {
  const timestamp = Date.now();
  const s3Params = {
    Bucket: 'fanspick',
    Key: `images/${timestamp}`,
    Expires: 300,
    ContentType: 'image/png',
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', s3Params);
    return url;
  } catch (err) {
    throw new Error('presigned URL 생성중 오류');
  }
};

/* 다중 이미지 등록할때 url생성 */
const createMultiPresignedUrls = async (fileCount) => {
  const timestamp = Date.now();
  const s3ParamsArr = Array.from({ length: fileCount }, (_, index) => ({
    Bucket: 'fanspick',
    Key: `images/${timestamp}_${index}`,
    Expires: 300,
    ContentType: 'image/png',
  }));

  try {
    const urls = await Promise.all(
      s3ParamsArr.map((params) => s3.getSignedUrlPromise('putObject', params)),
    );
    return urls;
  } catch (err) {
    throw new Error('다중 presigned URL 생성중 오류');
  }
};

module.exports = { createPresignedUrl, createMultiPresignedUrls };
