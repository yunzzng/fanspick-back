const handleSocialLoginCallback = async (req, res) => {
    const { provider, profile } = req.user;
    console.log(`${provider} 로그인 후 req.user:`, req.user);

    const accessToken = req.user ? req.user.accessToken : null;

    if (!accessToken) {
        console.log("Access Token 없음");
        return res.status(400).json({ message: "Access Token 저장 실패" });
    }

    // 세션에 Access Token 저장
    req.session.accessToken = accessToken;
    console.log("세션에 Access Token 저장됨:", accessToken);

    // 쿠키에 Access Token 저장
    res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1일
    });
    console.log("쿠키에 Access Token 저장됨:", accessToken);

    try {
        let user = { provider, id: profile.id, role: 'user' };

        if (provider === 'kakao') {
            user = {
                ...user,
                nickname: profile._json.properties.nickname || '',
                avatar: profile._json.properties.profile_image || '',
            };
        }
        
        if (provider === 'google') {
            user = {
                ...user,
                email: profile.emails?.[0]?.value || '',
                name: profile.displayName,
                avatar: profile.photos?.[0]?.value || '',
            };
        }

        if (provider === 'naver') {
            user = {
                ...user,
                email: profile._json.email || '',
                name: profile._json.nickname || '',
                avatar: profile._json.profile_image || '',
            };
        }

        console.log("프로필 정보 저장 준비:", user);

        // DB 저장 로직 (선택적)
        // await saveUserToDatabase(user);

        console.log("프로필 정보 저장 완료:", user);

        // JSON으로 유저 정보 전달
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("프로필 정보 저장 중 오류 발생:", error);
        res.status(500).json({ success: false, message: "서버 오류 발생" });
    }
};

module.exports = {
    handleSocialLoginCallback,
};