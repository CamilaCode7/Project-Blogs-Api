const Joi = require('joi');
const { Categories } = require('../models');

const validatePost = (req, res, next) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateExistCategories = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await Categories.findAll();
  const findAllId = categories.map((c) => c.id);
  // o findAllId faz um map no meu model Categories e retorna o id e o findId verifica se esta incluso aquele id que é minha categoria.
  const findId = categoryIds.every((id) => findAllId.includes(id));

  if (!findId) return res.status(400).json({ message: '"categoryIds" not found' });

  next();
};

const validatePostUpdate = (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validatePost,
  validateExistCategories,
  validatePostUpdate,
};