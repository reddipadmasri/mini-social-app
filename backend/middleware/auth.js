const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET_KEY';

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // decoded = { userId, username, iat, exp }
    req.user = {
      userId: decoded.userId,
      username: decoded.username
    };

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
