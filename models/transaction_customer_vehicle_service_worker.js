'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction_customer_vehicle_service_worker = sequelize.define('transaction_customer_vehicle_service_worker', {
    transaction_customer_vehicle_service_id: DataTypes.INTEGER,
    worker_id: DataTypes.INTEGER
  }, {});
  transaction_customer_vehicle_service_worker.associate = function(models) {
    // associations can be defined here
  };
  return transaction_customer_vehicle_service_worker;
};