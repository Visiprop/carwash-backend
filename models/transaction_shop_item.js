'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction_shop_item = sequelize.define('transaction_shop_item', {
    transaction_id: DataTypes.INTEGER,
    shop_item_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    isDeleted: DataTypes.INTEGER
  }, {})
  transaction_shop_item.associate = models => {
    // associations can be defined here
    transaction_shop_item.hasOne(models.shop_item)
    transaction_shop_item.belongsTo(models.transaction)

  }
  return transaction_shop_item
}