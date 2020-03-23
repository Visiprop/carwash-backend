'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    email: DataTypes.STRING,    
    username: DataTypes.STRING,    
    password: DataTypes.TEXT,
    isDeleted: DataTypes.INTEGER
  }, {});
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};