const crypto = require('crypto');
const {
  findUserByEmail,
  createUser,
  findUserById,
  updateUserById,
} = require('../../service/oauth/oauth.service');
const jwt = require('jsonwebtoken');
const { createError } = require('../../utils/error');

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role, termsAccepted } = req.body;
    console.log('회원가입 요청 받음:', req.body);

    if (!name || !email || !password || !termsAccepted) {
      throw createError(400, '모든 필수 필드를 입력하세요.');
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw createError(400, '이미 사용 중인 이메일입니다.');
    }

    const hashedPassword = crypto
      .createHash('sha512')
      .update(password)
      .digest('base64');

    const newUser = await createUser({
      name,
      email,
      role,
      password: hashedPassword,
      termsAccepted,
    });
    console.log('새로운 사용자 생성 완료:', newUser);
    res.status(201).json({ message: '회원가입 성공!', user: newUser });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError(400, '이메일과 비밀번호를 입력하세요.');
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw createError(404, '사용자를 찾을 수 없습니다.');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    const decoded = jwt.decode(token);
    const tokenExpiry = decoded.exp * 1000;

    // res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);
    console.log('유저 정보 가져오기 성공:', user);
    res.status(200).json({
      message: '로그인 성공!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        businessNumber: user.businessNumber,
        address: user.address,
      },
      token,
      tokenExpiry,
    });
  } catch (err) {
    next(err);
  }
};

// 유저 정보 가져오기
const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // JWT로부터 디코딩된 유저 ID
    const user = await findUserById(userId);

    if (!user) {
      // return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
      throw createError(404, '유저를 찾을 수 없습니다.');
    }

    console.log('user정보:', user);

    res.status(200).json({
      message: '유저 정보 가져오기 성공!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        businessNumber: user.businessNumber,
        address: user.address,
      },
    });
  } catch (err) {
    console.error('유저 정보 가져오기 오류:', err);
    // res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    next(err);
  }
};

// 로그아웃
const logout = async (req, res, next) => {
  try {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: '로그아웃 성공!' });
  } catch (err) {
    console.error('로그아웃 오류:', err);
    // res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    next(err);
  }
};

// 프로필 수정
const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email, password, address, profileImage, businessNumber } =
      req.body;

    let updatedData = { name, email, address, profileImage, businessNumber };
    if (password) {
      const hashedPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('base64');
      updatedData.password = hashedPassword;
    }

    const user = await findUserById(userId);
    if (user.role === 'manager' && businessNumber) {
      updatedData.businessNumber = businessNumber;
    } else {
      updatedData.businessNumber = undefined;
    }

    const updatedUser = await updateUserById(userId, updatedData);
    console.log('유저 프로필 수정 완료:', updatedUser);

    res.status(200).json({
      message: '유저 프로필이 성공적으로 수정되었습니다.',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        profileImage: updatedUser.profileImage,
        role: updatedUser.role,
        provider: updatedUser.provider,
        businessNumber: updatedUser.businessNumber,
      },
    });
  } catch (err) {
    console.error('유저 프로필 수정 중 오류:', err);
    // res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    next(err);
  }
};

module.exports = {
  signup,
  login,
  getUserProfile,
  logout,
  updateUserProfile,
};
