const services = require('../services/postServices');

const create = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req;
  const { dataValues } = await services.create({ title, content, userId });

  delete dataValues.updated;
  delete dataValues.published;
  return res.status(201).json(dataValues);
};

const getAllPost = async (_req, res) => {
  const response = await services.getAllPost();
  return res.status(200).json(response);
};

const findByIdPost = async (req, res) => {
  const { id } = req.params;
  const response = await services.findByIdPost(id);
  if (!response) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(response);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { userId } = req;
  const response = await services.update({ id, title, content, userId });
  if (!response) return res.status(401).json({ message: 'Unauthorized user' });
  return res.status(200).json(response);
};

const deleta = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const response = await services.deleta(id);
  if (!response) return res.status(404).json({ message: 'Post does not exist' });
  if (response.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });
  return res.status(204).end();
};

module.exports = {
  create,
  getAllPost,
  findByIdPost,
  update,
  deleta,
};