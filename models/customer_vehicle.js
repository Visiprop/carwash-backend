'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer_vehicle = sequelize.define('customer_vehicle', {
    customer_id: DataTypes.INTEGER,
    vehicle_id: DataTypes.INTEGER,
    plate_number: DataTypes.STRING
  }, {});
  customer_vehicle.associate = models => {
    // associations can be defined here
    customer_vehicle.belongsTo(models.customer)
    customer_vehicle.belongsTo(models.vehicle)

    customer_vehicle.belongsToMany(models.transaction, { through: 'transaction_customer_vehicle' }) 


  };
  return customer_vehicle;
};