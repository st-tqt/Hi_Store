'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // Một mặt hàng thuộc về một giỏ hàng
      CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
      // Một mặt hàng liên kết với một sản phẩm
      CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  };
  CartItem.init({
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    }
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};