module.exports = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: true, createdAt: 'published', updatedAt: 'updated' }); // Declarando timestamps false, porque tirei os campos de criação e atualização quando criei as migrations.
  // belongsTo - pertenca a
  // Ou seja esta referindo que meu userId da tabela BlogPosts pertence ao compo id tabela Users com alias de user.
  blogPost.associate = (models) => {
    blogPost.belongsTo(models.Users,
    // belongsTo - pertenca a
    // Esta referindo que post no campo userId pertence a tabela users.
      { foreignKey: 'userId', as: 'user' });
  };
  return blogPost;
};
