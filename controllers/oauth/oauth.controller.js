const jwt = require('jsonwebtoken');
const { FRONT_URL } = require('../../consts/app');

const handleSocialLoginCallback = async (req, res) => {
  const { provider, profile } = req.user;
  console.log(`${provider} 로그인 후 req.user:`, req.user);

  const accessToken = req.user ? req.user.accessToken : null;

  if (!accessToken) {
    console.log('Access Token 없음');
    return res.status(401).json({ message: 'Access Token 저장 실패' });
  }

  try {
    const baseUser = { provider, id: profile.id, role: 'user' };
    console.log('네이버 프로필 데이터:', req.user.profile._json);

    const user =
      provider === 'kakao'
        ? {
            ...baseUser,
            name: profile._json.properties.nickname || '',
            email: '',
            avatar: profile._json.properties.profile_image || '',
          }
        : provider === 'google'
        ? {
            ...baseUser,
            name: profile.displayName || '',
            email: profile.emails?.[0]?.value || '',
            avatar: profile.photos?.[0]?.value || '',
          }
        : provider === 'naver'
        ? {
            ...baseUser,
            name: profile._json.nickname || '',
            email: profile._json.email || '',
            avatar: profile._json.profile_image || '',
          }
        : baseUser;

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name || user.nickname || '',
        email: user.email || '',
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/;`);
    console.log('JWT 토큰 생성 및 저장 완료:', token);

    // res.status(200).json({
    //   message: '로그인 성공!',
    //   user,
    //   token,
    // });

    const redirectUrl = `${FRONT_URL}oauth/callback?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&id=${user.id}&provider=${provider}`;
    console.log('Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('프로필 정보 저장 중 오류 발생:', error);
    res.status(500).json({ success: false, message: '서버 오류 발생' });
  }
};

module.exports = {
  handleSocialLoginCallback,
};
