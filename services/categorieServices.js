const { Categories } = require('../models');

const create = async (name) => Categories.create({ name });

const getAllCategories = async () => Categories.findAll();

module.exports = {
  create,
  getAllCategories,
};