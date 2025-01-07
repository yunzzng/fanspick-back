const { FRONT_URL } = require('../../consts/app');

const handleSocialLoginCallback = (provider) => {
    return (req, res) => {
        console.log(`${provider} 로그인 후 req.user:`, req.user);
        const accessToken = req.user ? req.user.accessToken : null; 
        
        if (!accessToken) {
            console.log("Access Token 없음");
            return res.send("Access Token 저장 실패");
        }

        req.session.accessToken = accessToken;
        console.log("세션에 Access Token 저장됨:", accessToken);

        res.cookie("token", accessToken, {
            httpOnly: true, 
            maxAge: 10 * 1000, 
        });
        console.log("쿠키에 Access Token 저장됨:", accessToken);
        
        res.redirect(FRONT_URL);
    };
};

module.exports = {
    handleGoogleCallback: handleSocialLoginCallback("google"),
    handleKakaoCallback: handleSocialLoginCallback("kakao"),
    handleNaverCallback: handleSocialLoginCallback("naver"),
};