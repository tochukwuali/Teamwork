'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gif_comment = sequelize.define('Gif_comment', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    gifId: DataTypes.INTEGER
  }, {});
  Gif_comment.associate = function(models) {
    // associations can be defined here
    Gif_comment.belongsTo(models.Gif_post, {
      foreignKey: 'gifId',
      as: 'gif_post',
    })

    Gif_comment.belongsTo(models.Employee, {
      foreignKey: 'userId',
      as: 'author',
    })
  };
  return Gif_comment;
};