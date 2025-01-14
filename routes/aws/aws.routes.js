const express = require('express');
const {
  getPresignedUrl,
  getMultiPresignedUrl,
} = require('../../controllers/aws/aws.controller');
const router = express.Router();

router.get('/presigned-url', getPresignedUrl); // /api/aws/presigned-url
router.get('/presigned-urls', getMultiPresignedUrl); // /api/aws/presigned-urls

module.exports = router;
