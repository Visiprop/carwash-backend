'use strict';
module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define('service', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    additional_price: DataTypes.DOUBLE,
    isDeleted: DataTypes.INTEGER
  }, {});
  service.associate = models => {
    // associations can be defined here
    service.belongsToMany(models.transaction_customer_vehicle, { through: 'transaction_customer_vehicle_service' }) 
  };
  return service;
};