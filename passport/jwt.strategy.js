const passportJwt = require('passport');
const { JWT_SECRET } = require('../consts/app');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// JwtStrategy 토큰을 검증
passportJwt.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET, 
    }, (payload, done) => {
        console.log(payload);
        return done(null, {isError: false, message: "Valid Token."});
    })
);

module.exports = passportJwt;