const express = require('express');
const { signup, login, logout, getUserProfile } = require('../../controllers/oauth/oauth.controller');

const jwtMiddleware = require('../../middleware/jwtMiddleware');

const router = express.Router();

// 라우터 정의
router.post('/signup', signup); // /api/oauth/signup
router.post('/login', login); // /api/oauth/signup
router.get('/header', jwtMiddleware, getUserProfile); // /api/oauth/header
router.post('/logout', jwtMiddleware, logout); // /api/oauth/logout

module.exports = router;