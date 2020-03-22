'use strict';
module.exports = (sequelize, DataTypes) => {
  const vehicle_type = sequelize.define('vehicle_type', {
    name: DataTypes.STRING
  }, {});
  vehicle_type.associate = models => {
    // associations can be defined here
    vehicle_type.hasMany(models.vehicle, {
      foreignKey: 'vehicle_type_id'
    })

    
  };
  return vehicle_type;
};