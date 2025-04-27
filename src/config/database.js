const { Sequelize } = require('sequelize');

// Crear conexión a la base de datos
const sequelize = new Sequelize('biblioteca', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Desactivar el logging de las consultas SQL
});

module.exports = sequelize;
