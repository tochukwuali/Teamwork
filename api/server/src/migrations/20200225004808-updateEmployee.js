'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.sequelize.transaction(t => {
    return Promise.all([
      queryInterface.addColumn('Employees', 'password', {
        type: Sequelize.DataTypes.STRING
      }, { transaction: t }),
      queryInterface.addColumn('Employees', 'gender', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction: t }),
      queryInterface.addColumn('Employees', 'jobRole', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction: t }),
      queryInterface.addColumn('Employees', 'department', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction: t }),
      queryInterface.addColumn('Employees', 'address', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction: t })
    ]);
  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.sequelize.transaction(t => {
    return Promise.all([
      queryInterface.removeColumn('Employees', 'password', { transaction: t }),
      queryInterface.removeColumn('Employees', 'gender', { transaction: t }),
      queryInterface.removeColumn('Employees', 'jobRole', { transaction: t }),
      queryInterface.removeColumn('Employees', 'department', { transaction: t }),
      queryInterface.removeColumn('Employees', 'address', { transaction: t })
    ]);
  });

  }
};
