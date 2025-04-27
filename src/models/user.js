const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database'); // Reemplaza con tu configuración de base de datos

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true  // Si deseas campos como createdAt y updatedAt
});

// Método para verificar la contraseña
User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);  // Compara la contraseña ingresada con la almacenada
};

module.exports = User;
