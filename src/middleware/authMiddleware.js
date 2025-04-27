const jwt = require('jsonwebtoken');
const { User } = require('../models/user');  // Asegúrate de importar el modelo de usuario

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener el token del header

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Buscamos al usuario en la base de datos
    const foundUser = await User.findByPk(user.id);
    if (!foundUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    req.user = foundUser;  // Guardamos la información del usuario en la request
    next();
  });
};

// Middleware para verificar si el usuario está autenticado
const verifyUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  next();
};

module.exports = { authenticateToken, verifyUser };
