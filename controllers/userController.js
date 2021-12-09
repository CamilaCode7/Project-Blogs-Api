const { createToken } = require('../auth/validaJWT');
const services = require('../services/userService');

// Consultei este repositorio na validação https://github.com/tryber/sd-011-project-blogs-api/tree/erick-marinho-blogs-api 

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const existUser = await services.findByEmail(email);
  if (existUser) return { message: 'User already registered' };
  const { dataValues } = await services.create(displayName, email, password, image);
  delete dataValues.password; // esse delete esta excluindo o campo de password do meu payload na hora de gerar o token.
  const token = createToken({ payload: dataValues });
  return res.status(201).json(token);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await services.findByEmail(email);
  if (!response || response.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  delete response.password;
  const token = createToken({ payload: response });
  return res.status(200).json(token);
};

const getAllUser = async (req, res) => {
  const response = await services.getAllUser();
  return res.status(200).json(response);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const response = await services.findById(id);
  if (!response) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(response);
};

const deleta = async (req, res) => {
  // Passando o userId, quando executa a função delete no model, exclui o meu usuario.
  const { userId } = req;
  await services.deleta(userId);
  return res.status(204).end();
};

module.exports = {
  create,
  login,
  getAllUser,
  findById,
  deleta,
};