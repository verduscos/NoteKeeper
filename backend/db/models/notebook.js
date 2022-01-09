'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return Notebook;
};
