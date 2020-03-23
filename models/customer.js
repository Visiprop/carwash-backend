'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {    
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.BIGINT,
    address: DataTypes.TEXT,
    isDeleted: DataTypes.INTEGER
  }, {});
  customer.associate = models => {
    // associations can be defined here
    customer.belongsToMany(models.vehicle, { through: 'customer_vehicles' })
  
    customer.hasMany(models.transaction, {
      foreignKey: 'customer_id'
    }) 
    
  }
  return customer 
};