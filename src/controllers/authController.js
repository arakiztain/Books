const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
  const { name, password } = req.body;
  console.log(name, password);
  // Verificar si el nombre de usuario ya está en uso
  const existingUser = await User.findOne({ where: { username: name } }); // Cambié 'name' por 'username'
  if (existingUser) {
    return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear un nuevo usuario
  const newUser = await User.create({
    username: name,  // Cambié 'name' por 'username' para que coincida con la base de datos
    password: hashedPassword
  });
  console.log(newUser);
  // Generar el token JWT
  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

 /*  res.status(201).json({
    message: 'Registro exitoso',
    token
  }); */
  res.redirect('/');
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { name, password } = req.body;
  // Buscar el usuario por el nombre de usuario (username)
  const user = await User.findOne({ where: { name } }); // Cambié 'name' por 'username'
  if (!user) {
    return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
  }

  // Verificar la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
  }

  // Generar el token JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Inicio de sesión exitoso', token });
};
