'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gif_post = sequelize.define('Gif_post', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Gif_post.associate = function(models) {
    // associations can be defined here
    Gif_post.hasMany(models.Gif_comment, {
      foreignKey: 'gifId',
      as: 'gifComments',
      onDelete: 'CASCADE'
    })

    Gif_post.belongsTo(models.Employee, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE'

    })
  };
  return Gif_post;
};