const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.redirect('/auth/login');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {

      return res.redirect('/auth/login');
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authenticate;
