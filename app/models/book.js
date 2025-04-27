const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Conexión con la base de datos

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publisher: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.INTEGER
  },
  genre: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'leyendo', 'leído'),
    defaultValue: 'pendiente'
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'books',
  timestamps: false
});

module.exports = Book;
