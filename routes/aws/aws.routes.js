const express = require('express');
const passport = require('passport');

const {
  getPresignedUrl,
  getMultiPresignedUrl,
} = require('../../controllers/aws/aws.controller');
const router = express.Router();

router.get(
  '/presigned-url',
  passport.authenticate('jwt', { session: false }),
  getPresignedUrl,
); // /api/aws/presigned-url

router.get(
  '/presigned-urls',
  passport.authenticate('jwt', { session: false }),
  getMultiPresignedUrl,
); // /api/aws/presigned-urls

module.exports = router;
