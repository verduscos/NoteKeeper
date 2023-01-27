'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      options.tableName = "Users";
      return queryInterface.bulkInsert(options, [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: 'demo2@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password2'),
        },
        {
          email: 'demo3@user.io',
          username: 'FakeUser3',
          hashedPassword: bcrypt.hashSync('password3'),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "Users";
    return queryInterface.bulkDelete(options);
  }
};
