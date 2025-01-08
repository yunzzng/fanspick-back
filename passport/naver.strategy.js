const passportNaverOauth = require('passport');
const NaverOauthStrategy = require("passport-naver").Strategy;
const { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_CLIENT_CALLBACK_URL } = require("../consts/app")


passportNaverOauth.use(new NaverOauthStrategy({
    clientID: NAVER_CLIENT_ID,
    clientSecret: NAVER_CLIENT_SECRET,
    callbackURL: NAVER_CLIENT_CALLBACK_URL,
    passReqToCallback: true,
    }, (req, accessToken, refreshToken, profile, done) => {
        const user = {
            accessToken,
            profile,
            provider: 'naver', 
            role: 'user', 
        };
        console.log("Access Token:", accessToken);
        return done(null, user);
    }
));

module.exports = passportNaverOauth;