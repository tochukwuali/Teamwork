'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    jobRole: DataTypes.STRING,
    department: DataTypes.STRING,
    address: DataTypes.STRING

       
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
      onDelete: 'CASCADE'
    })
    Employee.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'CASCADE'
    })
  };
  return Employee;
};