const express = require('express');
const {
  signup,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
} = require('../../controllers/oauth/user.controller');
const passport = require('passport');
const {
  handleSocialLoginCallback,
} = require('../../controllers/oauth/oauth.controller');
const router = express.Router();

// 라우터 정의
router.post('/signup', signup); // /api/oauth/signup
router.post('/login', login); // /api/oauth/login
router.get(
  '/header',
  passport.authenticate('jwt', { session: false }),
  getUserProfile,
); /// /api/oauth/header
router.post('/logout', logout); // /api/oauth/logout
router.put(
  '/profile-update',
  passport.authenticate('jwt', { session: false }),
  updateUserProfile,
); // /api/oauth/profile-update

// 간편 로그인
// 구글 로그인
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
// 구글 콜백
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   handleSocialLoginCallback
// );

// 카카오 로그인
router.get(
  '/kakao',
  passport.authenticate('kakao', {
    scope: ['profile_nickname', 'profile_image'],
  }),
);
// 카카오 콜백
// router.get(
//   "/kakao/callback",
//   passport.authenticate("kakao", { session: false }),
//   handleSocialLoginCallback
// );

// 네이버 로그인
router.get(
  '/naver',
  passport.authenticate('naver', { scope: ['profile', 'email'] }),
);
// 네이버 콜백
// router.get(
//   "/naver/callback",
//   passport.authenticate("naver", { session: false }),
//   handleSocialLoginCallback
// );

// 공통 콜백
router.get(
  '/callback',
  (req, res, next) => {
    const provider = req.query.provider;

    if (!['google', 'kakao', 'naver'].includes(provider)) {
      return res.status(400).json({ error: '유효하지 않은 provider입니다.' });
    }

    passport.authenticate(provider, { session: false })(req, res, next);
  },
  handleSocialLoginCallback,
);

module.exports = router;
