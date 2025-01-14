const {
  createPresignedUrl,
  createMultiPresignedUrls,
} = require('../../service/aws/s3Service');

/* presignedUrl 가져오기 */
const getPresignedUrl = async (req, res) => {
  try {
    const url = await createPresignedUrl();
    res.status(200).json({ url, message: 'presigned URL 가져오기 성공' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/* presignedUrl 가져오기(다중) */
const getMultiPresignedUrl = async (req, res) => {
  const { fileCount } = req.query;
  try {
    const urls = await createMultiPresignedUrls(fileCount);
    res.status(200).json({ urls, message: '다중 presigned URL 가져오기 성공' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPresignedUrl,
  getMultiPresignedUrl,
};
