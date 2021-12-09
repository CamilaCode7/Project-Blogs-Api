const { BlogPosts, Users, Categories } = require('../models');

const create = async ({ title, content, userId }) => 
  BlogPosts.create({ title, content, userId });

const getAllPost = async () => BlogPosts.findAll({
  include: [
    { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    { model: Categories, as: 'categories', through: { attributes: [] } },
  ],
});

// Daria pra fazer com findOne, pega pelo id da mesma forma, porem precisa de colocar o where.
const findByIdPost = async (id) => BlogPosts.findByPk(id, {
  include: [
    { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    { model: Categories, as: 'categories', through: { attributes: [] } },
  ],
});

const update = async ({ id, title, content, userId }) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      {
        model: Categories,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  // Faço a validação que somente o usuario que criou meu post, pode editar o title e o content.
  if (!post || post.userId !== userId) return null;

  await BlogPosts.update({ title, content }, { where: { id } });
  const { categories } = post;
  return { title, content, userId, categories };
};

const deleta = async (id) => {
  const post = await BlogPosts.findOne({ where: { id } });
  // Faço a validação que somente o usuario que criou meu post, pode editar o title e o content.
  if (!post) return null;

  await BlogPosts.destroy({ where: { id } });
 
  return post;
};

module.exports = {
  create,
  getAllPost,
  findByIdPost,
  update,
  deleta,
};