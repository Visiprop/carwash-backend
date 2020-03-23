'use strict';
module.exports = (sequelize, DataTypes) => {
  const vehicle = sequelize.define('vehicle', {
    vehicle_type_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    isDeleted: DataTypes.INTEGER
  }, {});
  vehicle.associate = models => {
    // associations can be defined here
    vehicle.belongsTo(models.vehicle_type)

    vehicle.belongsToMany(models.customer, { through: 'customer_vehicles' })

  };
  return vehicle;
};