'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Notes', [
        {
          title: 'My First note',
          body:'This is my first note, and I am in the body.',
          userId: 1,
          notebookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'My Second note',
          body:'This is my second note, and I am in the body.',
          userId: 1,
          notebookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'My Third note',
          body:'This is my third note, and I am in the body.',
          userId: 1,
          notebookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Random',
          body:'Blah blah blah.',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Notes', null, {});
  }
};
