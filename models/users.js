module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false }); // Declarando timestamps false, porque tirei os campos de criação e atualização quando criei as migrations.

  user.associate = (models) => {
    user.hasMany(models.BlogPosts,
    // hasMany -> Tem muito
    // Ou seja a tabela pode esta referenciando o id para muitos blogposts
      { foreignKey: 'userId', as: 'posts' });
    // A chave estrangeira que vai esta representando meu usuario na tabela posts vai ser userId
  };
  return user;
};
