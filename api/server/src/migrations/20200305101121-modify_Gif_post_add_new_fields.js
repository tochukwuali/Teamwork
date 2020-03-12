'use strict';
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   module.exports = {
    up(queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.addColumn(
          'Gif_posts', // table name
          'title', // new field name
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
        )
      ])
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Gif_posts', 'title'),
    ]);
  },
};
