'use strict';
module.exports = (sequelize, DataTypes) => {
  const shop_item = sequelize.define('shop_item', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {});
  shop_item.associate = models => {
    // associations can be defined here
    shop_item.belongsTo(models.transaction_shop_item)
  };
  return shop_item;
};