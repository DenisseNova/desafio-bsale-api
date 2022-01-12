module.exports = function(sequelize, DataTypes){
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    price: {
      type: DataTypes.FLOAT,
    },
    discount: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'product',
    associate:function(models){
      Product.belongsTo(models.Category, { foreignKey: 'category' });
    }
  });

  return Product;
};