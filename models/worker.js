'use strict';
module.exports = (sequelize, DataTypes) => {
  const worker = sequelize.define('worker', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    ktp_nik: DataTypes.STRING,
    phone_number: DataTypes.BIGINT,
    address: DataTypes.STRING
  }, {});
  worker.associate = models => {
    // associations can be defined here
    worker.belongsToMany(models.transaction_customer_vehicle_service, { through: 'transaction_customer_vehicle_service_worker' }) 
  };
  return worker;
};