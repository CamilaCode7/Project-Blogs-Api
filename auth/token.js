const { validateToken } = require('./validaJWT');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
  
    const { payload: { id } } = validateToken(authorization);
    
    req.userId = id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};