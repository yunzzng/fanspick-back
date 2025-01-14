const jwt = require('jsonwebtoken');
const {
  createUser,
  findUserByEmail,
} = require('../../service/oauth/oauth.service');
const { FRONT_URL } = require('../../consts/app');

const handleSocialLoginCallback = async (req, res) => {
  const { provider, profile } = req.user;

  const accessToken = req.user ? req.user.accessToken : null;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access Token 저장 실패' });
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
            email: '',
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

    const existingUser =
      (await findUserByEmail(userData.email)) || (await createUser(userData));

    const token = jwt.sign(
      {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );


    const redirectUrl = `${FRONT_URL}oauth/callback?token=${token}&id=${
      existingUser._id
    }&name=${encodeURIComponent(existingUser.name)}&email=${encodeURIComponent(
      existingUser.email,
    )}&role=${existingUser.role}&profileImage=${encodeURIComponent(
      existingUser.profileImage,
    )}&provider=${provider}`; 

    res.redirect(redirectUrl);
    console.log('Redirect URL:', redirectUrl);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ success: false, message: '서버 오류 발생' });
  }
};

module.exports = {
  handleSocialLoginCallback,
};
