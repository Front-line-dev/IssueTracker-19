export const authenticated = (req, res, next) => {
  if (req.user.nickname) {
    next();
    return;
  }
  res.status(401).json({ message: '로그인이 필요합니다.' });
};
