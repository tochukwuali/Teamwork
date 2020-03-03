'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    postId: DataTypes.INTEGER,
    comment:DataTypes.TEXT,
    userId: DataTypes.INTEGER
      
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post'
    })
    Comment.belongsTo(models.Employee, {
      foreignKey: 'userId',
      as: 'author'
    })
  };
  return Comment;
};