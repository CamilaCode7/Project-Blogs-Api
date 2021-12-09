const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createToken = (payload) => {
  const jtwConfig = {
    expiresIn: '30M',
    algorithm: 'HS256', 
  };
  const token = jwt.sign(payload, secret, jtwConfig);
  return { token };
};
const validateToken = (token) => jwt.verify(token, secret);

module.exports = {
  createToken,
  validateToken,
};