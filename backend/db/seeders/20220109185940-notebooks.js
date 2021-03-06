'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Notebooks', [
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
      return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
