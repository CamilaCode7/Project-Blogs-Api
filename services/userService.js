const { Users } = require('../models');

const findByEmail = async (email) => {
  const response = await Users.findOne({ where: { email } });
  return response;
};

const create = async (displayName, email, password, image) => Users.create({
  displayName, email, password, image,
});

const getAllUser = async () => Users.findAll({ attributes: { exclude: ['password'] } });

const findById = async (id) => {
  const response = await Users.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return response;
};

const deleta = async (id) => Users.destroy({ where: { id } });

module.exports = {
  create,
  findByEmail,
  getAllUser,
  findById,
  deleta,
};