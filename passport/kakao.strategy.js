const passportKakaoOauth = require("passport");
const KakaoOauthStrategy = require("passport-kakao").Strategy;
const {
  KAKAO_CLIENT_ID,
  KAKAO_CLIENT_SECRET,
  KAKAO_CALLBACK_URL,
} = require("../consts/app");

passportKakaoOauth.use(
  new KakaoOauthStrategy(
    {
      clientID: KAKAO_CLIENT_ID,
      clientSecret: KAKAO_CLIENT_SECRET,
      callbackURL: KAKAO_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        accessToken,
        profile,
        provider: "kakao",
        role: "user",
      };
      console.log("Access Token:", accessToken);
      return done(null, user);
    }
  )
);

module.exports = passportKakaoOauth;
