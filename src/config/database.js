const { Sequelize } = require('sequelize');

// Crear conexión a la base de datos
const sequelize = new Sequelize('biblioteca', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
