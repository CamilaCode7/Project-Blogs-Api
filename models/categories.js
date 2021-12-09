module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, { timestamps: false }); // Declarando timestamps false, porque tirei os campos de criação e atualização quando criei as migrations.
  return categories;
};
