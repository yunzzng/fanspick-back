const jwt = require("jsonwebtoken");

const handleSocialLoginCallback = async (req, res) => {
  const { provider, profile } = req.user;
  console.log(`${provider} 로그인 후 req.user:`, req.user);

  const accessToken = req.user ? req.user.accessToken : null;

  if (!accessToken) {
    console.log("Access Token 없음");
    return res.status(401).json({ message: "Access Token 저장 실패" });
  }

  try {
    let user = { provider, id: profile.id, role: "user" };

    if (provider === "kakao") {
      user = {
        ...user,
        nickname: profile._json.properties.nickname || "",
        avatar: profile._json.properties.profile_image || "",
      };
    }

    if (provider === "google") {
      user = {
        ...user,
        email: profile.emails?.[0]?.value || "",
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value || "",
      };
    }

    if (provider === "naver") {
      user = {
        ...user,
        email: profile._json.email || "",
        name: profile._json.nickname || "",
        avatar: profile._json.profile_image || "",
      };
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user.id, email: user.email || user.nickname, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/;`);
    console.log("JWT 토큰 생성 및 저장 완료:", token);

    res.status(200).json({
      message: "로그인 성공!",
      user,
      token,
    });
  } catch (error) {
    console.error("프로필 정보 저장 중 오류 발생:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = {
  handleSocialLoginCallback,
};
