'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30]
      }
    },
    body:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User'
      }
    },
    notebookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Notebook'
      }
    }
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, {
      foreignKey: 'userId'
    })

    Note.belongsTo(models.Notebook, {
      foreignKey: 'notebookId'
    })
  };
  return Note;
};
