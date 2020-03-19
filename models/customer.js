'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.BIGINT,
    address: DataTypes.TEXT
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};