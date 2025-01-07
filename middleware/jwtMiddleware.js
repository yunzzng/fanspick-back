const jwt = require('jsonwebtoken');
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
const jwtMiddleware = (req, res, next) => {
  try {
    // 쿠키에서 토큰 추출
    const cookies = req.headers.cookie;
    console.log('JWT Middleware: 쿠키에서 가져온 전체 쿠키:', cookies);
    console.log("JWT Middleware: 쿠키 내용:", req.headers.cookie);

    if (!cookies) {
      return res
        .status(400)
        .json({ isError: true, message: '인증 토큰이 없습니다.' });
    }

    // 쿠키에서 'token' 키에 해당하는 값을 파싱
    const token = cookies
      .split('; ')
      .find((cookie) => cookie.startsWith('token='))
      ?.split('=')[1];

      console.log("JWT Middleware: 추출된 토큰:", token);

    if (!token) {
      return res
        .status(400)
        .json({ isError: true, message: '인증 토큰이 없습니다.' });
    }
    // 400: 잘못된 요청(값 누락)
    // 401: 인증 오류

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('JWT Middleware: 디코딩된 토큰:', decoded);
    req.user = decoded;

    next(); 
  } catch (error) {
    console.error('[jwtmiddleware] Error:', error);
    return res
      .status(401)
      .json({ isError: true, message: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = jwtMiddleware;
