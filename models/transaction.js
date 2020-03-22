'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    customer_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  transaction.associate = models => {
    // associations can be defined here

    transaction.belongsTo(models.customer)

    transaction.belongsToMany(models.customer_vehicle, { through: 'transaction_customer_vehicle' }) 

    transaction.hasMany(models.transaction_shop_item, {
      foreignKey: 'transaction_id'
    })     

  };
  return transaction;
};