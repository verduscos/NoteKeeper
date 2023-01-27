'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      options.tableName = 'Notebooks';
      return queryInterface.bulkInsert(options, [
        {
          title: 'First Notebook',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Second Notebook',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Test Notebook',
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Test Notebook',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Test Notebook',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      options.tableName = 'Notebooks';
      return queryInterface.bulkDelete(options);
  }
};
