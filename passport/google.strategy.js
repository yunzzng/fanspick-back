const passportGoogleOauth = require('passport');
const GoogleOauthStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_CALLBACK_URL,  } = require("../consts/app")

passportGoogleOauth.use(new GoogleOauthStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CLIENT_CALLBACK_URL,
    passReqToCallback: true,
    }, (req, accessToken, refreshToken, profile, done) => {
        const user = {
            accessToken,
            profile,
            role: 'user', 
        };
        console.log("Access Token:", accessToken);
        return done(null, user);
    }
));

module.exports = passportGoogleOauth;