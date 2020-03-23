'use strict';
module.exports = (sequelize, DataTypes) => {
  const superadmin = sequelize.define('superadmin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isDeleted: DataTypes.INTEGER,
  }, {});
  superadmin.associate = function(models) {
    // associations can be defined here
  };
  return superadmin;
};