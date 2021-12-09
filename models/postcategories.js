module.exports = (sequelize, _DataTypes) => {
  const postsCategorie = sequelize.define('PostsCategories',
  {},
  { timestamps: false });

  // belongsToMany -> cria um relacionamento n:n, usando PostsCategories como tabela de associação
  postsCategorie.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories', // alias da minha associação
      through: 'PostsCategories', // tabela de associação.
      foreignKey: 'postId', // referencia a model que chamo a belongsToMany
      otherKey: 'categoryId' }); // refere ao model com o qual estou criando a associação

    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: 'PostsCategories',
      foreignKey: 'categoryId',
      otherKey: 'postId' });
    };
  return postsCategorie;
};
