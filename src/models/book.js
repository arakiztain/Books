const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Conexión con la base de datos

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true 
  },
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
  },
  userId: {  
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'books',
  timestamps: true 
});

module.exports = Book;
