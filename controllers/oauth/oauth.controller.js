const jwt = require('jsonwebtoken');
const { createUser } = require('../../service/oauth/oauth.service');
const { FRONT_URL } = require('../../consts/app');
const createError = require('../../utils/error');

const handleSocialLoginCallback = async (req, res) => {
  const { provider, profile } = req.user;

  console.log('Authenticated User:', req.user);

  const accessToken = req.user ? req.user.accessToken : null;
  if (!accessToken) {
    throw createError(401, 'Access Token 저장 실패');
  }

  try {
    const baseUser = {
      provider,
      role: 'user',
      termsAccepted: true,
    };

    const userData = 
      provider === 'kakao'
        ? {
            ...baseUser,
            name: profile._json.properties.nickname || '',
            email: profile._json.kakao_account.email ||  `example${Date.now()}@example.com`,
            profileImage: profile._json.properties.profile_image || '',
          }
        : provider === 'google'
        ? {
            ...baseUser,
            name: profile.displayName || '',
            email: profile.emails?.[0]?.value || '',
            profileImage: profile.photos?.[0]?.value || '',
          }
        : provider === 'naver'
        ? {
            ...baseUser,
            name: profile._json.nickname || '',
            email: profile._json.email || '',
            profileImage: profile._json.profile_image || '',
          }
        : baseUser;

    if (!userData.email) {
      console.error(`Email not found for provider: ${provider}`);
      throw createError(400, '이메일 정보가 없습니다.');
    }

    const newUser = await createUser(userData);

    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        provider: newUser.provider,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const redirectUrl = `${FRONT_URL}oauth/callback?token=${token}&id=${
      newUser._id
    }&name=${encodeURIComponent(newUser.name)}&email=${encodeURIComponent(
      newUser.email
    )}&role=${newUser.role}&profileImage=${encodeURIComponent(
      newUser.profileImage
    )}&provider=${provider}`;

    res.redirect(redirectUrl);
    console.log('Redirect URL:', redirectUrl);
  } catch (error) {
    // console.error('Error occurred:', error);
    // res.status(500).json({ success: false, message: '서버 오류 발생' });
    next(err);
  }
};

module.exports = {
  handleSocialLoginCallback,
};