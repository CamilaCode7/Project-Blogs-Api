const Joi = require('joi');
const { findByEmail } = require('../services/userService');

const validaUser = (req, res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateUserRegistered = async (req, res, next) => {
  const { email } = req.body;
  const response = await findByEmail(email);
  if (response) return res.status(409).json({ message: 'User already registered' });
  next();
};

module.exports = {
  validaUser,
  validateUserRegistered,
};