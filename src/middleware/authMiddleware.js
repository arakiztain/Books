const jwt = require('jsonwebtoken');

//Token
const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next();  // Si no hay token, continuamos sin agregar al usuario
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return next(); // Si el token no es válido, continuamos sin agregar al usuario
    }

    req.user = user;  // Guardamos la información del usuario en la request
    next();
  });
};

module.exports = { authenticateToken };
