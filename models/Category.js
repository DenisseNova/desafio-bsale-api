module.exports = function(sequelize, DataTypes){
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false 
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'category',
    associate:function(models){
      Category.hasMany(models.Product, { foreignKey: 'category' });
    }
  });

  return Category;
};