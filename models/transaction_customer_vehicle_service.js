'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction_customer_vehicle_service = sequelize.define('transaction_customer_vehicle_service', {
    transaction_customer_vehicle_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER
  }, {});
  transaction_customer_vehicle_service.associate = models => {
    // associations can be defined here
    transaction_customer_vehicle_service.belongsTo(models.transaction_customer_vehicle)
    transaction_customer_vehicle_service.belongsTo(models.service)

    transaction_customer_vehicle_service.belongsToMany(models.worker, { through: 'transaction_customer_vehicle_service_worker' }) 
    
  };
  return transaction_customer_vehicle_service;
};