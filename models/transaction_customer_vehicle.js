'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction_customer_vehicle = sequelize.define('transaction_customer_vehicle', {
    transaction_id: DataTypes.INTEGER,
    customer_vehicle_id: DataTypes.INTEGER
  }, {});
  transaction_customer_vehicle.associate = models => {
    // associations can be defined here
    transaction_customer_vehicle.belongsTo(models.transaction)
    transaction_customer_vehicle.belongsTo(models.customer_vehicle)

    transaction_customer_vehicle.belongsToMany(models.service, { through: 'transaction_customer_vehicle_service' }) 

  };
  return transaction_customer_vehicle;
};